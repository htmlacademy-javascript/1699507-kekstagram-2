import { photoEditorForm } from './form-validation';

//Шаг зума
const zoom = {
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

