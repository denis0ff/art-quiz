const templateScore = ` 
  <div class="score-item {{Score0}}">
    <img class="score-image {{Score0}}" src="./assets/images/quizes/img/{{Score1}}.jpg">
    <div class="score-item-info">
      <span class="score-picture">{{Score2}}</span>
      <span class="score-author">{{Score3}}</span>
      <span class="score-year">{{Score4}}</span>
    </div>
  </div>
`;

export class Score {
  constructor(data, answers) {
    this.data = data;
    this.answers = answers.quizesResult;
  }

  handleEvent(event) {
    const handleValue = event.target.value.split('-');
    const categoryAnswers = this.answers[handleValue[0]][handleValue[1]];
    const categoryData = this.data[handleValue[0]][handleValue[1] - 1];
    const content = document.getElementById('main');
    const divContainer = document.createElement('div');

    divContainer.className = 'score-container hide';
    divContainer.innerHTML = Score.generateRender(categoryData, categoryAnswers);
    content.append(divContainer);

    setTimeout(() => divContainer.classList.remove('hide'), 500);
    Score.closeListen();
  }

  static generateRender(data, answers) {
    const checkedAnswers = answers || [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let render = '';
    data.forEach((item, i) => {
      let template = templateScore;
      const status = checkedAnswers[i] ? 'done' : '';
      const replacers = [status, item.imageNum, item.name, item.author, item.year];
      replacers.forEach((replacer, index) => {
        template = template.replace(new RegExp(`{{Score${index}}}`, 'gm'), replacer);
      });
      render += template;
    });
    render += '<button type="button" class="score-close button">Close</button>';
    return render;
  }

  static closeListen() {
    const closeButton = document.querySelector('.score-close');
    const scoreContainer = document.querySelector('.score-container');
    const scoreItems = document.querySelectorAll('.score-item');
    const scoreItemsInfo = document.querySelectorAll('.score-item-info');

    scoreItems.forEach((item, index) => item.addEventListener('click', () => scoreItemsInfo[index].classList.toggle('hide')));

    closeButton.onclick = () => {
      scoreContainer.classList.add('hide');
      setTimeout(() => {
        scoreContainer.parentNode.removeChild(scoreContainer);
      }, 1000);
    };
  }
}

export default Score;
