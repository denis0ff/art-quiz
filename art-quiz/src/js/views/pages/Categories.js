import { Score } from '../components/Score';

export const Categories = {
  render: async (input) => {
    const quizesResult = input.answers.quizesResult[input.request.quiz];
    const { quiz } = input.request;
    let categoriesCount = 0;
    if (quiz === 'authors') categoriesCount = input.inputData.authors.length;
    if (quiz === 'pictures') categoriesCount = input.inputData.pictures.length;
    let render = `
      <div class="main-container">
        <div class="categories-wrapper">
    `;
    let i = 1;
    while (i <= categoriesCount) {
      const score = quizesResult[i]
        ? quizesResult[i].reduce((sum, item) => (item ? sum + item : sum), 0)
        : 0;
      const status = quizesResult[i] ? 'done' : '';
      render += `
      <div class="category-wrapper ${status}">
        <a href="./#/${input.request.quiz}/${i}/1" class="category-link">Category ${i}</a>
        <button class="category-score-link ${status}" value="${quiz}-${i}">${score}/10</button>
      </div>
      `;
      i += 1;
    }
    render += `
        </div>
      </div>
    `;
    return render;
  },
  afterRender: async (input) => {
    const doneLinks = document.querySelectorAll('.category-score-link.done');
    const score = new Score(input.inputData, input.answers);
    doneLinks.forEach((link) => link.addEventListener('click', score));
  },
};

export default Categories;
