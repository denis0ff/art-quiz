const templateForArtists = `
    <div class="artist-quiz">
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
    <div class="picture-quiz">
      <p class="picture-question">Какую картину написал {{Artist}}?</p>
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

class Quiz {
  constructor(data, locality) {
    console.log(locality);
    this.chunkIndex = locality.category - 1;
    this.quizType = locality.quiz;
    this.chunk = this.quizType === 'artists' ? data.chunkAuthors[this.chunkIndex] : data.chunkPictures[this.chunkIndex];
    this.variants = this.quizType === 'artists' ? data.uniqAuthors : data.imageIndexes;
    this.questionIndex = locality.question;
  }

  getQuestion() {
    const rightAnswer = this.chunk[this.questionIndex];
    const htmlInner = this.getArtistsQuiz(rightAnswer);
    return htmlInner;
  }

  getArtistsQuiz(rightAnswer) {
    const generationType = this.quizType === 'artists' ? rightAnswer.author : rightAnswer.imageNum;
    let htlmInner = this.quizType === 'artists' ? templateForArtists : templateForPictures;
    const questionVariants = this.generateVariants(generationType);
    questionVariants.forEach((item, i) => {
      htlmInner = htlmInner.replace(new RegExp(`{{Answer${i}}}`), item);
    });
    htlmInner = this.quizType === 'artists'
      ? htlmInner.replace(/{{Source}}/, rightAnswer.imageNum)
      : (htlmInner = htlmInner.replace(/{{Artist}}/, rightAnswer.author));
    return htlmInner;
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

export const Question = {
  render: async (input) => {
    const quiz = new Quiz(input.inputData, input.request);
    return quiz.getQuestion();
  },
  after_render: async () => {},
};

export default Question;
