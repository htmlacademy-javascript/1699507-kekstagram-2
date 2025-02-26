const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closefullThumbnail();
  }
};

//Функция для получения случайного элемента массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomArrayElement, getRandomInteger, onEscKeydown};
