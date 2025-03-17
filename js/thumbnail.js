const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosList = document.querySelector('.pictures');


const renderPhoto = ({id, url, likes, comments }) => {
  const photoPreview = pictureTemplate.cloneNode(true);

  photoPreview.dataset.pictureId = id;
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__likes').textContent = likes;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;

  return photoPreview;
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
