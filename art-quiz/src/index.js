/* eslint-disable no-console */
import { Home } from './js/views/pages/Home';
import { Settings } from './js/views/pages/Settings';
import { Error404 } from './js/views/pages/Error404';
import { Categories } from './js/views/pages/Categories';
import { Question } from './js/views/pages/Question';

import { Header } from './js/views/components/Header';
import { Footer } from './js/views/components/Footer';

import { Utils } from './js/services/Utils';

const routes = {
  '/': Home,
  '/settings': Settings,
  '/artists': Categories,
  '/pictures': Categories,
};

export const inputData = {
  uniqAuthors: null,
  chunkAuthors: null,
  chunkPictures: null,
};

export default inputData;

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
  if (request.question) {
    page = Question;
  } else {
    page = routes[parsedURL] ? routes[parsedURL] : Error404;
  }
  content.innerHTML = await page.render({ inputData, request });
  await page.after_render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.onload = async () => router().then(Utils.getData(inputData));
