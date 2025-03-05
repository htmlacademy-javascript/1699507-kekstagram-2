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
  const renderComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const rebderCommentsLength = renderComments.length + currentCount;

  renderComments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode);
  });

  socialCommentsNode.appendChild(socialCommentsFragment);
  commentsCountNode.firstChild.textContent = `${rebderCommentsLength} из `;
  commentsCountNode.querySelector('.comments-count').textContent = comments.length;

  if (renderCommentsLength >= comments.length) {
    commentsLoaderNode.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.innerHTML = '';
  commentsLoaderNode.classList.remove('hidden');
  commentsLoaderNode.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  commentsLoaderNode.addEventListener('click', renderNextComments);
};

export { clearComments, renderComments};
