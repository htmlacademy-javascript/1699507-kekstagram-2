import { photoEditorForm } from './form-validation';

const ZoomStep = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

//Группируем связанные элементы в одном объекты
const controls = {
  plusButton: photoEditorForm.querySelector('.scale__control--bigger'),
  minusButton: photoEditorForm.querySelector('.scale__control--smaller'),
  scaleValue: photoEditorForm.querySelector('.scale__control--value'),
  image: photoEditorForm.querySelector('.img-upload__preview img'),
};

//Функция масштабирования
const updateScale = (direction) => {
  const currentValue = parseInt(controls.scaleValue.value, 10);
  let newValue = currentValue + (ZoomStep.STEP * direction);

  newValue = Math.max(ZoomStep.MIN, Math.min(newValue, ZoomStep.MAX));

  controls.scaleValue.value = `${newValue}%`;
  controls.image.style.transform = `scale(${newValue / 100})`;
};

controls.plusButton.addEventListener('click', () => updateScale(1));
controls.minusButton.addEventListener('click', () => updateScale(-1));
