import data from "../../images.js";

export const Home = {
  render: async () => {
    return /*html*/ `
      <h1 class="main-header">Art Quiz</h1>
      <div class="categories__wr">
          <a href="./#/categories" class="quiz-artists">Artist Quiz</a>
          <a href="./#/categories" class="quiz-pictures">Pictures Quiz</a>
      </div>
    `;
  },
  after_render: async () => {},
};
