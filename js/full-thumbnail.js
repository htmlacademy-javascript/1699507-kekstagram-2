import { photos } from './data.js';
import { onEscKeydown } from './util.js';

const fullThumbnail = document.querySelector('.big-picture');
console.log(fullThumbnail);
const fullThumbnailImgNode = document.querySelector('.big-picture__img').querySelector('img');
console.log(fullThumbnailImgNode);
const likesCountNode = fullThumbnail.querySelector('.likes-count');
console.log(likesCountNode);
const socialCommentsNode = fullThumbnail.querySelector('.social__comments');
console.log(socialCommentsNode);
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
console.log(socialCommentTemplate);
const commentsCaptionNode = fullThumbnail.querySelector('.social__caption');
console.log(commentsCaptionNode);
const commentsCountNode = fullThumbnail.querySelector('.social__comment-count');
console.log(commentsCountNode);
const commentsLoaderNode = fullThumbnail.querySelector('.social__comments-loader');
console.log(commentsLoaderNode);
const fullThumbnailCancelNode = fullThumbnail.querySelector('.big-picture__cancel');
console.log(fullThumbnailCancelNode);

const closefullThumbnail = () => {
  fullThumbnail.classList.add('hidden');
  fullThumbnailCancelNode.removeEventListener('keydown', onEscKeydown);
};

const onFullThumbnailCancelClick = () => {
  closefullThumbnail();
};

const openFullThumbnail = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === +(pictureId));
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
  commentsCaptionNode.textContent = currentPhoto.description;
  commentsCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');

  fullThumbnail.classList.remove('hidden');
  fullThumbnailCancelNode.addEventListener('click', onFullThumbnailCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

export { openFullThumbnail };
