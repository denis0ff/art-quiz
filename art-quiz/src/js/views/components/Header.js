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
      let template = '';
      if (time) {
        template = '<span id="questionTimer">00:{{Time}}</span>';
        template = template.replace(/{{Time}}/, time);
        Header.isTimer = true;
      }
      return template;
    }

    if (quiz === 'authors' || quiz === 'pictures') {
      return `
        <a href="./" class="link-back"></a>
        <a class="settings-link" href="/#/settings"></a>
      `;
    }

    if (quiz === 'settings') {
      return `
        <a href="./" class="link-back"></a>
        <h3 class="settings-header">Settings</h2>
      `;
    }

    return '<a class="settings-link" href="/#/settings"></a>';
  },
  after_render: async (input) => {
    const display = null || document.querySelector('#questionTimer');
    if (display) {
      const time = display.textContent.slice(3);
      Header.startTimer(time, display, input);
    }
  },
  startTimer: (duration, renderInto, answers) => {
    const answer = new Answer(answers);
    const display = renderInto;
    let timer = duration;
    let seconds;
    const timerTick = setInterval(() => {
      seconds = parseInt(timer % 60, 10);
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      display.textContent = `00:${seconds}`;
      timer -= 1;
      if (timer < 0) {
        answer.handleEvent(timerTick);
        clearInterval(timerTick);
      }
    }, 1000);
  },
};

export default Header;
