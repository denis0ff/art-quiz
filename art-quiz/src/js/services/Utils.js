export const Utils = {
  parseRequestURL: () => {
    const url = window.location.hash.slice(1).toLowerCase() || '/';
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

  // eslint-disable-next-line no-promise-executor-return
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  getData: async (writoTo) => {
    const output = writoTo;
    const input = await fetch('./js/images.json').then((json) => json.json());
    const allAuthors = [...new Set(input.map((chunk) => chunk.author))];
    const allImageIndexes = input.map((item) => item.imageNum);
    const questionsByAuthor = [];
    const questionsByPicture = [];
    let chunkTenItems = [];
    for (let i = 0; i < input.length; i += 1) {
      if (chunkTenItems.length < 10) {
        chunkTenItems.push(input[i]);
      } else {
        if (i <= Math.floor(input.length / 2)) questionsByAuthor.push(chunkTenItems);
        else questionsByPicture.push(chunkTenItems);
        chunkTenItems = [input[i]];
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
    Utils.selfCheck();
  },

  selfCheck: () => {
    console.log(`

    `);
  },
};

export default Utils;
