# frozen_string_literal: true

module RunApi
  module Flux
    module Types
      class Image < RunApi::Core::BaseModel
        optional :url, String
      end

      class TextToImageResponse < RunApi::Core::TaskResponse
        required :id, String
        optional :status, String, enum: -> { RunApi::Core::TaskResponse::Status::ALL }
        optional :images, [-> { Image }]
        optional :error, String
      end

      class CompletedTextToImageResponse < TextToImageResponse
        required :images, [-> { Image }]
      end

      class RemixImageResponse < TextToImageResponse
      end

      class CompletedRemixImageResponse < CompletedTextToImageResponse
      end
    end
  end
end
