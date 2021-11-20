import data from '../images';

export const Utils = {
  parseRequestURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request = {
      quiz: null,
      category: null,
      question: null,
    };
    request.quiz = null || r[1];
    request.category = null || r[2];
    request.question = null || r[3];

    return request;
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  // sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  getData: async (writoTo) => {
    const output = writoTo;
    const allAuthors = [...new Set(data.map((chunk) => chunk.author))];
    const allImageIndexes = data.map((item) => item.imageNum);
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
    output.imageIndexes = allImageIndexes;
    output.authors = questionsByAuthor;
    output.pictures = questionsByPicture;
  },

  randomInteger: (min, max) => Math.floor(min + Math.random() * (max + 1 - min)),

  setStorage: (input) => {
    const { answers, settings } = input;
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('settings', JSON.stringify(settings));
  },

  getStorage: (input) => {
    const { answers, settings } = input;
    const storageAnswers = JSON.parse(localStorage.getItem('answers'));
    const storageSettings = JSON.parse(localStorage.getItem('settings'));
    if (storageAnswers) Object.assign(answers, storageAnswers);
    if (storageSettings) Object.assign(settings, storageSettings);
  },
};

export default Utils;
