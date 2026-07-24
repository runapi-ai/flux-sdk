"""Flux client."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import ProviderClient

from .resources.remix_image import RemixImage
from .resources.text_to_image import TextToImage


class FluxClient(ProviderClient):
    """Flux image generation and editing client."""

    def __init__(self, api_key: Optional[str] = None, **options: Any) -> None:
        super().__init__(api_key, **options)
        http = self._http
        self.text_to_image = TextToImage(http)
        self.remix_image = RemixImage(http)
