import './util.js';
import { renderPhotos } from './thumbnail.js';
import { openFullThumbnail } from './full-thumbnail.js';
import './render-comments.js';
import './form-validation.js';
import './zoom-effect.js';
import './effect-slider.js';
import './load-photo.js';
import { loadPhotos } from './api.js';
import { configFilter } from './sorting.js';

const initGallery = (photos) => {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-picture-id]');

    if (picture) {
      evt.preventDefault();
      openFullThumbnail(picture.dataset.pictureId, photos);
    }
  });
};

const showDataError = () => {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  const errorElement = template.querySelector('.data-error');
  document.body.append(errorElement);

  setTimeout(() => errorElement.remove(), 5000);
};

loadPhotos().then((photos) => {
  renderPhotos(photos);
  initGallery(photos);
  configFilter(photos);
}).catch(() => showDataError());
