import { onEscKeydown } from './util.js';
import { clearComments, renderComments } from './render-comments.js';

const fullThumbnailElement = document.querySelector('.big-picture');
const fullThumbnailImgElement = document.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = fullThumbnailElement.querySelector('.likes-count');
const messageCaptionElement = fullThumbnailElement.querySelector('.social__caption');
const fullThumbnailCancelElement = fullThumbnailElement.querySelector('.big-picture__cancel');

function onFullThumbnailCancelClick() {
  closeFullThumbnail();
}

const onDocumentEscKeydown = (evt) => {
  onEscKeydown(evt, closeFullThumbnail);
};

function closeFullThumbnail() {
  clearComments();

  fullThumbnailElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

const openFullThumbnail = (pictureId, photos) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

  fullThumbnailImgElement.src = currentPhoto.url;
  likesCountElement.innerHTML = currentPhoto.likes;
  messageCaptionElement.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  fullThumbnailElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullThumbnailCancelElement.addEventListener('click', onFullThumbnailCancelClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

export { openFullThumbnail };
