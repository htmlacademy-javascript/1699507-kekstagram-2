import './util.js';
import {addPhoto} from './data.js';
import { renderPhotos } from './thumbnail.js';
import { pictureTemplate } from './thumbnail.js';
import { openFullThumbnail } from './full-thumbnail.js';

pictureTemplate.addEventListener('click', (evt) => {
  const currentPictureNode = evt.target.closest('.picture');

  if(currentPictureNode) {
    evt.preventDefault();
    openFullThumbnail(currentPictureNode.dataset.pictureId);
  }
});

renderPhotos(addPhoto());
