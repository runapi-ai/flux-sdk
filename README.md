<p align="center">
  <a href="https://runapi.ai"><img src="https://runapi.ai/icon.svg" height="56" alt="RunAPI"></a>
</p>

<h3 align="center">
  <a href="https://github.com/runapi-ai/flux-sdk">Flux API SDK for RunAPI</a>
</h3>

<p align="center">
  Flux API SDKs for JavaScript, Python, Ruby, Go, Java, and PHP on RunAPI.
</p>

<div align="center">

[![npm](https://img.shields.io/npm/v/@runapi.ai/flux)](https://www.npmjs.com/package/@runapi.ai/flux)
[![PyPI](https://img.shields.io/pypi/v/runapi-flux)](https://pypi.org/project/runapi-flux/)
[![RubyGems](https://img.shields.io/gem/v/runapi-flux)](https://rubygems.org/gems/runapi-flux)
[![Go Reference](https://pkg.go.dev/badge/github.com/runapi-ai/flux-sdk/go.svg)](https://pkg.go.dev/github.com/runapi-ai/flux-sdk/go)
[![Maven Central](https://img.shields.io/maven-central/v/ai.runapi/runapi-flux)](https://central.sonatype.com/artifact/ai.runapi/runapi-flux)
[![License](https://img.shields.io/github/license/runapi-ai/flux-sdk)](https://github.com/runapi-ai/flux-sdk/blob/main/LICENSE)

</div>
<br/>

The Flux API SDK packages JavaScript, Python, Ruby, Go, and Java clients for Flux on RunAPI. Use it for text-to-image and remix-image workflows when your app needs typed request builders, predictable task polling, file upload helpers, account helpers, and consistent RunAPI errors.

Flux is listed in the RunAPI model catalog at https://runapi.ai/models/flux. Variant pages below carry pricing, rate-limit, and commercial-usage details. The public `flux-sdk` repository groups the non-PHP language packages, examples, CI, and release tags for this model. The PHP package is released from a split Composer repository.

## Install

```bash
npm install @runapi.ai/flux
pip install runapi-flux
gem install runapi-flux
go get github.com/runapi-ai/flux-sdk/go@latest
```

Gradle:

```kotlin
dependencies {
  implementation("ai.runapi:runapi-flux:0.1.0")
}
```

Maven:

```xml
<dependency>
  <groupId>ai.runapi</groupId>
  <artifactId>runapi-flux</artifactId>
  <version>0.1.0</version>
</dependency>
```

Use the Java BOM when installing multiple RunAPI Java modules:

```kotlin
dependencies {
  implementation(platform("ai.runapi:runapi-bom:0.5.0"))
  implementation("ai.runapi:runapi-flux")
}
```

The PHP package is published from the split Composer repository as `runapi-ai/flux`; see https://github.com/runapi-ai/flux-php for PHP install and examples.

## What you can build

- Build apps, agent workflows, batch jobs, and production services around Flux requests.
- Install only the language package your app needs while keeping one model-specific repository for docs and releases.
- Use `create` for submit-only jobs, `get` for status lookup, and `run` for submit-and-poll scripts.
- Upload local files, URL files, or base64 files through shared RunAPI file helpers.
- Handle validation, authentication, rate limits, insufficient credits, task failures, and polling timeouts through RunAPI SDK errors.

## Java quick start

```java
import ai.runapi.flux.FluxClient;
import ai.runapi.flux.types.TextToImageParams;
import ai.runapi.flux.types.CompletedTextToImageResponse;
import ai.runapi.flux.types.TextToImageModel;

FluxClient client = FluxClient.builder()
    .apiKey(System.getenv("RUNAPI_API_KEY"))
    .build();

CompletedTextToImageResponse result = client.textToImage().run(
    TextToImageParams.builder()
        .model(TextToImageModel.FLUX_2_KLEIN)
        .prompt("A futuristic greenhouse in the desert at sunrise")
        .aspectRatio("16:9")
        .build()
);
```

Java packages target Java 8 bytecode and are tested on Java 8, 11, 17, and 21. Each model artifact depends on `ai.runapi:runapi-core`, so application code normally installs only `ai.runapi:runapi-flux`.

## Task lifecycle

Most media endpoints are asynchronous. `create()` submits a task and returns its id, `get(id)` fetches the latest task state, and `run(params)` creates the task and polls until it reaches a terminal state. In web request handlers, prefer `create()` plus webhook or later `get()` polling so the server does not hold a worker open.

## Repository layout

- `js/` publishes `@runapi.ai/flux`.
- `python/` publishes `runapi-flux`.
- `ruby/` publishes `runapi-flux`.
- `go/` publishes `github.com/runapi-ai/flux-sdk/go` and depends on `github.com/runapi-ai/core-sdk/go`.
- `java/` publishes `ai.runapi:runapi-flux` and depends on `ai.runapi:runapi-core`.

## Public links

- Model page: https://runapi.ai/models/flux
- SDK docs: https://runapi.ai/docs/resources/sdks
- Product docs: https://runapi.ai/docs/api/flux/text-to-image
- SDK repository: https://github.com/runapi-ai/flux-sdk
- PHP package repository: https://github.com/runapi-ai/flux-php
- Skill repository: https://github.com/runapi-ai/flux
- Provider comparison: https://runapi.ai/providers/black-forest-labs
- Full catalog: https://runapi.ai/models

## Pricing and variants

Use the most specific Flux variant page for pricing, rate limits, and commercial usage:
- [Flux Dev](https://runapi.ai/models/flux/dev)
- [Flux Pro](https://runapi.ai/models/flux/pro)
- [Flux 2 Klein](https://runapi.ai/models/flux/2-klein)

Default pricing link for the Flux SDK: https://runapi.ai/models/flux/dev

## File storage

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## FAQ

### Which package should I install for Flux work?

Install the model package for your language: `@runapi.ai/flux` on npm, `runapi-flux` on PyPI, `runapi-flux` on RubyGems, `github.com/runapi-ai/flux-sdk/go`, `ai.runapi:runapi-flux` on Maven Central, or `runapi-ai/flux` on Packagist. Install core SDK packages only when you are building shared SDK infrastructure.

### Where should public links point?

Primary Flux links point to https://runapi.ai/models/flux. Pricing and usage-policy links point to variant pages such as https://runapi.ai/models/flux/dev. Provider comparisons point to https://runapi.ai/providers/black-forest-labs, and broad browsing points to https://runapi.ai/models.

## License

Licensed under the Apache License, Version 2.0.
