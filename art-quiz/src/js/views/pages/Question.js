class Quiz {
  constructor(data, locality) {
    this.chunkIndex = locality.category - 1;
    this.quizType = locality.quiz;
    this.chunk = this.quizType === 'artists' ? data.chunkAuthors[this.chunkIndex] : data.chunkPictures[this.chunkIndex];
    this.answers = data.uniqAuthors;
  }

  getDataQuestion() {
    if (this.quizType === 'artists') {
      getArtistsQuiz();
    } else {
      getPicturesQuiz();
    }
  }
  getArtistsQuiz() {}
  getPicturesQuiz() {}
}

export const Question = {
  render: async (input) => {
    const quiz = new Quiz(input.inputData, input.request);
    return /* html */ `
            <section class="section">
                <h1> Question </h1>
            </section>
        `;
  },
  after_render: async () => {},
};

export default Question;
