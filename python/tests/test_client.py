import pytest

from runapi.core.errors import ValidationError
from runapi.flux import FluxClient
from runapi.flux.types import RemixImageResponse, TextToImageResponse


class FakeHttp:
    def __init__(self, *responses):
        self._responses = list(responses)
        self.calls = []

    def request(self, method, path, body=None, options=None):
        self.calls.append((method, path, body))
        if self._responses:
            return self._responses.pop(0)
        return {"id": "task-1186", "status": "processing"}


def test_exposes_resources_and_posts_flat_generation_params():
    http = FakeHttp({"id": "task-1186", "status": "processing"})
    client = FluxClient(api_key="test-key", http_client=http)

    result = client.text_to_image.create(
        model="flux-dev",
        prompt="A studio product photograph",
        aspect_ratio="16:9",
        output_count=1,
    )

    assert isinstance(result, TextToImageResponse)
    assert http.calls == [(
        "post",
        "/api/v1/flux/text_to_image",
        {"model": "flux-dev", "prompt": "A studio product photograph", "aspect_ratio": "16:9", "output_count": 1},
    )]


def test_posts_one_source_image_and_uses_public_lookup_path():
    http = FakeHttp(
        {"id": "task-1186", "status": "processing"},
        {"id": "task-1186", "status": "completed", "usage": {"cost": 0.05}, "images": [{"url": "https://cdn.runapi.ai/public/samples/result.jpg"}]},
    )
    client = FluxClient(api_key="test-key", http_client=http)

    created = client.remix_image.create(
        model="flux-pro",
        prompt="Replace the background",
        source_image_url="https://cdn.runapi.ai/public/samples/image.jpg",
    )
    result = client.remix_image.get(created.id)

    assert isinstance(result, RemixImageResponse)
    assert http.calls[0] == (
        "post",
        "/api/v1/flux/remix_image",
        {
            "model": "flux-pro",
            "prompt": "Replace the background",
            "source_image_url": "https://cdn.runapi.ai/public/samples/image.jpg"},
    )
    assert http.calls[1] == ("get", "/api/v1/flux/remix_image/task-1186", None)


@pytest.mark.parametrize(
    ("resource", "params", "message"),
    [
        ("text_to_image", {"model": "flux-2-klein", "prompt": "A product photo", "output_count": 2}, "output_count must be one of"),
        (
            "remix_image",
            {
                "model": "flux-dev",
                "prompt": "Replace the background",
                "source_image_url": None},
            "source_image_url is required",
        )],
)
def test_generated_contract_rejects_unsupported_shapes(resource, params, message):
    client = FluxClient(api_key="test-key", http_client=FakeHttp())

    with pytest.raises(ValidationError, match=message):
        getattr(client, resource).create(**params)
