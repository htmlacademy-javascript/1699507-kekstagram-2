const PHOTO_COUNT = 25;

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

//Enam объекты
const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 0,
  MAX: 30,
};

//Массив для заполнения данными
const photos = [];

const description = [
  'Без фильтров',
  'Новый вид животных',
  'Жизнь в океане',
  'Парад планет',
  'Звездный дождь в феврале',
];

const comments = [
  'Всё отлично!', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Функция для получения случайного числа

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция для получения случайного элемента массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Функция для получения комментариев

const addComments = () => {
  const feedback = [];

  for (let i = 0; i < getRandomInteger(Comments.MIN, Comments.MAX); i++) {
    feedback.push(
      {
        id: getRandomInteger(0, 999),
        avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
        message: getRandomArrayElement(comments),
        name: getRandomArrayElement(NAMES),
      }
    );
  }

  return feedback;
};

//Функция получения объекта для описания фото

const addPhoto = () => {
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    photos.push ({
      id: i,
      url: `photos/${ i + 1 }.jpg`,
      description: getRandomArrayElement(description),
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: addComments(),
    });
  }

  return photos;
};

addPhoto();
