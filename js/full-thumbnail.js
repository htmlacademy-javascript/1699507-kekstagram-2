import { onEscKeydown } from './util.js';
import { clearComments, renderComments } from './render-comments.js';

const fullThumbnail = document.querySelector('.big-picture');
const fullThumbnailImgNode = document.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = fullThumbnail.querySelector('.likes-count');
const messageCaptionNode = fullThumbnail.querySelector('.social__caption');
const fullThumbnailCancelNode = fullThumbnail.querySelector('.big-picture__cancel');

function onFullThumbnailCancelClick() {
  closefullThumbnail();
}

const closeOnDocumentEscape = (evt) => {
  onEscKeydown(evt, closefullThumbnail);
};

function closefullThumbnail() {
  clearComments();

  fullThumbnail.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnDocumentEscape);
}

const openFullThumbnail = (pictureId, photos) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

  fullThumbnailImgNode.src = currentPhoto.url;
  likesCountNode.innerHTML = currentPhoto.likes;
  messageCaptionNode.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  fullThumbnail.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullThumbnailCancelNode.addEventListener('click', onFullThumbnailCancelClick);
  document.addEventListener('keydown', closeOnDocumentEscape);
};

export { openFullThumbnail };
