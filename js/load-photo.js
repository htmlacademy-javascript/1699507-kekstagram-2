//Массив допустимых расширений файлов для загрузки
const TYPES_FILE = ['jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('#upload-file');
const uploadPreviewContainer = document.querySelector('.img-upload__preview');
const uploadPreview = uploadPreviewContainer.querySelector('img');
const previews = document.querySelectorAll('.effects__preview');

uploadFile.addEventListener('change', () => {

  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES_FILE.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadPreview.src = reader.result;

      previews.forEach((filter) => {
        filter.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
});
