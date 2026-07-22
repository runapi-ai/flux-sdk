import { describe, it, expect } from 'vitest';
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
