# Flux API Ruby SDK for RunAPI

The Flux Ruby SDK is the language-specific package for Flux on RunAPI. Use this package for image generation, image editing, and creative production workflows when your application needs request bodies, task status lookup, and consistent RunAPI errors in Ruby.

This README is the Ruby package guide inside the public `flux-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/flux; for API reference, use https://runapi.ai/docs/api/flux/text-to-image; for SDK docs, use https://runapi.ai/docs/resources/sdks.

## Install

```bash
gem install runapi-flux
```

## Quick start

```ruby
require "runapi/flux"

client = RunApi::Flux::Client.new

task = client.text_to_image.create(
  model: "flux-pro",
  prompt: "A cinematic product photo on warm paper",
  aspect_ratio: "1:1"
)
status = client.text_to_image.get(task.id)

remix = client.remix_image.create(
  model: "flux-pro",
  prompt: "Turn this product shot into a warm editorial photo",
  source_image_url: "https://cdn.runapi.ai/public/samples/image.jpg",
  aspect_ratio: "1:1"
)
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion. In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## Language notes

Use Ruby keyword arguments and the `RunApi::Flux` error classes when building image jobs, Rails workers, or scripts. The available resources are `text_to_image` and `remix_image`. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

## Links

- Model page: https://runapi.ai/models/flux
- SDK docs: https://runapi.ai/docs/resources/sdks
- Product docs: https://runapi.ai/docs/api/flux/text-to-image
- Pricing and rate limits: https://runapi.ai/models/flux/dev
- Provider comparison: https://runapi.ai/providers/black-forest-labs
- Full catalog: https://runapi.ai/models
- Repository: https://github.com/runapi-ai/flux-sdk

## License

Licensed under the Apache License, Version 2.0.
