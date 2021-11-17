const templateNextResult = ` 
  <form class="answer-result">
    <div class="result-marker {{Result0}}">{{Result1}}</div>
    <div class="result-picture">
      <img src="./assets/images/quizes/img/{{Result2}}.jpg" class="result-image" />
    </div>
    <span class="result-text">{{Result3}}</span>
    <span class="result-text">{{Result4}}</span>
    <span class="result-text">{{Result5}}</span>
    <button type="submit" class="result-next"><a href="./#/{{Result6}}" class="result-link">Continue</a></button>
  </form>
`;

export class Answer {
  constructor(answers) {
    this.answer = answers.rightAnswer;
    this.quizType = answers.quizType;
    this.quizCategory = answers.currentCategory;
    this.nextQuiz = answers.currentQuestion === 9 ? -1 : answers.currentQuestion + 2;
  }

  handleEvent(event) {
    const handleAnswer = event.target.textContent;
    const isRight = handleAnswer === this.answer.author;
    const content = document.getElementById('main');
    content.innerHTML += this.generateRender(isRight);
  }

  generateRender(isRight) {
    let template = templateNextResult;
    const replacers = [];
    if (isRight) replacers.push('right', '✔');
    else replacers.push('negative', '✘');
    replacers.push(this.answer.imageNum, this.answer.author, this.answer.name, this.answer.year);
    if (this.nextQuiz === -1) replacers.push(`${this.quizType}`);
    else replacers.push(`${this.quizType}/${this.quizCategory}/${this.nextQuiz}`);
    replacers.forEach((item, i) => {
      template = template.replace(new RegExp(`{{Result${i}}}`), item);
    });
    return template;
  }
}

export default Answer;
