import { renderPhotos } from './thumbnail.js';
import { debounce, DEBOUNCE_DELAY } from './util.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const MAX_PICTURE_COUNT = 10;

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.default;
let pictures = [];

const debouncedRender = debounce(renderPhotos, DEBOUNCE_DELAY);

function onFilterClick(evt) {
  const targetButtonElement = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButtonElement.matches('button' || activeButton === targetButtonElement)) {
    return;
  }

  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButtonElement.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButtonElement.id;

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];

  switch (currentFilter) {
    case Filter.DEFAULT:
      filteredPictures = pictures.slice();
      break;
    case Filter.RANDOM:
      filteredPictures = pictures.slice().sort(() => 0.5 - Math.random()).slice(0, MAX_PICTURE_COUNT);
      break;
    case Filter.DISCUSSED:
      filteredPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  debouncedRender(filteredPictures);
}

function configFilter(picturesData) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterClick);
  pictures = picturesData;
}

export { configFilter };
