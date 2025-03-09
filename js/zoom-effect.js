import { photoEditorForm } from './form-validation';

//Шаг зума
const ZoomStep = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

//ищем кнопки
const plusButton = photoEditorForm.querySelector('.scale__control--bigger');
const minusButton = photoEditorForm.querySelector('.scale__control--smaller');
//ищем значение
const scaleValue = photoEditorForm.querySelector('.scale__control--value');
//ищем картинку
const imageThumbnail = photoEditorForm.querySelector('.img-upload__preview img');

plusButton.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) + ZoomStep.STEP;

  if (scale >= ZoomStep.MAX) {
    scale = ZoomStep.MAX;
  }

  scaleValue.value = `${scale }%`;
  scale = scale / 100;
  imageThumbnail.style.transform = `scale(${ scale })`;
});

minusButton.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) - ZoomStep.STEP;

  if (scale <= ZoomStep.MIN) {
    scale = ZoomStep.MIN;
  }

  scaleValue.value = `${scale }%`;
  scale = scale / 100;
  imageThumbnail.style.transform = `scale(${ scale })`;
});
