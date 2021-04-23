export const questionsFromAPI = async (

    amount = 20,
    category = 21,
    type = 'multiple'

) => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`;

    try {
        const response = await fetch(url);

        const { results } =  await response.json();
    } catch (err) {
        console.log(err);
    }
};

const convertQuestions = (questionsAPI) => {
    return questionsAPI.map((questionAPI) => {
        const formatQuestion = {
            question: questionAPI.question,
            answerChoices: [...questionAPI.incorrect_answers]
        };
        formatQuestion.answer = Math.floor(Math.random()*4);

        formatQuestion.answerChoices.splice(
            formatQuestion.answer, 0, questionAPI.correct_answer
        );

        return formatQuestion;
    });
};