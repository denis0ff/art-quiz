const templateQuizResult = `
  <div class="result-score__wr">
    <div class="result-cup"></div>
    <span class="result-congartulation">Congratulations!</span>
    <span class="result-score">{{Score0}}/10</span>
    <button class="result-score-home">
      <a href="./#/" class="result-link-home">Home</a>
    </button>
    <button class="result-score-next">
      <a href="./#/{{Score1}}" class="result-score-link-next">Next Quiz</a>
    </button>
  </div>
`;

export const Result = {
  render: async (input) => {
    const answers = input.answers.currentQuiz.quizAnswers;
    const category = input.answers.currentQuiz.currentCategory;
    const { quizType } = input.answers.currentQuiz;
    const replacers = [];
    const saveTo = input.answers.quizesResult;

    let template = templateQuizResult;
    replacers.push(answers.reduce((sum, item) => (item ? sum + item : sum), 0));
    replacers.push(quizType);
    replacers.forEach((item, i) => {
      template = template.replace(new RegExp(`{{Score${i}}}`), item);
    });
    saveTo[quizType][category] = [].concat(answers);
    answers.length = 0;
    return template;
  },
  afterRender: async () => {},
};

export default Result;
