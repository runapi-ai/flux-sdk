package ai.runapi.flux.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for remix image operations. */
public final class RemixImageParams {
  private final String model;
  private final String prompt;
  private final String sourceImageUrl;
  private final String aspectRatio;
  private final Integer outputCount;
  private final String callbackUrl;

  private RemixImageParams(Builder builder) {
    this.model = builder.model;
    this.prompt = builder.prompt;
    this.sourceImageUrl = builder.sourceImageUrl;
    this.aspectRatio = builder.aspectRatio;
    this.outputCount = builder.outputCount;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new RemixImageParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "flux/remix-image";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("model", FluxParamUtils.wireValue(model));
    raw.put("prompt", FluxParamUtils.wireValue(prompt));
    raw.put("source_image_url", FluxParamUtils.wireValue(sourceImageUrl));
    raw.put("aspect_ratio", FluxParamUtils.wireValue(aspectRatio));
    raw.put("output_count", FluxParamUtils.wireValue(outputCount));
    raw.put("callback_url", FluxParamUtils.wireValue(callbackUrl));
    return FluxParamUtils.compact(raw);
  }



  /** Builder for {@link RemixImageParams}. */
  public static final class Builder {
    private String model;
    private String prompt;
    private String sourceImageUrl;
    private String aspectRatio;
    private Integer outputCount;
    private String callbackUrl;

    private Builder() {}

    /** Sets the model slug using a typed model value. */
    public Builder model(RemixImageModel value) {
      this.model = java.util.Objects.requireNonNull(value, "model").value();
      return this;
    }

    /** Sets the model slug using a string value. */
    public Builder model(String value) {
      this.model = value;
      return this;
    }


    /** Sets the text prompt. */
    public Builder prompt(String value) {
      this.prompt = value;
      return this;
    }

    /** Sets the source image URL. */
    public Builder sourceImageUrl(String value) {
      this.sourceImageUrl = value;
      return this;
    }

    /** Sets the output aspect ratio. */
    public Builder aspectRatio(String value) {
      this.aspectRatio = value;
      return this;
    }

    /** Sets the number of generated outputs. */
    public Builder outputCount(int value) {
      this.outputCount = value;
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = value;
      return this;
    }

    /** Builds immutable remix image parameters. */
    public RemixImageParams build() {
      return new RemixImageParams(this);
    }
  }
}
