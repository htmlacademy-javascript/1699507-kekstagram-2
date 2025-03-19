import { MAX_VALUE_SLIDER, MIN_VALUE_SLIDER } from './effect-slider';

const STEP_COUNT_SLIDER = {
  stepMin: 0.1,
  stepMax: 1,
};

const FILTER_NAME = {
  grayscale: 'grayscale',
  sepia: 'sepia',
  invert: 'invert',
  blur: 'blur',
  brightness: 'brightness',
};

const EffectConfig = {
  none: {
    min: MIN_VALUE_SLIDER,
    max: MAX_VALUE_SLIDER,
    step: STEP_COUNT_SLIDER.stepMax,
    unit: '',
  },
  chrome: {
    filter: FILTER_NAME.grayscale,
    min: MIN_VALUE_SLIDER,
    max: STEP_COUNT_SLIDER.stepMax,
    step: STEP_COUNT_SLIDER.stepMin,
    unit: '',
  },
  sepia: {
    filter: FILTER_NAME.sepia,
    min: MIN_VALUE_SLIDER,
    max: 1,
    step: STEP_COUNT_SLIDER.stepMin,
    unit: '',
  },
  marvin: {
    filter: FILTER_NAME.invert,
    min: MIN_VALUE_SLIDER,
    max: MAX_VALUE_SLIDER,
    step: STEP_COUNT_SLIDER.stepMax,
    unit: '%',
  },
  phobos: {
    filter: FILTER_NAME.blur,
    min: MIN_VALUE_SLIDER,
    max: 3,
    step: STEP_COUNT_SLIDER.stepMin,
    unit: 'px',
  },
  heat: {
    filter: FILTER_NAME.brightness,
    min: 1,
    max: 3,
    step: STEP_COUNT_SLIDER.stepMin,
    unit: '',
  },
};

export { EffectConfig };
