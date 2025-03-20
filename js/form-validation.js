import { resetEffects } from './effect-slider.js';
import { onEscKeydown, numDecline } from './util.js';
import { resetScale } from './zoom-effect.js';
import { sendData } from './api.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAG = 5;

const formElement = document.querySelector('.img-upload__form');
const pageBodyElement = document.querySelector('body');
const uploadFileControlElement = formElement.querySelector('#upload-file');
const photoEditorFormElement = formElement.querySelector('.img-upload__overlay');
const photoEditorResetBtnElement = photoEditorFormElement.querySelector('#upload-cancel');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('#upload-submit');

let pristine;
let errorMessage = '';
let message = null;

// Общие функции для работы с формой.
const toggleFormState = () => {
  photoEditorFormElement.classList.toggle('hidden');
  pageBodyElement.classList.toggle('modal-open');
};

const closePhotoEditor = () => {
  // Сброс масштаба
  resetScale();
  // Сброс эффектов
  resetEffects();
  // Переключение состояний формы
  toggleFormState();
  pristine.reset();
  // Удаление обработчиков события
  document.removeEventListener('keydown', onDocumentEscKeydown);
  photoEditorResetBtnElement.removeEventListener('click', onPhotoEditorResetBtnClick);
  // Сброс значения поля загрузки файла
  uploadFileControlElement.value = '';

  // Освобождаем blob: URL
  const uploadPreviewElement = document.querySelector('.img-upload__preview img');
  if (uploadPreviewElement.src.startsWith('blob:')) {
    URL.revokeObjectURL(uploadPreviewElement.src);
  }
  formElement.reset();
};

// Общая логика сообщений
const createMessageHandler = (templateId) => {
  const template = document.querySelector(`#${templateId}`).content.cloneNode(true);
  message = template.querySelector(`.${templateId}`);
  document.body.append(message);

  const removeMessage = () => {
    if (message) {
      message.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeyDown);
      message = null;
    }
  };

  function onDocumentClick(evt) {
    if (!evt.target.closest(`.${templateId}__inner`)) {
      removeMessage();
    }
  }

  function onDocumentKeyDown(evt) {
    onEscKeydown(evt, removeMessage);
  }

  message.querySelector(`.${templateId}__button`).addEventListener('click', removeMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

// Обработчики событий
function onPhotoEditorResetBtnClick() {
  closePhotoEditor();
}

function onDocumentEscKeydown(evt) {
  if (message) {
    // Если есть сообщение об ошибке, закрываем его
    onEscKeydown(evt, () => {
      message.remove();
      message = null;
    });
  } else {
    // Если сообщения нет, закрываем форму
    onEscKeydown(evt, () => {
      if (![hashtagInputElement, commentInputElement].includes(document.activeElement)) {
        closePhotoEditor();
      }
    });
  }
}

// Валидация
const validateHashtags = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArrays = inputText.split(/\s+/);
  const uniqueHashtags = new Set(inputArrays.map((item) => item.toLowerCase()));

  const validationRules = [
    { check: inputArrays.some((item) => item === '#'), error: 'Хештег не может состоять только из решетки' },
    { check: inputArrays.some((item) => item.slice(1).includes('#')), error: 'Хештеги разделяются пробелами' },
    { check: inputArrays.some((item) => !item.startsWith('#')), error: 'Хештег должен начинаться с символа #' },
    { check: uniqueHashtags.size !== inputArrays.length, error: 'Хештеги не должны повторяться' },
    { check: inputArrays.some((item) => item.length > MAX_SYMBOLS), error: 'Хештег не может быть больше 20 символов' },
    { check: inputArrays.length > MAX_HASHTAG, error: `Нельзя указать больше ${MAX_HASHTAG} ${numDecline(MAX_HASHTAG, 'хештега', 'хештегов', 'хештегов')}` },
    { check: inputArrays.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)), error: 'Хэштег содержит недопустимые символы' },
  ];

  return validationRules.every((rule) => {
    if (rule.check) {
      errorMessage = rule.error;
    }
    return !rule.check;
  });
};

const initFormValidation = () => {
  pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(commentInputElement,
    (value) => value.length <= 140,
    'Длина комментария не должна превышать 140 символов'
  );

  pristine.addValidator(hashtagInputElement,
    validateHashtags,
    () => errorMessage,
    false
  );

  // Валидация и отправка формы
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      submitButtonElement.disabled = true;
      submitButtonElement.textContent = 'Публикую...';

      try {
        await sendData(new FormData(formElement));
        closePhotoEditor();
        createMessageHandler('success');
      } catch {
        // Создаем сообщение об ошибке
        createMessageHandler('error');
      } finally {
        submitButtonElement.disabled = false;
        submitButtonElement.textContent = 'Опубликовать';
      }
    }
  });

  uploadFileControlElement.addEventListener('change', () => {
    toggleFormState();
    photoEditorResetBtnElement.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentEscKeydown);
  });
};

initFormValidation();
