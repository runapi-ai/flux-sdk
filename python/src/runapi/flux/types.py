"""Flux response models."""

from runapi.core import BaseModel, TaskResponse, optional, required


class Image(BaseModel):
    url = optional(str)


class TextToImageResponse(TaskResponse):
    id = required(str)
    status = optional(str, enum=lambda: TaskResponse.Status.ALL)
    images = optional([lambda: Image])
    error = optional(str)


class CompletedTextToImageResponse(TextToImageResponse):
    images = required([lambda: Image])


class RemixImageResponse(TextToImageResponse):
    pass


class CompletedRemixImageResponse(CompletedTextToImageResponse):
    pass
