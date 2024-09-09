import {v4 as uuid} from 'uuid';

export default class getQuizData {


    async getQuizzes(props) {

        try {
            const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=y2KzUn53eVEY14dM4HCnm0bXErKUc6ukta08k10v&difficulty=${props.difficulty}&limit=${props.limit}&tags=${props.tags}`)
            return response.ok ? await response.json()
                    .then(response => response.map(this.getFormatQuiz))
                : false
        } catch (e) {
            console.log(e);
        }

    }


    getFormatQuiz(array) {
        const current = Object.values(array.answers);
        const correct = Object.values(array.correct_answers);
        const letters = Object.keys(array.answers);
        const answers = [];
        for (let i = 0; i < current.length; i++) {
            const word = current[i];
            const letter = letters[i].slice(-1).toUpperCase();
            const isCorrect = correct[i];
            if (word !== null) {
                answers.push({
                    id: uuid(),
                    word: word,
                    letter: letter,
                    isCorrect: isCorrect === "true",
                    isSelected: false
                })
            }
        }
        return {id: uuid(), answers: answers, question: array.question};
    }

}