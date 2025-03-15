import { renderPhotos } from './thumbnail.js';
import { debounce } from './util.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const filterElement = document.querySelector('.img-filters');
let currentFilter = 'filter-default';
let pictures = [];

const debouncedRender = debounce(renderPhotos, 500);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];
  if (currentFilter === 'filter-default') {
    filteredPictures = pictures;
  }
  if (currentFilter === 'filter-random') {
    filteredPictures = pictures.toSorted(() => 0.5 - Math.random()).slice(0, 10);
  }
  if (currentFilter === 'filter-discussed') {
    filteredPictures = pictures.toSorted((a, b) => b.comments.length - a.comments.length);
  }
  debouncedRender(filteredPictures);
}

function configFilter(picturesData) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = picturesData;
}

export { configFilter };
