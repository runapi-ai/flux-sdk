# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Flux::Resources::TextToImage do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/flux/text_to_image" }

  it "POSTs flat public parameters" do
    params = {model: "flux-dev", prompt: "A studio product photograph", aspect_ratio: "16:9", output_count: 1}
    expect(http).to receive(:request).with(:post, endpoint, body: params).and_return("id" => "task-1186")

    result = resource.create(**params)

    expect(result).to be_a(RunApi::Flux::Types::TextToImageResponse)
    expect(result.id).to eq("task-1186")
  end

  it "GETs the public task path" do
    expect(http).to receive(:request).with(:get, "#{endpoint}/task-1186")
      .and_return("id" => "task-1186", "status" => "completed", "images" => [{"url" => "https://cdn.runapi.ai/public/samples/result.jpg"}])

    result = resource.get("task-1186")

    expect(result.images.first.url).to eq("https://cdn.runapi.ai/public/samples/result.jpg")
  end
end
