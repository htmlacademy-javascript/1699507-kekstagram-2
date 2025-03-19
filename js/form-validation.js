import { resetEffects } from './effect-slider.js';
import { onEscKeydown, numDecline } from './util.js';
import { resetScale } from './zoom-effect.js';
import { sendData } from './api.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAG = 5;

const form = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFileControl = form.querySelector('#upload-file');
const photoEditorForm = form.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');

let pristine;
let errorMessage = '';
let message = null;

// Общие функции для работы с формой.
const toggleFormState = () => {
  photoEditorForm.classList.toggle('hidden');
  pageBody.classList.toggle('modal-open');
};

const closePhotoEditor = () => {
  //Сброс масштаба
  resetScale();
  //Сброс эффектов
  resetEffects();
  //Переключение состояний формы
  toggleFormState();
  pristine.reset();
  //Удаление обработчиков события
  document.removeEventListener('keydown', onDocumentEscKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  //Сброс значения поля загрузки файла
  uploadFileControl.value = '';

  // Освобождаем blob: URL
  const uploadPreview = document.querySelector('.img-upload__preview img');
  if (uploadPreview.src.startsWith('blob:')) {
    URL.revokeObjectURL(uploadPreview.src);
  }
  form.reset();
};

// Общая логика сообщений
const createMessageHandler = (templateId) => {
  const template = document.querySelector(`#${templateId}`).content.cloneNode(true);
  message = template.querySelector(`.${templateId}`);
  document.body.append(message);

  const removeMessage = () => {
    if (message) { // Проверяем, существует ли message
      message.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeyDown);
      message = null; // Сбрасываем переменную message
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
      // Сбрасываем переменную message
      message = null;
    });
  } else {
    // Если сообщения нет, закрываем форму
    onEscKeydown(evt, () => {
      if (![hashtagInput, commentInput].includes(document.activeElement)) {
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

  const inputArray = inputText.split(/\s+/);
  const uniqueHashtags = new Set(inputArray.map((item) => item.toLowerCase()));

  const validationRules = [
    { check: inputArray.some((item) => item === '#'), error: 'Хештег не может состоять только из решетки' },
    { check: inputArray.some((item) => item.slice(1).includes('#')), error: 'Хештеги разделяются пробелами' },
    { check: inputArray.some((item) => !item.startsWith('#')), error: 'Хештег должен начинаться с символа #' },
    { check: uniqueHashtags.size !== inputArray.length, error: 'Хештеги не должны повторяться' },
    { check: inputArray.some((item) => item.length > MAX_SYMBOLS), error: 'Хештег не может быть больше 20 символов' },
    { check: inputArray.length > MAX_HASHTAG, error: `Нельзя указать больше ${MAX_HASHTAG} ${numDecline(MAX_HASHTAG, 'хештега', 'хештегов', 'хештегов')}` },
    { check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)), error: 'Хэштег содержит недопустимые символы' },
  ];

  return validationRules.every((rule) => {
    if (rule.check) {
      errorMessage = rule.error;
    }
    return !rule.check;
  });
};


const initFormValidation = () => {
  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(commentInput,
    (value) => value.length <= 140,
    'Длина комментария не должна превышать 140 символов'
  );

  pristine.addValidator(hashtagInput,
    validateHashtags,
    () => errorMessage,
    false
  );

  // Валидация и отправка формы
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      submitButton.disabled = true;
      submitButton.textContent = 'Публикую...';

      try {
        await sendData(new FormData(form));
        closePhotoEditor();
        createMessageHandler('success');
      } catch {
        createMessageHandler('error'); // Создаем сообщение об ошибке
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Опубликовать';
      }
    }
  });

  uploadFileControl.addEventListener('change', () => {
    toggleFormState();
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentEscKeydown);
  });
};

initFormValidation();
