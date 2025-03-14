import './util.js';
import { renderPhotos } from './thumbnail.js';
import { openFullThumbnail } from './full-thumbnail.js';
import './render-comments.js';
import './form-validation.js';
import './zoom-effect.js';
import './effect-slider.js';
import './load-photo.js';
import { loadPhotos } from './api.js';

let loadedPhotos = [];

const initGallery = () => {
  document.querySelectorAll('.pictures .picture').forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullThumbnail(item.dataset.pictureId, loadedPhotos);
    });
  });
};

const showDataError = () => {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  const errorElement = template.querySelector('.data-error');
  document.body.append(errorElement);

  setTimeout(() => errorElement.remove(), 5000);
};

loadPhotos()
  .then((photos) => {
    loadedPhotos = photos;
    renderPhotos(photos);
    initGallery();
  })
  .catch(() => showDataError());
