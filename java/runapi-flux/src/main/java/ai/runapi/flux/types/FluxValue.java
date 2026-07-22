package ai.runapi.flux.types;

import ai.runapi.core.types.RunApiValue;

abstract class FluxValue extends RunApiValue {
  FluxValue(String value) {
    super(value);
  }
}
