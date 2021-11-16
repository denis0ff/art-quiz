export const Home = {
  render: async () => /* html */ `
      <div class="main-home">
        <h1 class="main-header">Art Quiz</h1>
        <div class="categories__wr">
            <a href="./#/artists" class="quiz-artists">Artist Quiz</a>
            <a href="./#/pictures" class="quiz-pictures">Pictures Quiz</a>
        </div>
      </div>
    `,
  after_render: async () => {},
};

export default Home;
