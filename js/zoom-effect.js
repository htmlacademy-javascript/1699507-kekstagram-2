//Шаг зума
const ZoomStep = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

//Группируем связанные элементы в одном объекты
const formElement = document.querySelector('.img-upload__form');
const photoEditorFormElement = formElement.querySelector('.img-upload__overlay');

const ScaleControl = {
  plusButton: photoEditorFormElement.querySelector('.scale__control--bigger'),
  minusButton: photoEditorFormElement.querySelector('.scale__control--smaller'),
  scaleValue: photoEditorFormElement.querySelector('.scale__control--value'),
  image: photoEditorFormElement.querySelector('.img-upload__preview img'),
};

//Функция масштабирования
const updateScale = (direction) => {
  //Получаем текущее значение, система счисления десятичная
  const currentValue = parseInt(ScaleControl.scaleValue.value, 10);
  //Вычисляем текущее значение
  let newValue = currentValue + (ZoomStep.STEP * direction);
  //Ограничиваем диапазон
  newValue = Math.max(ZoomStep.MIN, Math.min(newValue, ZoomStep.MAX));
  //Обновляем интерфейс
  ScaleControl.scaleValue.value = `${newValue}%`;
  //Применяю трансформацию к изображению
  ScaleControl.image.style.transform = `scale(${newValue / 100})`;
};

//Сброс масштаба
const resetScale = () => {
  ScaleControl.scaleValue.value = '100%';
  ScaleControl.image.style.transform = 'scale(1.00)';
};

//Обработчики событий
ScaleControl.plusButton.addEventListener('click', () => updateScale(1));
ScaleControl.minusButton.addEventListener('click', () => updateScale(-1));

export { resetScale };
