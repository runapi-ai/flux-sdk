# frozen_string_literal: true

module RunApi
  module Flux
    class Client < RunApi::Core::Client
      attr_reader :text_to_image, :remix_image

      def initialize(api_key: nil, **options)
        super
        @text_to_image = Resources::TextToImage.new(http)
        @remix_image = Resources::RemixImage.new(http)
      end
    end
  end
end
