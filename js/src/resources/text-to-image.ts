import type { HttpClient, RequestOptions, PollingOptions, ActionSchema } from '@runapi.ai/core';
import { compactParams, validateParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import { contract } from '../contract_gen';
import type {
  CompletedTextToImageResponse,
  TextToImageParams,
  TextToImageResponse,
  TaskCreateResponse,
} from '../types';

const ENDPOINT = '/api/v1/flux/text_to_image';

/** Flux text-to-image generation resource. */
export class TextToImage {
  constructor(private readonly http: HttpClient) {}

  async run(params: TextToImageParams, options?: RequestOptions & PollingOptions): Promise<CompletedTextToImageResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<TextToImageResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedTextToImageResponse;
  }

  async create(params: TextToImageParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    validateParams(contract['text-to-image'] as ActionSchema, body as Record<string, unknown>);
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, { body, ...options });
  }

  async get(id: string, options?: RequestOptions): Promise<TextToImageResponse> {
    return this.http.request<TextToImageResponse>('GET', `${ENDPOINT}/${id}`, { ...options });
  }
}
