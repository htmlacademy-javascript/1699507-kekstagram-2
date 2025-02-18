import { photos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosList = document.querySelector('.picture');

const renderPhoto = ({ url, likes, comments }) => {
  const photoPreviw = pictureTemplate.cloneNode(true);

  photoPreviw.querySelector('.picture__img').src = url;
  photoPreviw.querySelector('.picture__likes').textContent = likes;
  photoPreviw.querySelector('.picture__comments').textContent = comments.length;

  return photoPreviw;
};

const renderPhotos = () => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    photosFragment.appendChild(renderPhoto(photo));
  });

  photosList.appendChild(photosFragment);
};

renderPhotos();

export { renderPhotos };
