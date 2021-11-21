export const Home = {
  render: async () => /* html */ `
      <div class="main-home">
        <h1 class="main-header">Art Quiz</h1>
        <div class="categories__wr">
            <a href="./#/authors" class="quiz-authors button">Artist Quiz</a>
            <a href="./#/pictures" class="quiz-pictures button">Pictures Quiz</a>
        </div>
      </div>
    `,
  afterRender: async () => {},
};

export default Home;
