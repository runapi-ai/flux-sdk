// Package flux provides the Flux image generation and editing API client.
package flux

import (
	"context"

	"github.com/runapi-ai/core-sdk/go/base"
	"github.com/runapi-ai/core-sdk/go/core"
	"github.com/runapi-ai/core-sdk/go/option"
)

const (
	textToImagePath = "/api/v1/flux/text_to_image"
	remixImagePath  = "/api/v1/flux/remix_image"
)

// Client is the Flux image generation and editing API client.
type Client struct {
	base.Base
	TextToImage *TextToImage
	RemixImage  *RemixImage
}

// NewClient creates a Flux client with the given options.
func NewClient(opts ...option.ClientOption) (*Client, error) {
	resolved, err := option.ResolveClientOptions(opts...)
	if err != nil {
		return nil, err
	}
	httpClient, err := core.NewHTTPClient(resolved)
	if err != nil {
		return nil, err
	}
	return NewClientWithHTTP(httpClient), nil
}

// NewClientWithHTTP creates a Flux client with a pre-configured HTTP transport.
func NewClientWithHTTP(httpClient core.HTTPClient) *Client {
	return &Client{
		Base:        base.New(httpClient),
		TextToImage: &TextToImage{http: httpClient},
		RemixImage:  &RemixImage{http: httpClient},
	}
}

// TextToImage provides text-to-image operations.
type TextToImage struct{ http core.HTTPClient }

func (r *TextToImage) Create(ctx context.Context, params TextToImageParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, textToImagePath, body, requestOptions)
}

func (r *TextToImage) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToImageResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToImageResponse](ctx, r.http, core.ResourcePath(textToImagePath, id), requestOptions)
}

func (r *TextToImage) Run(ctx context.Context, params TextToImageParams, opts ...option.RequestOption) (*TextToImageResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) {
		return r.Create(ctx, params, opts...)
	}, func(ctx context.Context, id string) (*TextToImageResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

// RemixImage provides prompt-guided editing operations for one source image.
type RemixImage struct{ http core.HTTPClient }

func (r *RemixImage) Create(ctx context.Context, params RemixImageParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, remixImagePath, body, requestOptions)
}

func (r *RemixImage) Get(ctx context.Context, id string, opts ...option.RequestOption) (*RemixImageResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[RemixImageResponse](ctx, r.http, core.ResourcePath(remixImagePath, id), requestOptions)
}

func (r *RemixImage) Run(ctx context.Context, params RemixImageParams, opts ...option.RequestOption) (*RemixImageResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) {
		return r.Create(ctx, params, opts...)
	}, func(ctx context.Context, id string) (*RemixImageResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}
