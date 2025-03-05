const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const fullThumbnail = document.querySelector('.big-picture');
const socialCommentsNode = fullThumbnail.querySelector('.social__comments');
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCountNode = fullThumbnail.querySelector('.social__comment-count');
const commentsLoaderNode = fullThumbnail.querySelector('.social__comments-loader');
socialCommentsNode.innerHTML = '';

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode);
  });

  socialCommentsNode.appendChild(socialCommentsFragment);
  commentsCountNode.querySelector('.social__comment-shown-count').textContent = `${renderCommentsLength} `;
  commentsCountNode.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderCommentsLength >= comments.length) {
    commentsLoaderNode.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const onCommentLoaderClick = () => {
  renderNextComments();
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.innerHTML = '';
  commentsLoaderNode.classList.remove('hidden');
  commentsLoaderNode.removeEventListener('click', onCommentLoaderClick);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  commentsLoaderNode.addEventListener('click', onCommentLoaderClick);
};

export { clearComments, renderComments};
