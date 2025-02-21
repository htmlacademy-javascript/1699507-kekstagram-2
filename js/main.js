import './util.js';
import {addPhoto} from './data.js';
import { renderPhotos } from './thumbnail.js';
import './full-thumbnail.js';

renderPhotos(addPhoto());
