import { renderPhotos } from './thumbnail.js';
import { debounce } from './util.js';

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const DEBOUNCE_TIME_DELAY = 500;

const MAX_PICTURE_COUNT = 10;

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const filterElement = document.querySelector('.img-filters');
let currentFilter = FILTER.default;
let pictures = [];

const debouncedRender = debounce(renderPhotos, DEBOUNCE_TIME_DELAY);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button' || activeButton === targetButton)) {
    return;
  }

  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.id;

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];

  switch (currentFilter) {
    case FILTER.default:
      filteredPictures = pictures.slice();
      break;
    case FILTER.random:
      filteredPictures = pictures.slice().sort(() => 0.5 - Math.random()).slice(0, MAX_PICTURE_COUNT);
      break;
    case FILTER.discussed:
      filteredPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  debouncedRender(filteredPictures);
}

function configFilter(picturesData) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = picturesData;
}

export { configFilter };
