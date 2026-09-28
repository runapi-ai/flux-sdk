package flux

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/runapi-ai/core-sdk/go/core"
)

type stubHTTPClient struct {
	method   string
	path     string
	body     any
	response json.RawMessage
}

func (s *stubHTTPClient) Request(_ context.Context, method, path string, opts *core.HTTPRequestOptions) (json.RawMessage, error) {
	s.method = method
	s.path = path
	if opts != nil {
		s.body = opts.Body
	}
	return s.response, nil
}

func TestTextToImageCreateAndGet(t *testing.T) {
	stub := &stubHTTPClient{response: json.RawMessage(`{"id":"task_123","status":"processing"}`)}
	client := NewClientWithHTTP(stub)
	count := 1

	created, err := client.TextToImage.Create(context.Background(), TextToImageParams{
		Model: "flux-dev", Prompt: "a studio product photograph", AspectRatio: "16:9", OutputCount: &count})
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "POST" || stub.path != textToImagePath {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	body := stub.body.(map[string]any)
	if body["model"] != "flux-dev" || body["prompt"] != "a studio product photograph" || body["aspect_ratio"] != "16:9" || body["output_count"] != float64(1) {
		t.Fatalf("unexpected body: %#v", body)
	}
	if _, ok := body["source_image_url"]; ok {
		t.Fatalf("unexpected source_image_url: %#v", body)
	}
	if created.ID != "task_123" {
		t.Fatalf("unexpected task ID: %s", created.ID)
	}

	stub.response = json.RawMessage(`{"id":"task_123","status":"completed", "usage": {"cost": 0.05},"images":[{"url":"https://cdn.runapi.ai/public/samples/result.jpg"}]}`)
	result, err := client.TextToImage.Get(context.Background(), "task_123")
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "GET" || stub.path != textToImagePath+"/task_123" {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	if len(result.Images) != 1 || result.Images[0].URL != "https://cdn.runapi.ai/public/samples/result.jpg" {
		t.Fatalf("unexpected images: %#v", result.Images)
	}
}

func TestRemixImageCreate(t *testing.T) {
	stub := &stubHTTPClient{response: json.RawMessage(`{"id":"task_456","status":"processing"}`)}
	client := NewClientWithHTTP(stub)
	_, err := client.RemixImage.Create(context.Background(), RemixImageParams{
		Model: "flux-pro", Prompt: "replace the background", SourceImageURL: "https://cdn.runapi.ai/public/samples/image.jpg"})
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "POST" || stub.path != remixImagePath {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	body := stub.body.(map[string]any)
	if body["source_image_url"] != "https://cdn.runapi.ai/public/samples/image.jpg" {
		t.Fatalf("unexpected source_image_url: %#v", body["source_image_url"])
	}
}
