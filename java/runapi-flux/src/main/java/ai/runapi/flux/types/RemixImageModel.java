package ai.runapi.flux.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for remix image operations. */
public final class RemixImageModel extends FluxValue {
  /** flux-dev model slug. */
  public static final RemixImageModel FLUX_DEV = new RemixImageModel("flux-dev");
  /** flux-pro model slug. */
  public static final RemixImageModel FLUX_PRO = new RemixImageModel("flux-pro");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public RemixImageModel(String value) {
    super(value);
  }
}
