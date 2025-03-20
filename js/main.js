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

const TIME_DELAY_ERROR_ELEMENT = 5000;

const initGallery = (photos) => {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('[data-picture-id]');

    if (pictureElement) {
      evt.preventDefault();
      openFullThumbnail(pictureElement.dataset.pictureId, photos);
    }
  });
};

const showDataError = () => {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  const errorElement = template.querySelector('.data-error');
  document.body.append(errorElement);

  setTimeout(() => errorElement.remove(), TIME_DELAY_ERROR_ELEMENT);
};

loadPhotos().then((photos) => {
  renderPhotos(photos);
  initGallery(photos);
  configFilter(photos);
}).catch(() => showDataError());
