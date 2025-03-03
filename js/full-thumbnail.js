import { photos } from './data.js';
import { onEscKeydown } from './util.js';

const fullThumbnail = document.querySelector('.big-picture');
const fullThumbnailImgNode = document.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = fullThumbnail.querySelector('.likes-count');
const socialCommentsNode = fullThumbnail.querySelector('.social__comments');
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
const messageCaptionNode = fullThumbnail.querySelector('.social__caption');
const commentsCountNode = fullThumbnail.querySelector('.social__comment-count');
const commentsLoaderNode = fullThumbnail.querySelector('.social__comments-loader');
const fullThumbnailCancelNode = fullThumbnail.querySelector('.big-picture__cancel');

function onFullThumbnailCancelClick() {
  closefullThumbnail();
}

const closeOnDocumentEscape = (evt) => {
  onEscKeydown(evt, closefullThumbnail);
};

function closefullThumbnail() {
  fullThumbnail.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnDocumentEscape);
}

const openFullThumbnail = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  fullThumbnailImgNode.src = currentPhoto.url;
  likesCountNode.innerHTML = currentPhoto.likes;
  socialCommentsNode.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);
    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode);
  });

  socialCommentsNode.appendChild(socialCommentsFragment);
  messageCaptionNode.textContent = currentPhoto.description;
  commentsCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');

  fullThumbnail.classList.remove('hidden');
  fullThumbnailCancelNode.addEventListener('click', onFullThumbnailCancelClick);

  fullThumbnailCancelNode.focus();

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeOnDocumentEscape);
};

export { openFullThumbnail };
