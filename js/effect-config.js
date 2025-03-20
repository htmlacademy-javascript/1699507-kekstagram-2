const StepCountSlider = {
  stepMin: 0.1,
  stepMax: 1,
};

const FilterName = {
  GRAYSCALE: 'grayscale',
  SEPIA: 'sepia',
  INVERT: 'invert',
  BLUR: 'blur',
  BRIGHTNESS: 'brightness',
};

const EffectConfig = {
  none: {
    min: 0,
    max: 100,
    step: StepCountSlider.stepMax,
    unit: '',
  },
  chrome: {
    filter: FilterName.GRAYSCALE,
    min: 0,
    max: StepCountSlider.stepMax,
    step: StepCountSlider.stepMin,
    unit: '',
  },
  sepia: {
    filter: FilterName.SEPIA,
    min: 0,
    max: 1,
    step: StepCountSlider.stepMin,
    unit: '',
  },
  marvin: {
    filter: FilterName.INVERT,
    min: 0,
    max: 100,
    step: StepCountSlider.stepMax,
    unit: '%',
  },
  phobos: {
    filter: FilterName.BLUR,
    min: 0,
    max: 3,
    step: StepCountSlider.stepMin,
    unit: 'px',
  },
  heat: {
    filter: FilterName.BRIGHTNESS,
    min: 1,
    max: 3,
    step: StepCountSlider.stepMin,
    unit: '',
  },
};

export { EffectConfig };
