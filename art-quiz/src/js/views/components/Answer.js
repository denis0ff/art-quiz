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
    this.quizAnswers = answers.currentQuiz.quizAnswers;
    this.answer = answers.currentQuiz.rightAnswer;
    this.quizType = answers.currentQuiz.quizType;
    this.quizCategory = answers.currentQuiz.currentCategory;
    this.nextQuiz = answers.currentQuiz.currentQuestion === 9
      ? 'result'
      : answers.currentQuiz.currentQuestion + 2;
  }

  handleEvent(event) {
    const handleAnswer = event ? event.target.textContent : null;
    const isRight = handleAnswer === this.answer.author;
    const content = document.getElementById('main');
    content.innerHTML += this.generateRender(isRight);
  }

  generateRender(isRight) {
    let template = templateNextResult;
    const replacers = [];
    this.generateResult(replacers, isRight);
    replacers.push(
      this.answer.imageNum,
      this.answer.author,
      this.answer.name,
      this.answer.year,
      `${this.quizType}/${this.quizCategory}/${this.nextQuiz}`,
    );
    replacers.forEach((item, i) => {
      template = template.replace(new RegExp(`{{Result${i}}}`), item);
    });
    return template;
  }

  generateResult(replacers, isRight) {
    if (isRight) {
      replacers.push('right', '✔');
      this.quizAnswers.push(1);
    } else {
      replacers.push('negative', '✘');
      this.quizAnswers.push(0);
    }
  }
}

export default Answer;
