import { Quiz } from '../components/Quiz';
import { Answer } from '../components/Answer';

export const Question = {
  render: async (input) => {
    const quiz = new Quiz(input.inputData, input.request, input.answers);
    return quiz.getRender();
  },
  after_render: async (input) => {
    const answerButtons = document.querySelectorAll('.answer-variant');
    const answer = new Answer(input.answers);
    answerButtons.forEach((button) => button.addEventListener('click', answer));
  },
};

export default Question;
