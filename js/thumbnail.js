const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosListElement = document.querySelector('.pictures');

const renderPhoto = ({ id, url, likes, comments, description }) => {
  const photoPreview = pictureTemplate.cloneNode(true);

  photoPreview.dataset.pictureId = id;
  const imgElement = photoPreview.querySelector('.picture__img');
  imgElement.src = url;
  imgElement.alt = description;
  photoPreview.querySelector('.picture__likes').textContent = likes;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;

  return photoPreview;
};

const renderPhotos = (photos) => {
  const currentPhotos = photosListElement.querySelectorAll('.picture');
  currentPhotos.forEach((photo) => photo.remove());

  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    photosFragment.appendChild(renderPhoto(photo));
  });
  photosListElement.appendChild(photosFragment);
};

export { renderPhotos, pictureTemplate };
