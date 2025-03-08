import './util.js';
import {addPhoto} from './data.js';
import { renderPhotos } from './thumbnail.js';
import { openFullThumbnail } from './full-thumbnail.js';
import './render-comments.js';
import './form-validation.js';

renderPhotos(addPhoto());

document.querySelectorAll('.pictures .picture').forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();

    openFullThumbnail(item.dataset.pictureId);
  });
});


