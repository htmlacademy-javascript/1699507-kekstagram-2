import { resetEffects } from './effect-slider.js';
import { onEscKeydown } from './util.js';
import { numDecline } from './util.js';
import { resetScale } from './zoom-effect.js';
import { sendData } from './api.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAG = 5;
let errorMessaga = '';

const form = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = form.querySelector('#upload-file');
const photoEditorForm = form.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const submitButton = form.querySelector('#upload-submit');

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  onEscKeydown(evt, () => {
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      form.reset();
      closePhotoEditor();
    }
  });
};

function closePhotoEditor () {
  resetScale();
  resetEffects();

  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  form.reset();
}

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
});

const error = () => errorMessaga;
const isHashtagsValid = (value) => {
  errorMessaga = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: 'Хештег не может быть больше 20 символов',
    },
    {
      check: inputArray.length > MAX_HASHTAG,
      error: `Нельзя указать больше ${MAX_HASHTAG} ${numDecline(
        MAX_HASHTAG, 'хештега', 'хештегов', 'хештегов'
      )}, `
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessaga = rule.error;
    }
    return !isInvalid;
  });
};


pristine.addValidator(commentInput, (value) => value.length <= 140, 'Длина вашего комментраия не должна быть больше 140 символов');

pristine.addValidator(hashtagInput, isHashtagsValid, error, false);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showSuccess = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  const successElement = template.querySelector('.success');
  document.body.append(successElement);

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      successElement.remove();
      document.removeEventListener('click', onDocumentClick);
    }
  };

  successElement.querySelector('.success__button').addEventListener('click', () => successElement.remove());
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscKeydown(() => successElement.remove()));
};

const showError = () => {
  const template = document.querySelector('#error').content.cloneNode(true);
  const errorElement = template.querySelector('.error');
  document.body.append(errorElement);

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      errorElement.remove();
      document.removeEventListener('click', onDocumentClick);
    }
  };

  errorElement.querySelector('.error__button').addEventListener('click', () => errorElement.remove());
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscKeydown(() => errorElement.remove()));
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(form))
      .then(() => {
        closePhotoEditor();
        showSuccess();
      })
      .catch(showError)
      .finally(unblockSubmitButton);
  }
});

initUploadModal();

