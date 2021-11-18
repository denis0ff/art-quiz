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

const router = async () => {
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('main');
  const footer = null || document.getElementById('footer');

  header.innerHTML = await Header.render();
  await Header.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  const request = Utils.parseRequestURL();

  const parsedURL = (request.quiz ? `/${request.quiz}` : '/')
    + (request.category ? `/${request.category}` : '')
    + (request.question ? `/${request.question}` : '');

  let page;
  if (request.question === 'result') page = Result;
  else if (request.question) page = Question;
  else page = routes[parsedURL] ? routes[parsedURL] : Error404;

  content.innerHTML = await page.render({ inputData, request, answers });
  await page.after_render({ inputData, answers });
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.onload = async () => router().then(Utils.getData(inputData));
