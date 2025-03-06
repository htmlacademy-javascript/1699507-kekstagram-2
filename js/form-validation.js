import { onEscKeydown } from './util.js';

const form = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = form.querySelector('#upload-file');
const photoEditorForm = form.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (onEscKeydown(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      form.requestFullscreen();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
}

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

initUploadModal();

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

function validateSymbolCount(count) {
  return count.length <= 140;
}

// pristine.addValidator(form.querySelector('.text__description'), validateSymbolCount, 'Длина комментария не может составлять больше 140 символов');
// /**
//  * Фиксируем условия валидации:
//  * 1. Длина комментария не может быть больше 140 символов. - ЕСТЬ
//  * 2. Комментиарии не обязательны - required не указываем - ЕСТЬ
//  * 3. Если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения. - пока не могу проверить
//  * По ХЭШТЕГАМ
//  * 1. хэштег начинается с символа # (решётка);
//  * 2. строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
//  * 3. хеш-тег не может состоять только из одной решётки;
//  * 4. максимальная длина одного хэштега 20 символов, включая решётку;
//  * 5. хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом; - приводим к lowerCase
//  * 6.хэштеги разделяются пробелами;
//  * 7.один и тот же хэштег не может быть использован дважды;
//  * 8. нельзя указать больше пяти хэштегов;
//  * 9.хэштеги необязательны - required не указываем - ЕСТЬ;
//  * 10.если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
//  *
//  *
//  * Ошибки выводятся внутри блока .img-upload__field-wrapper соответствующего поля. Также, если поле заполнено неверно, блоку, в котором выводится текст ошибки, добавляется класс .img-upload__field-wrapper--error - ЕСТЬ
//  *
//  * На время выполнения запроса к серверу кнопка «Отправить» блокируется.
//  */

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
