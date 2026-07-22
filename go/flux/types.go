package flux

// TaskStatus represents the lifecycle state of an asynchronous task.
type TaskStatus string

// TextToImageParams holds the request parameters for generating an image from text.
type TextToImageParams struct {
	Model       string `json:"model" help:"required; model slug"`
	Prompt      string `json:"prompt" help:"required; 3-5000 chars"`
	AspectRatio string `json:"aspect_ratio,omitempty" help:"optional; output aspect ratio; Default: 1:1"`
	OutputCount *int   `json:"output_count,omitempty" help:"optional; output image count; must be 1; Default: 1"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// RemixImageParams holds the request parameters for editing one source image.
type RemixImageParams struct {
	Model          string `json:"model" help:"required; model slug"`
	Prompt         string `json:"prompt" help:"required; 3-5000 chars"`
	SourceImageURL string `json:"source_image_url" help:"required; source image URL"`
	AspectRatio    string `json:"aspect_ratio,omitempty" help:"optional; output aspect ratio; Default: 1:1"`
	OutputCount    *int   `json:"output_count,omitempty" help:"optional; output image count; must be 1; Default: 1"`
	CallbackURL    string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// AsyncTaskResponse is the base response for an asynchronous image task.
type AsyncTaskResponse struct {
	ID     string     `json:"id"`
	Status TaskStatus `json:"status"`
	Error  string     `json:"error,omitempty"`
}

func (r AsyncTaskResponse) GetID() string     { return r.ID }
func (r AsyncTaskResponse) GetStatus() string { return string(r.Status) }
func (r AsyncTaskResponse) GetError() string  { return r.Error }

// Image holds a CDN URL for a generated image.
type Image struct {
	URL string `json:"url"`
}

// TextToImageResponse is the terminal response for a text-to-image task.
type TextToImageResponse struct {
	AsyncTaskResponse
	Images []Image `json:"images,omitempty"`
}

// RemixImageResponse has the same response shape as text-to-image.
type RemixImageResponse = TextToImageResponse
