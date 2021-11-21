const templateForAuthors = `
    <div class="artist-quiz quiz-container">
      <span class="quiz-question">Кто написал эту картину?</span>
      <img src="./assets/images/quizes/img/{{Source}}.jpg" class="artist-question" />
      <div class="artist-variants quiz-variants">
        <div class="artist-answer answer-variant button">{{Answer0}}</div>
        <div class="artist-answer answer-variant button">{{Answer1}}</div>
        <div class="artist-answer answer-variant button">{{Answer2}}</div>
        <div class="artist-answer answer-variant button">{{Answer3}}</div>
      </div>
    </div>
`;
const templateForPictures = `
    <div class="picture-quiz quiz-container">
      <span class="quiz-question">Какую картину написал {{Artist}}?</span>
      <div class="picture-variants quiz-variants">
          <img src="./assets/images/quizes/img/{{Answer0}}.jpg" class="image-answer answer-variant" />
          <img src="./assets/images/quizes/img/{{Answer1}}.jpg" class="image-answer answer-variant" />
          <img src="./assets/images/quizes/img/{{Answer2}}.jpg" class="image-answer answer-variant" />
          <img src="./assets/images/quizes/img/{{Answer3}}.jpg" class="image-answer answer-variant" />
      </div>
    </div>
`;

export class Quiz {
  constructor(data, request, answers) {
    this.answers = answers.currentQuiz;
    this.chunkIndex = request.category - 1;
    this.quizType = request.quiz;
    this.chunk = this.quizType === 'authors' ? data.authors[this.chunkIndex] : data.pictures[this.chunkIndex];
    this.variants = this.quizType === 'authors' ? data.uniqAuthors : data.imageIndexes;
    this.questionIndex = request.question - 1;
  }

  getRender() {
    if (!this.questionIndex) this.answers.quizAnswers = [];
    const rightAnswer = this.chunk[this.questionIndex];
    this.answers.rightAnswer = rightAnswer;
    this.answers.currentQuestion = this.questionIndex;
    this.answers.quizType = this.quizType;
    this.answers.currentCategory = this.chunkIndex + 1;
    const render = this.generateQuiz(rightAnswer);
    return render;
  }

  generateQuiz(rightAnswer) {
    const generationType = this.quizType === 'authors' ? rightAnswer.author : rightAnswer.imageNum;
    let template = this.quizType === 'authors' ? templateForAuthors : templateForPictures;
    const replacers = this.generateVariants(generationType);
    replacers.forEach((item, i) => {
      template = template.replace(new RegExp(`{{Answer${i}}}`), item);
    });
    template = this.quizType === 'authors'
      ? template.replace(/{{Source}}/, rightAnswer.imageNum)
      : (template = template.replace(/{{Artist}}/, rightAnswer.author));
    return template;
  }

  generateVariants(rightAnswer) {
    const variantsSet = new Set();
    variantsSet.add(rightAnswer);
    while (variantsSet.size < 4) {
      const randomAuthor = this.variants[Quiz.randomInteger(0, this.variants.length - 1)];
      variantsSet.add(randomAuthor);
    }
    return Quiz.mixArray(Array.from(variantsSet));
  }

  static mixArray(array) {
    return array
      .map((i) => [Math.random(), i])
      .sort()
      .map((i) => i[1]);
  }

  static randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}

export default Quiz;
