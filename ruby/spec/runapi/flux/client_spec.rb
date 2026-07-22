# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Flux::Client do
  before do
    allow(ConnectionPool).to receive(:new).and_return(instance_double(ConnectionPool))
  end

  after { RunApi.api_key = nil }

  it "exposes both Flux resources" do
    client = described_class.new(api_key: "test-key")

    expect(client.text_to_image).to be_a(RunApi::Flux::Resources::TextToImage)
    expect(client.remix_image).to be_a(RunApi::Flux::Resources::RemixImage)
  end
end
