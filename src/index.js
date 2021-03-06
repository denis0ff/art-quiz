import { Home } from './js/views/pages/Home';
import { Settings } from './js/views/pages/Settings';
import { Error404 } from './js/views/pages/Error404';
import { Categories } from './js/views/pages/Categories';
import { Question } from './js/views/pages/Question';
import { Result } from './js/views/pages/Result';

import { Header } from './js/views/components/Header';
import { Footer } from './js/views/components/Footer';

import { Utils } from './js/services/Utils';

const routes = {
  '/': Home,
  '/settings': Settings,
  '/authors': Categories,
  '/pictures': Categories,
};

const inputData = {
  uniqAuthors: null,
  imageIndexes: null,
  authors: null,
  pictures: null,
};

const answers = {
  currentQuiz: {
    rightAnswer: null,
    currentQuestion: null,
    quizType: null,
    currentCategory: null,
    quizAnswers: [],
  },
  quizesResult: {
    authors: {},
    pictures: {},
  },
};

const settings = {
  time: 0,
  volume: 0,
};

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(), ms);
});

const router = async () => {
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('main');
  const footer = null || document.getElementById('footer');

  const request = Utils.parseRequestURL();

  const hider = document.getElementById('hider');
  hider.classList.toggle('show');
  await sleep(500);

  header.innerHTML = await Header.render({ request, settings });

  footer.innerHTML = await Footer.render();
  await Footer.afterRender();

  const parsedURL = (request.quiz ? `/${request.quiz}` : '/')
    + (request.category ? `/${request.category}` : '')
    + (request.question ? `/${request.question}` : '');

  let page;
  if (request.question === 'result') page = Result;
  else if (request.question) page = Question;
  else page = routes[parsedURL] ? routes[parsedURL] : Error404;

  content.innerHTML = await page.render({
    inputData, request, answers, settings,
  });

  await sleep(500);
  hider.classList.toggle('show');

  await Header.afterRender({ request, answers, settings });
  await page.afterRender({ inputData, answers, settings });
};

window.onhashchange = router;

window.onload = router()
  .then(Utils.getData(inputData)
    .then(Utils.getStorage({ answers, settings })));

window.onbeforeunload = () => Utils.setStorage({ answers, settings });
