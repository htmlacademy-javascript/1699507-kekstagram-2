const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const fullThumbnailElement = document.querySelector('.big-picture');
const socialCommentsElement = fullThumbnailElement.querySelector('.social__comments');
const socialCommentElement = socialCommentsElement.querySelector('.social__comment');
const commentsCountElement = fullThumbnailElement.querySelector('.social__comment-count');
const commentsLoaderElement = fullThumbnailElement.querySelector('.social__comments-loader');
socialCommentsElement.innerHTML = '';

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const socialCommentTemplate = socialCommentElement.cloneNode(true);

    socialCommentTemplate.querySelector('.social__picture').src = comment.avatar;
    socialCommentTemplate.querySelector('.social__picture').alt = comment.name;
    socialCommentTemplate.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentTemplate);
  });

  socialCommentsElement.appendChild(socialCommentsFragment);
  commentsCountElement.querySelector('.social__comment-shown-count').textContent = `${renderCommentsLength}`;
  commentsCountElement.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderCommentsLength >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const onCommentLoaderClick = () => {
  renderNextComments();
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', onCommentLoaderClick);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  commentsLoaderElement.addEventListener('click', onCommentLoaderClick);
};

export { clearComments, renderComments};
