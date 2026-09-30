import { describe, it, expect, vi } from 'vitest';
import { ValidationError } from '@runapi.ai/core';
import { FluxClient } from '../../src';

describe('FluxClient', () => {
  it('exposes both image resources', () => {
    const client = new FluxClient({ apiKey: 'test-key' });
    expect(typeof client.textToImage.create).toBe('function');
    expect(typeof client.textToImage.get).toBe('function');
    expect(typeof client.textToImage.run).toBe('function');
    expect(typeof client.remixImage.create).toBe('function');
    expect(typeof client.remixImage.get).toBe('function');
    expect(typeof client.remixImage.run).toBe('function');
  });
});

describe('FluxClient server-side input validation', () => {
  function jsonResponse(body: unknown, status: number): Response {
    return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
  }

  it('sends an unlisted model to the server and returns its result', async () => {
    const fetch = vi.fn(async () => jsonResponse({ id: 'task-new-model' }, 200));
    const client = new FluxClient({ apiKey: 'test-key', maxRetries: 0, fetch });

    const result = await client.textToImage.create({ model: 'flux-future', prompt: 'A lighthouse', aspect_ratio: '7:3' });

    expect(result).toEqual({ id: 'task-new-model' });
    expect(JSON.parse(String(fetch.mock.calls[0][1]?.body))).toMatchObject({ model: 'flux-future', aspect_ratio: '7:3' });
  });

  it('raises ValidationError with the server message for a rejected param', async () => {
    const fetch = vi.fn(async () => jsonResponse({ error: { message: 'aspect_ratio is not supported by flux-dev' } }, 400));
    const client = new FluxClient({ apiKey: 'test-key', maxRetries: 0, fetch });

    const error = await client.textToImage.create({ model: 'flux-dev', prompt: 'A lighthouse', aspect_ratio: '7:3' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ValidationError);
    expect((error as ValidationError).message).toBe('aspect_ratio is not supported by flux-dev');
  });
});
