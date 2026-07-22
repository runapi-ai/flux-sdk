package ai.runapi.flux.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for text to image operations. */
public final class TextToImageModel extends FluxValue {
  /** flux-2-klein model slug. */
  public static final TextToImageModel FLUX_2_KLEIN = new TextToImageModel("flux-2-klein");
  /** flux-dev model slug. */
  public static final TextToImageModel FLUX_DEV = new TextToImageModel("flux-dev");
  /** flux-pro model slug. */
  public static final TextToImageModel FLUX_PRO = new TextToImageModel("flux-pro");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public TextToImageModel(String value) {
    super(value);
  }
}
