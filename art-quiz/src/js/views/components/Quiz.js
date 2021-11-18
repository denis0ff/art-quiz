const templateForArtists = `
    <div class="artist-quiz quiz-container">
      <img src="./assets/images/quizes/img/{{Source}}.jpg" class="artist-question" />
      <div class="artist-variants">
        <button class="artist-answer">{{Answer0}}</button>
        <button class="artist-answer">{{Answer1}}</button>
        <button class="artist-answer">{{Answer2}}</button>
        <button class="artist-answer">{{Answer3}}</button>
      </div>
    </div>
`;
const templateForPictures = `
    <div class="picture-quiz quiz-container">
      <span class="picture-question">Какую картину написал {{Artist}}?</span>
      <div class="picture-variants">
        <div class="picture-answer">
          <img src="./assets/images/quizes/img/{{Answer0}}.jpg" class="image-answer" />
        </div>
        <div class="picture-answer">
          <img src="./assets/images/quizes/img/{{Answer1}}.jpg" class="image-answer" />
        </div>
        <div class="picture-answer">
          <img src="./assets/images/quizes/img/{{Answer2}}.jpg" class="image-answer" />
        </div>
        <div class="picture-answer">
          <img src="./assets/images/quizes/img/{{Answer3}}.jpg" class="image-answer" />
        </div>
      </div>
    </div>
`;

export class Quiz {
  constructor(data, request, answers) {
    this.answers = answers.currentQuiz;
    this.chunkIndex = request.category - 1;
    this.quizType = request.quiz;
    this.chunk = this.quizType === 'artists' ? data.chunkAuthors[this.chunkIndex] : data.chunkPictures[this.chunkIndex];
    this.variants = this.quizType === 'artists' ? data.uniqAuthors : data.imageIndexes;
    this.questionIndex = request.question - 1;
  }

  getRender() {
    const rightAnswer = this.chunk[this.questionIndex];
    this.answers.rightAnswer = rightAnswer;
    this.answers.currentQuestion = this.questionIndex;
    this.answers.quizType = this.quizType;
    this.answers.currentCategory = this.chunkIndex + 1;
    const htmlInner = this.generateQuiz(rightAnswer);
    return htmlInner;
  }

  generateQuiz(rightAnswer) {
    const generationType = this.quizType === 'artists' ? rightAnswer.author : rightAnswer.imageNum;
    let template = this.quizType === 'artists' ? templateForArtists : templateForPictures;
    const replacers = this.generateVariants(generationType);
    replacers.forEach((item, i) => {
      template = template.replace(new RegExp(`{{Answer${i}}}`), item);
    });
    template = this.quizType === 'artists'
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
