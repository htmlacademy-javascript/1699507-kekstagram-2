//Массив допустимых расширений файлов для загрузки
const TYPES_FILE = ['jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('#upload-file');
const uploadPreviewContainer = document.querySelector('.img-upload__preview');
const uploadPreview = uploadPreviewContainer.querySelector('img');
const previews = document.querySelectorAll('.effects__preview');

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = TYPES_FILE.includes(fileExt);

  if (matches) {
    // Создаем blob: URL
    const blobUrl = URL.createObjectURL(file);

    // Устанавливаем blob: URL в src изображения
    uploadPreview.src = blobUrl;

    // Устанавливаем blob: URL в background-image для превью эффектов
    previews.forEach((filter) => {
      filter.style.backgroundImage = `url(${blobUrl})`;
    });
  }
});
