import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { TextToImage } from '../../src/resources/text-to-image';
import { RemixImage } from '../../src/resources/remix-image';

describe('Flux resources', () => {
  const http: HttpClient = { request: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(http.request).mockResolvedValue({ id: 'task-1186', status: 'processing' });
  });

  it('sends a flat text-to-image request', async () => {
    await new TextToImage(http).create({
      model: 'flux-dev',
      prompt: 'A studio product photograph',
      aspect_ratio: '16:9',
      output_count: 1,
    });

    expect(http.request).toHaveBeenCalledWith('POST', '/api/v1/flux/text_to_image', {
      body: {
        model: 'flux-dev',
        prompt: 'A studio product photograph',
        aspect_ratio: '16:9',
        output_count: 1,
      },
    });
  });

  it('sends one public source image URL to remix-image', async () => {
    await new RemixImage(http).create({
      model: 'flux-pro',
      prompt: 'Replace the background',
      source_image_url: 'https://cdn.runapi.ai/public/samples/image.jpg',
    });

    expect(http.request).toHaveBeenCalledWith('POST', '/api/v1/flux/remix_image', {
      body: {
        model: 'flux-pro',
        prompt: 'Replace the background',
        source_image_url: 'https://cdn.runapi.ai/public/samples/image.jpg',
      },
    });
  });

  it('uses the public task lookup paths', async () => {
    await new TextToImage(http).get('task-1186');
    await new RemixImage(http).get('task-1186');

    expect(http.request).toHaveBeenNthCalledWith(1, 'GET', '/api/v1/flux/text_to_image/task-1186', {});
    expect(http.request).toHaveBeenNthCalledWith(2, 'GET', '/api/v1/flux/remix_image/task-1186', {});
  });
});
