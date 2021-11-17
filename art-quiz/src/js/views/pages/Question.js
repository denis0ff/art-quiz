import { Quiz } from '../components/Quiz';
import { Answer } from '../components/Answer';

export const Question = {
  render: async (input) => {
    const quiz = new Quiz(input.inputData, input.request, input.answers);
    return quiz.getRender();
  },
  after_render: async (answers) => {
    const answerButtons = document.querySelectorAll('.artist-answer');
    const answer = new Answer(answers);
    answerButtons.forEach((button) => button.addEventListener('click', answer));
  },
};

export default Question;
