export const Utils = {
  parseRequestURL: () => {
    const url = window.location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request = {
      quiz: null,
      category: null,
      question: null,
    };
    request.quiz = null || r[1];
    request.category = null || r[2];
    request.question = null || r[3];
    return request;
  },

  getData: async (writoTo) => {
    const output = writoTo;
    const input = await fetch('./js/images.json').then((json) => json.json());
    const allAuthors = [...new Set(input.map((chunk) => chunk.author))];
    const allImageIndexes = input.map((item) => item.imageNum);
    const questionsByAuthor = [];
    const questionsByPicture = [];
    let chunkTenItems = [];
    for (let i = 0; i < input.length; i += 1) {
      if (chunkTenItems.length < 10) {
        chunkTenItems.push(input[i]);
      } else {
        if (i <= Math.floor(input.length / 2)) questionsByAuthor.push(chunkTenItems);
        else questionsByPicture.push(chunkTenItems);
        chunkTenItems = [input[i]];
      }
    }
    output.uniqAuthors = allAuthors;
    output.imageIndexes = allImageIndexes;
    output.authors = questionsByAuthor;
    output.pictures = questionsByPicture;
  },

  randomInteger: (min, max) => Math.floor(min + Math.random() * (max + 1 - min)),

  setStorage: (input) => {
    const { answers, settings } = input;
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('settings', JSON.stringify(settings));
  },

  getStorage: (input) => {
    const { answers, settings } = input;
    const storageAnswers = JSON.parse(localStorage.getItem('answers'));
    const storageSettings = JSON.parse(localStorage.getItem('settings'));
    if (storageAnswers) Object.assign(answers, storageAnswers);
    if (storageSettings) Object.assign(settings, storageSettings);
    Utils.selfCheck();
  },

  selfCheck: () => {
    console.log(`
    
    Score 224/240

    - Стартовая страница и навигация (20/20)
    - [x] На стартовой странице есть кнопка, при клике по которой открываются настройки викторины, и две кнопки, при кликах по которым можно выбрать тип вопроса: угадать художника по картине, угадать картину по имени её автора +10
    - [x] Реализована навигация по страницам приложения +10
  - Настройки (40/40)
    - [x] В настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация правильных и неправильных ответов, звуковое сопровождение окончания раунда +10
    - [x] В настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос +10
    - [x] В настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос +10
    - [x] При перезагрузке страницы приложения настройки сохраняются +10
  - Страница категорий (30/30)
    - [x]  На странице категорий размещаются карточки категорий +10
    - [x] Карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась +10
    - [x] На карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ +10
  - Страница с вопросами (50/50)
    - [x] Выполняются требования к вёрстке и оформлению приложения. Вопросы в викторине идут в том порядке, в каком информация про картины и их авторов размещается в коллекции исходных данных +10
    - [x] Варианты ответов на вопросы генерируются случайным образом. В вариантах ответов на вопросы викторины должен быть правильный ответ и только один. Правильный ответ в разных вопросах должен находиться на разных местах, а не, например, всегда быть только первым. Варианты ответов должны быть разными. В вариантах ответов не должны повторяться картины одного и того же художника +10
    - [x] Правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета +10
    - [x] После того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории +10
    - [x] После окончания раунда выводится уведомление об окончании раунда и отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов +10
  - Страница с результатами (50/50)
    - [x] Выполняются требования к вёрстке и оформлению приложения +10
    - [x] Страница с результатами содержит превью всех картин категории +10
    - [x] Картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые +10
    - [x] При клике по картине выводится информация о ней - название, автор, год создания +10
    - [x] Если раунд проигрывался повторно и результаты изменились, эти изменения отображаются на странице с результатами +10 
  - Одновременная загрузка и плавная смена изображений (10/10)
    - [x] Плавная смена изображений, картинки сначала загружаются, потом отображаются, нет ситуации, когда пользователь видит частично загрузившиеся изображения. +10
  - Анимация (20/20)
    - [x] переход между страницами +5
    - [x] форма правильного ответа +5
    - [x] форма счета сыгранной категории +5
    - [x] иконка-шестеренка настроек +5
  - Дополнительный функционал на выбор (4/20)
    - [x] возможность открыть приложение во весь экран +2
    - [x] разные уведомления по окончанию раунда в зависимости от результата +2
    `);
  },
};

export default Utils;
