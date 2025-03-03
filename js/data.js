import {getRandomInteger, getRandomArrayElement} from './util.js';

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

const DESCRIPTION = [
  'Без фильтров',
  'Новый вид животных',
  'Жизнь в океане',
  'Парад планет',
  'Звездный дождь в феврале',
];

const COMMENTS = [
  'Всё отлично!', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
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

const SvgCount = {
  MIN: 1,
  MAX: 6,
};

//Массив для заполнения данными
const photos = [];

// Функция для получения случайного числа


//Функция для получения комментариев

const addComments = () => {
  const feedback = [];

  for (let i = 0; i < getRandomInteger(Comments.MIN, Comments.MAX); i++) {
    feedback.push(
      {
        id: i,
        avatar: `img/avatar-${ getRandomInteger(SvgCount.MIN, SvgCount.MAX) }.svg`,
        message: getRandomArrayElement(COMMENTS),
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
      url: `photos/${ i }.jpg`,
      description: getRandomArrayElement(DESCRIPTION),
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: addComments(),
    });
  }

  return photos;
};

export { addPhoto, photos };


