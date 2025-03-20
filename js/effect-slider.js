import { EffectConfig } from './effect-config.js';

const MAX_VALUE_SLIDER = 100;
const MIN_VALUE_SLIDER = 0;
const SLIDER_STEP_DEFAULT = 1;

const formElement = document.querySelector('.img-upload__form');
const imagePreviewElement = formElement.querySelector('.img-upload__preview img');
const effectLevelElement = formElement.querySelector('.effect-level__value');
const effectSliderContainerElement = formElement.querySelector('.img-upload__effect-level');
const effectSliderElement = formElement.querySelector('.effect-level__slider');
const effectsListElement = formElement.querySelector('.effects__list');

let currentEffect = 'none';

// Инициализация слайдера
noUiSlider.create(effectSliderElement, {
  range: {
    min: MIN_VALUE_SLIDER,
    max: MAX_VALUE_SLIDER,
  },
  start: MAX_VALUE_SLIDER,
  step: SLIDER_STEP_DEFAULT,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

// Обновление параметров слайдера
const updateSliderOptions = (effect) => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: EffectConfig[effect].min,
      max: EffectConfig[effect].max,
    },
    start: EffectConfig[effect].max,
    step: EffectConfig[effect].step,
  });
};

// Применение эффекта к изображению
const applyEffect = (effect, value) => {
  if (effect === 'none') {
    imagePreviewElement.style.filter = 'none';
    effectLevelElement.value = '';
    return;
  }

  const { filter, unit } = EffectConfig[effect];
  imagePreviewElement.style.filter = `${filter}(${value}${unit})`;
  effectLevelElement.value = value;
};

// Обработчик изменения положения слайдера
const onSliderUpdate = (values, handle) => {
  const value = values[handle];
  applyEffect(currentEffect, value);
};

// Обработчик изменения эффекта
const onEffectChange = (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;

    if (currentEffect === 'none') {
      effectSliderContainerElement.classList.add('hidden');
      applyEffect('none');
    } else {
      effectSliderContainerElement.classList.remove('hidden');
      updateSliderOptions(currentEffect);
    }

    // Сброс слайдера к максимальному значению
    effectSliderElement.noUiSlider.set(EffectConfig[currentEffect].max);
  }
};

// Функция сброса эффектов
const resetEffects = () => {
  currentEffect = 'none';
  imagePreviewElement.style.filter = 'none';
  effectLevelElement.value = '';
  effectSliderContainerElement.classList.add('hidden');
  effectsListElement.querySelector('#effect-none').checked = true;
  effectSliderElement.noUiSlider.updateOptions({
    range: { min: MIN_VALUE_SLIDER, max: MAX_VALUE_SLIDER },
    start: MAX_VALUE_SLIDER
  });
};

effectSliderElement.noUiSlider.on('update', onSliderUpdate);

effectsListElement.addEventListener('change', onEffectChange);

// Инициализация состояния
effectSliderContainerElement.classList.add('hidden');

export { resetEffects };
