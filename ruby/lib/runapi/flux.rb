# frozen_string_literal: true

require "runapi/core"
require_relative "flux/types"
require_relative "flux/resources/text_to_image"
require_relative "flux/resources/remix_image"
require_relative "flux/client"

module RunApi
  module Flux
    AuthenticationError = RunApi::Core::AuthenticationError
    RateLimitError = RunApi::Core::RateLimitError
    InsufficientCreditsError = RunApi::Core::InsufficientCreditsError
    NotFoundError = RunApi::Core::NotFoundError
    ValidationError = RunApi::Core::ValidationError
    TaskFailedError = RunApi::Core::TaskFailedError
    TaskTimeoutError = RunApi::Core::TaskTimeoutError
  end
end
