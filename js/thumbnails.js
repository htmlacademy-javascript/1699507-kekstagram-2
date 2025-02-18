import { photos } from './data.js';

const template = document.querySelector('#picture').content.querySelector('.picture');

// Отрисовка одной миниатюры
const photo = photos[10];
const image = template.querySelector('.picture__img');
image.src = photo.url;
image.alt = photo.description;
template.querySelector('.picture__comments').textContent = photo.comments.length;
template.querySelector('.picture__likes').textContent = photo.likes;

const container = document.querySelector('.picture');
container.appendChild(template);
/**
 * Отобразить фотографии других пользователей.

Заведите модуль, который будет отвечать за отрисовку миниатюр.

На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

Адрес изображения url подставьте как атрибут src изображения.
Описание изображения description подставьте в атрибут alt изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments.
Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

Подключите модуль в проект.
 */

/**
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
 */
