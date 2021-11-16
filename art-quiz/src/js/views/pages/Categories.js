export const Categories = {
  render: async (input) => {
    let categoriesCount = 0;
    if (input.request.quiz === 'artists') categoriesCount = input.inputData.chunkAuthors.length;
    if (input.request.quiz === 'pictures') categoriesCount = input.inputData.chunkPictures.length;
    let outputHtml = '<div class="category__wr">';
    let i = 1;
    while (i <= categoriesCount) {
      outputHtml += `
        <a href="./#/${input.request.quiz}/${i}/1" class="category-link">Category ${i}</a>
      `;
      i += 1;
    }
    outputHtml += '</div>';
    return outputHtml;
  },
  after_render: async () => {},
};

export default Categories;
