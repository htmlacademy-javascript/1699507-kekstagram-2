const API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const loadPhotos = () => fetch(`${API_URL}/data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }
    return response.json();
  });

const sendData = (formData) => fetch(API_URL, {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось отправить форму');
    }
    return response.json();
  });

export { loadPhotos, sendData };
