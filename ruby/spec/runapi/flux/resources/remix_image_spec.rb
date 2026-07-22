# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Flux::Resources::RemixImage do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/flux/remix_image" }

  it "POSTs exactly one source image URL" do
    params = {
      model: "flux-pro",
      prompt: "Replace the background",
      source_image_url: "https://cdn.runapi.ai/public/samples/image.jpg"
    }
    expect(http).to receive(:request).with(:post, endpoint, body: params).and_return("id" => "task-1186")

    result = resource.create(**params)

    expect(result).to be_a(RunApi::Flux::Types::RemixImageResponse)
  end

  it "requires a source image through the generated contract" do
    expect do
      resource.create(
        model: "flux-pro",
        prompt: "Replace the background"
      )
    end.to raise_error(RunApi::Core::ValidationError, /source_image_url is required/)
  end
end
