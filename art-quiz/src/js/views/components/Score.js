const templateScore = ` 
  <div class="score-item {{Score0}}">
    <img src="./assets/images/quizes/img/{{Score1}}.jpg" class="score-image">
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
    content.innerHTML += Score.generateRender(categoryData, categoryAnswers);
  }

  static generateRender(data, answers) {
    const checkedAnswers = answers || [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let render = '<form class="score-container">';
    data.forEach((item, i) => {
      let template = templateScore;
      const status = checkedAnswers[i] ? 'done' : '';
      const replacers = [status, item.imageNum, item.name, item.author, item.year];
      replacers.forEach((replacer, index) => {
        template = template.replace(new RegExp(`{{Score${index}}}`), replacer);
      });
      render += template;
    });
    render += `
    <button type="submit" class="close">Close</button>
    </form>
    `;
    return render;
  }
}

export default Score;
