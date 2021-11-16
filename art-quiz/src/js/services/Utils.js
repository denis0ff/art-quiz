import data from '../images';

export const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request = {
      quiz: null,
      category: null,
      question: null,
    };
    request.quiz = r[1];
    request.category = r[2];
    request.question = r[3];

    return request;
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  getData: (writoTo) => {
    const output = writoTo;
    const allAuthors = [...new Set(data.map((chunk) => chunk.author))];
    const questionsByAuthor = [];
    const questionsByPicture = [];
    let chunkTenItems = [];
    for (let i = 0; i < data.length; i += 1) {
      if (chunkTenItems.length < 10) {
        chunkTenItems.push(data[i]);
      } else {
        if (i <= Math.floor(data.length / 2)) questionsByAuthor.push(chunkTenItems);
        else questionsByPicture.push(chunkTenItems);
        chunkTenItems = [data[i]];
      }
    }
    output.uniqAuthors = allAuthors;
    output.chunkAuthors = questionsByAuthor;
    output.chunkPictures = questionsByPicture;
  },

  randomInteger: (min, max) => Math.floor(min + Math.random() * (max + 1 - min)),
};

export default Utils;
