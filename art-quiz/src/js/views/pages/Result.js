const templateQuizResult = `
  <div class="result-container main-container">
    <div class="result-cup"></div>
    <span class="result-congartulation">Congratulations!</span>
    <span class="result-score">{{Score0}}/10</span>
    <div class="couple-buttons">
      <a href="./#/" class="result-link-home button">Home</a>
      <a href="./#/{{Score1}}" class="result-score-link-next button">Next Quiz</a>
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
