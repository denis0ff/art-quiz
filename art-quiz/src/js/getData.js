import data from "./images";

export async function getData(result) {
  const allAuthors = [...new Set(data.map((chunk) => chunk.author))];
  const questionsByAuthor = [];
  const questionsByPicture = [];
  let chunkTenItems = [];
  for (let i = 0; i < data.length; i++) {
    if (chunkTenItems.length < 10) {
      chunkTenItems.push(data[i]);
      continue;
    } else {
      i <= Math.floor(data.length / 2)
        ? questionsByAuthor.push(chunkTenItems)
        : questionsByPicture.push(chunkTenItems);
      chunkTenItems = [data[i]];
    }
  }
  result.uniqAuthors = allAuthors;
  result.chunkAuthors = questionsByAuthor;
  result.chunkPictures = questionsByPicture;
}
