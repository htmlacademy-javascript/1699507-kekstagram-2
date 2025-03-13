import { EffectConfig } from './effect-config.js';

const form = document.querySelector('.img-upload__form');
const imagePreview = form.querySelector('.img-upload__preview img');
const effectLevel = form.querySelector('.effect-level__value');
const effectSliderContainer = form.querySelector('.img-upload__effect-level');
const effectSlider = form.querySelector('.effect-level__slider');
const effectsList = form.querySelector('.effects__list');

let currentEffect = 'none';

// Инициализация слайдера
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

// Обновление параметров слайдера
const updateSliderOptions = (effect) => {
  effectSlider.noUiSlider.updateOptions({
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
    imagePreview.style.filter = 'none';
    effectLevel.value = '';
    return;
  }

  const { filter, unit } = EffectConfig[effect];
  imagePreview.style.filter = `${filter}(${value}${unit})`;
  effectLevel.value = value;
};

// Обработчик изменения положения слайдера
effectSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  applyEffect(currentEffect, value);
});

// Обработчик изменения эффекта
effectsList.addEventListener('change', (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;

    if (currentEffect === 'none') {
      effectSliderContainer.classList.add('hidden');
      applyEffect('none');
    } else {
      effectSliderContainer.classList.remove('hidden');
      updateSliderOptions(currentEffect);
    }

    // Сброс слайдера к максимальному значению
    effectSlider.noUiSlider.set(EffectConfig[currentEffect].max);
  }
});

//Функция сброса эффектов
const resetEffects = () => {
  currentEffect = 'none';
  imagePreview.style.filter = 'none';
  effectLevel.value = '';
  effectSliderContainer.classList.add('hidden');
  effectsList.querySelector('#effect-none').checked = true;
  effectSlider.noUiSlider.updateOptions({
    range: { min: 0, max: 100 },
    start: 100
  });
};

// Инициализация состояния
effectSliderContainer.classList.add('hidden');

export { resetEffects };
