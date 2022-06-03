const templateQuizResult = `
  <div class="result-container main-container">
    <div class="result-cup {{Score0}}"></div>
    <span class="result-congartulation">{{Score1}}</span>
    <span class="result-score">{{Score2}}/10</span>
    <div class="couple-buttons">
      <a href="./#/" class="result-link-home button">Home</a>
      <a href="./#/{{Score3}}" class="result-score-link-next button">Next Quiz</a>
    </div>
  </div>
`;

export const Result = {
  render: async (input) => {
    const answers = input.answers.currentQuiz.quizAnswers;
    const category = input.answers.currentQuiz.currentCategory;
    const { quizType } = input.answers.currentQuiz;
    const replacers = [];
    const saveTo = input.answers.quizesResult;
    const pointsAmount = answers.reduce((sum, item) => (item ? sum + item : sum), 0);

    if (pointsAmount < 5) {
      replacers.push('');
      replacers.push('You Lose');
    } else if (pointsAmount > 8) {
      replacers.push('win');
      replacers.push('Congratulations!');
    } else {
      replacers.push('half');
      replacers.push('You Great!');
    }

    let template = templateQuizResult;
    replacers.push(pointsAmount);
    replacers.push(quizType);
    replacers.forEach((item, i) => {
      template = template.replace(new RegExp(`{{Score${i}}}`), item);
    });
    saveTo[quizType][category] = [].concat(answers);
    answers.length = 0;
    return template;
  },

  afterRender: async (input) => {
    const { volume } = input.settings;
    if (volume) {
      const audio = new Audio();
      audio.src = './assets/sounds/result.mp3';
      audio.volume = volume / 100;
      audio.autoplay = true;
    }
  },
};

export default Result;
