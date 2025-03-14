//Шаг зума
const ZoomStep = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

//Группируем связанные элементы в одном объекты
const form = document.querySelector('.img-upload__form');
const photoEditorForm = form.querySelector('.img-upload__overlay');
const controls = {
  plusButton: photoEditorForm.querySelector('.scale__control--bigger'),
  minusButton: photoEditorForm.querySelector('.scale__control--smaller'),
  scaleValue: photoEditorForm.querySelector('.scale__control--value'),
  image: photoEditorForm.querySelector('.img-upload__preview img'),
};

//Функция масштабирования
const updateScale = (direction) => {
  //Получаем текущее значение, система счисления десятичная
  const currentValue = parseInt(controls.scaleValue.value, 10);
  //Вычисляем текущее значение
  let newValue = currentValue + (ZoomStep.STEP * direction);
  //Ограничиваем диапазон
  newValue = Math.max(ZoomStep.MIN, Math.min(newValue, ZoomStep.MAX));
  //Обновляем интерфейс
  controls.scaleValue.value = `${newValue}%`;
  //Применяю трансформацию к изображению
  controls.image.style.transform = `scale(${newValue / 100})`;
};

//Сброс масштаба
const resetScale = () => {
  controls.scaleValue.value = '100%';
  controls.image.style.transform = 'scale(1.00)';
};

//Обработчики событий
controls.plusButton.addEventListener('click', () => updateScale(1));
controls.minusButton.addEventListener('click', () => updateScale(-1));

export { resetScale };
