// Массив допустимых расширений файлов для загрузки
const TYPES_FILE = ['jpg', 'jpeg', 'png'];

const uploadFileElement = document.querySelector('#upload-file');
const uploadPreviewContainerElement = document.querySelector('.img-upload__preview');
const uploadPreviewElement = uploadPreviewContainerElement.querySelector('img');
const previewElements = document.querySelectorAll('.effects__preview');

// Обработчик изменения файла
const onUploadFileChange = () => {
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = TYPES_FILE.includes(fileExt);

  if (matches) {
    // Создаем blob: URL
    const blobUrl = URL.createObjectURL(file);

    // Устанавливаем blob: URL в src изображения
    uploadPreviewElement.src = blobUrl;

    // Устанавливаем blob: URL в background-image для превью эффектов
    previewElements.forEach((previewElement) => {
      previewElement.style.backgroundImage = `url(${blobUrl})`;
    });
  }
};

// Добавляем обработчик события
uploadFileElement.addEventListener('change', onUploadFileChange);
