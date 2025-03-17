const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosList = document.querySelector('.pictures');


const renderPhoto = ({id, url, likes, comments }) => {
  const photoPreviw = pictureTemplate.cloneNode(true);

  photoPreviw.dataset.pictureId = id;
  photoPreviw.querySelector('.picture__img').src = url;
  photoPreviw.querySelector('.picture__likes').textContent = likes;
  photoPreviw.querySelector('.picture__comments').textContent = comments.length;

  return photoPreviw;
};

const renderPhotos = (photos) => {
  // Удаляем предыдущие фото
  const currentPhotos = photosList.querySelectorAll('.picture');
  currentPhotos.forEach((photo) => photo.remove());

  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    photosFragment.appendChild(renderPhoto(photo));
  });
  photosList.appendChild(photosFragment);
};

export { renderPhotos, pictureTemplate };
