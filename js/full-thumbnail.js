
/**
 * <section class="big-picture  overlay  hidden">
      <h2 class="big-picture__title  visually-hidden">Просмотр фотографии</h2>
      <div class="big-picture__preview">

        <!-- Просмотр изображения -->
        <div class="big-picture__img">
          <img src="img/logo-background-3.jpg" alt="Девушка в купальнике" width="600" height="600">
        </div>

        <!-- Информация об изображении. Подпись, комментарии, количество лайков -->
        <div class="big-picture__social  social">
          <div class="social__header">
            <img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35" height="35">
            <p class="social__caption">Тестим новую камеру! =)</p>
            <p class="social__likes">Нравится <span class="likes-count">356</span></p>
          </div>

          <!-- Комментарии к изображению -->
          <div class="social__comment-count"><span class="social__comment-shown-count">5</span> из <span class="social__comment-total-count">125</span> комментариев</div>
          <ul class="social__comments">
            <li class="social__comment">
              <img class="social__picture" src="img/avatar-4.svg" alt="Аватар комментатора фотографии" width="35" height="35">
              <p class="social__text">Мега фото! Просто обалдеть. Как вам так удалось?</p>
            </li>
            <li class="social__comment">
              <img class="social__picture" src="img/avatar-3.svg" alt="Аватар комментатора фотографии" width="35" height="35">
              <p class="social__text">Да это фоташоп!!!!!!!!</p>
            </li>
          </ul>

          <!-- Кнопка для загрузки новой порции комментариев -->
          <button type="button" class="social__comments-loader  comments-loader">Загрузить еще</button>

          <!-- Форма для отправки комментария -->
          <div class="social__footer">
            <img class="social__picture" src="img/avatar-6.svg" alt="Аватар комментатора фотографии" width="35" height="35">
            <input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
            <button type="button" class="social__footer-btn" name="button">Отправить</button>
          </div>
        </div>

        <!-- Кнопка для выхода из полноэкранного просмотра изображения -->
        <button type="reset" class="big-picture__cancel  cancel" id="picture-cancel">Закрыть</button>
      </div>
    </section>
 */

/**
     * Задача
Реализовать сценарий просмотра фотографий в полноразмерном режиме. В таком режиме пользователь получает несколько дополнительных возможностей: детально рассмотреть изображение, поставить «лайк», почитать комментарии, оставленные другими пользователями.

Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.

Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.

Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.

Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.

Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
  <img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li>

Описание фотографии description вставьте строкой в блок .social__caption.

После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

Подключите модуль в проект.
     */
