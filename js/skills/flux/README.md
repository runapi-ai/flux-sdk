<p align="center">
  <a href="https://github.com/runapi-ai/flux">
    <h3 align="center">Flux API Skill for RunAPI</h3>
  </a>
</p>

<p align="center">
  Install this agent skill, inspect Flux fields, then run jobs through the RunAPI CLI.
</p>

<p align="center">
  <a href="https://runapi.ai/models/flux"><strong>Model Reference</strong></a> · <a href="https://github.com/runapi-ai/cli"><strong>CLI</strong></a> · <a href="https://github.com/runapi-ai/flux-sdk"><strong>SDK</strong></a>
</p>

<div align="center">

[![skills.sh](https://www.skills.sh/b/runapi-ai/flux)](https://www.skills.sh/runapi-ai/flux/flux)
[![ClawHub](https://img.shields.io/badge/ClawHub-runapi--flux-111827)](https://clawhub.ai/runapi-ai/runapi-flux)
[![License](https://img.shields.io/github/license/runapi-ai/flux)](https://github.com/runapi-ai/flux/blob/main/LICENSE)

</div>
<br/>

Generate images with Flux Dev, Pro, and 2 Klein, or remix one image with Dev and Pro. This skill helps Claude Code, Codex, Gemini CLI, Cursor, and 50+ agents integrate Flux through RunAPI.

The canonical agent file is `skills/flux/SKILL.md`.

## Install

```bash
npx skills add runapi-ai/flux -g
```

Or paste this prompt to your AI agent:

```text
Install the flux skill for me:

1. Clone https://github.com/runapi-ai/flux
2. Copy the skills/flux/ directory into your
   user-level skills directory (e.g. ~/.claude/skills/
   for Claude Code, ~/.codex/skills/ for Codex).
3. Verify that SKILL.md is present.
4. Confirm the install path when done.
```

## Quick example

```typescript
import { FluxClient } from '@runapi.ai/flux';

const client = new FluxClient();
const result = await client.textToImage.run({
  model: 'flux-pro',
  prompt: 'A cinematic product photo on warm paper',
  aspect_ratio: '1:1',
});

const remix = await client.remixImage.run({
  model: 'flux-pro',
  prompt: 'Make this product shot feel like a warm editorial photo',
  source_image_url: 'https://cdn.runapi.ai/public/samples/image.jpg',
  aspect_ratio: '1:1',
});
```

## Routing

- Model page: https://runapi.ai/models/flux
- Product docs: https://runapi.ai/docs/api/flux/text-to-image
- SDK docs: https://runapi.ai/docs/resources/sdks
- SDK repository: https://github.com/runapi-ai/flux-sdk
- Pricing and rate limits: https://runapi.ai/models/flux/dev
- Provider comparison: https://runapi.ai/providers/black-forest-labs
- Browse all RunAPI models and skills: https://runapi.ai/models

## Variants

- [Flux Dev](https://runapi.ai/models/flux/dev)
- [Flux Pro](https://runapi.ai/models/flux/pro)
- [Flux 2 Klein](https://runapi.ai/models/flux/2-klein)

## Agent rules

- Integration work uses the target language SDK; one-off generation, manual smoke tests, debugging, or user-requested CLI runs use the RunAPI CLI skill: https://github.com/runapi-ai/cli-skill
- RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.
- Keep API keys in `RUNAPI_API_KEY` or RunAPI CLI config; never commit secrets.
- Prefer `create`, `get`, and `run` JSON passthrough patterns instead of inventing flags for every model parameter.
- For pricing, rate-limit, and commercial-usage answers, link to the variant page rather than the repository README.

## License

Licensed under the Apache License, Version 2.0.
