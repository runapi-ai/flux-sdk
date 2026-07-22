import type { HttpClient, RequestOptions, PollingOptions, ActionSchema } from '@runapi.ai/core';
import { compactParams, validateParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import { contract } from '../contract_gen';
import type {
  CompletedRemixImageResponse,
  RemixImageParams,
  RemixImageResponse,
  TaskCreateResponse,
} from '../types';

const ENDPOINT = '/api/v1/flux/remix_image';

/** Flux prompt-guided image editing resource. */
export class RemixImage {
  constructor(private readonly http: HttpClient) {}

  async run(params: RemixImageParams, options?: RequestOptions & PollingOptions): Promise<CompletedRemixImageResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<RemixImageResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedRemixImageResponse;
  }

  async create(params: RemixImageParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    validateParams(contract['remix-image'] as ActionSchema, body as Record<string, unknown>);
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, { body, ...options });
  }

  async get(id: string, options?: RequestOptions): Promise<RemixImageResponse> {
    return this.http.request<RemixImageResponse>('GET', `${ENDPOINT}/${id}`, { ...options });
  }
}
