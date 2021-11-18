import { Score } from '../components/Score';

export const Categories = {
  render: async (input) => {
    const quizesResult = input.answers.quizesResult[input.request.quiz];
    const { quiz } = input.request;
    let categoriesCount = 0;
    if (quiz === 'authors') categoriesCount = input.inputData.authors.length;
    if (quiz === 'pictures') categoriesCount = input.inputData.pictures.length;
    let render = '<div class="category__wr">';
    let i = 1;
    while (i <= categoriesCount) {
      const score = quizesResult[i]
        ? quizesResult[i].reduce((sum, item) => (item ? sum + item : sum), 0)
        : 0;
      const status = quizesResult[i] ? 'done' : '';
      render += `
      <div class="category__wr ${status}">
        <a href="./#/${input.request.quiz}/${i}/1" class="category-link">Category ${i}</a>
        <button class="category-score-link" value="${quiz}-${i}">${score}/10</button>
      </div>
      `;
      i += 1;
    }
    render += '</div>';
    return render;
  },
  after_render: async (input) => {
    const scoreButtons = document.querySelectorAll('.category-score-link');
    const score = new Score(input.inputData, input.answers);
    scoreButtons.forEach((button) => button.addEventListener('click', score));
  },
};

export default Categories;
