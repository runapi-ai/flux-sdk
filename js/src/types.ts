import type { AsyncTaskStatus, TaskBillingResponse, TaskResponse } from '@runapi.ai/core';

/** Flux model slug. */
export type FluxModel = string;

/** Supported output aspect ratios. */
export type AspectRatio = string;

/** Parameters for Flux text-to-image generation. */
export interface TextToImageParams {
  model: FluxModel;
  /** Text description of the desired image, 3-5000 characters. */
  prompt: string;
  /** Output aspect ratio. Defaults to 1:1. */
  aspect_ratio?: AspectRatio;
  /** Number of images to create. Only 1 is supported. */
  output_count?: number;
  /** HTTPS callback URL for task completion notification. */
  callback_url?: string;
}

/** Parameters for editing exactly one source image with Flux. */
export interface RemixImageParams extends Omit<TextToImageParams, 'model'> {
  model: FluxModel;
  /** Publicly accessible source image URL. */
  source_image_url: string;
}

/** Acknowledgement returned before processing completes. */
export interface TaskCreateResponse extends TaskBillingResponse {
  id: string;
  status?: 'processing';
}

/** URL to a generated image. */
export interface Image {
  url: string;
}

/** Async image task result with lifecycle status. */
export interface TextToImageResponse extends TaskResponse {
  id: string;
  status: AsyncTaskStatus;
  images?: Image[];
  error?: string;
  [key: string]: unknown;
}

export type CompletedTextToImageResponse = TextToImageResponse & {
  status: 'completed';
  images: Image[];
};

export type RemixImageResponse = TextToImageResponse;
export type CompletedRemixImageResponse = CompletedTextToImageResponse;
