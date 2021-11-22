import { Answer } from './Answer';

export const Header = {
  isTimer: false,
  render: async (input) => {
    const { quiz, question } = input.request;
    const { time } = input.settings;

    if (question === 'result') {
      return '';
    }

    if (quiz && question) {
      let template = '<a href="./#/" class="link-back">✖</a>';
      if (+time) {
        template += '<span id="questionTimer">00:{{Time}}</span>';
        template = template.replace(/{{Time}}/, time);
        Header.isTimer = true;
      }
      return template;
    }

    if (quiz === 'authors' || quiz === 'pictures') {
      return `
        <a href="./#/" class="link-back">❮</a>
        <h3 class="page-header">${quiz[0].toUpperCase() + quiz.slice(1)}</h2>
        <a class="settings-link" href="/#/settings"></a>
      `;
    }

    if (quiz === 'settings') {
      return '<h3 class="page-header">Settings</h2>';
    }

    return '<a class="settings-link" href="/#/settings"></a>';
  },
  afterRender: async (input) => {
    const display = null || document.querySelector('#questionTimer');
    if (display) {
      const time = display.textContent.slice(3);
      Header.startTimer(time, display, input);
    }
  },
  startTimer: (duration, renderInto, input) => {
    const display = renderInto;
    const { hash } = window.location;
    let timer = duration;
    let seconds;
    const timerTick = setInterval(() => {
      const currenthash = window.location.hash;
      seconds = parseInt(timer % 60, 10);
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      display.textContent = `00:${seconds}`;
      timer -= 1;
      if (currenthash !== hash) clearInterval(timerTick);
      if (timer < 0) {
        const answer = new Answer(input.answers, input.settings);
        answer.handleEvent();
        clearInterval(timerTick);
      }
    }, 1000);
    const answerButtons = document.querySelectorAll('.answer-variant');
    answerButtons.forEach((button) => button.addEventListener('click', () => clearInterval(timerTick)));
  },
};

export default Header;
