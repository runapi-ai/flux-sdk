import { BaseClient, type ClientOptions } from '@runapi.ai/core';
import { TextToImage } from './resources/text-to-image';
import { RemixImage } from './resources/remix-image';

/** Flux image generation and editing client. */
export class FluxClient extends BaseClient {
  public readonly textToImage: TextToImage;
  public readonly remixImage: RemixImage;

  constructor(options: ClientOptions = {}) {
    super(options);
    this.textToImage = new TextToImage(this.http);
    this.remixImage = new RemixImage(this.http);
  }
}
