import { createSlice } from '@reduxjs/toolkit';
import { getOptionKeys } from '../utils/helpers';

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    timeStarted: null,
    timeEnded: null,
    totalTime: 0,
    score: 0,
    isQuizStarted: false,
    isQuizFinished: false,
    isLoading: false,
    error: null
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        loadQuestions: (state, action) => {
            // Shuffle questions
            const shuffledQuestions = [...action.payload].sort(() => Math.random() - 0.5);

            // Shuffle options for each question by shuffling the keys
            const questionsWithShuffledOptions = shuffledQuestions.map(question => {
                const optionKeys = getOptionKeys(question.options);
                const shuffledKeys = [...optionKeys].sort(() => Math.random() - 0.5);

                // Create a new options object with shuffled keys
                const shuffledOptions = {};
                shuffledKeys.forEach(key => {
                    shuffledOptions[key] = question.options[key];
                });

                return {
                    ...question,
                    shuffledOptionKeys: shuffledKeys, // Store shuffled keys for reference
                    originalOptions: question.options, // Keep original options
                    options: shuffledOptions // Use shuffled options
                };
            });

            state.questions = questionsWithShuffledOptions;
            state.userAnswers = Array(questionsWithShuffledOptions.length).fill(null);
            state.currentQuestionIndex = 0;
            state.score = 0;
            state.isQuizFinished = false;
        },
        startQuiz: (state) => {
            state.isQuizStarted = true;
            state.timeStarted = Date.now();
        },
        answerQuestion: (state, action) => {
            const { questionIndex, answerKey } = action.payload;
            state.userAnswers[questionIndex] = answerKey;
        },
        goToNextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
            }
        },
        goToPreviousQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;
            }
        },
        finishQuiz: (state) => {
            state.isQuizFinished = true;
            state.timeEnded = Date.now();
            state.totalTime = state.timeEnded - state.timeStarted;

            // Calculate score
            let correctAnswers = 0;
            state.questions.forEach((question, index) => {
                const userAnswer = state.userAnswers[index];
                if (userAnswer !== null && userAnswer === question.answer) {
                    correctAnswers++;
                }
            });

            state.score = correctAnswers;
        },
        resetQuiz: (state) => {
            return initialState;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const {
    loadQuestions,
    startQuiz,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    finishQuiz,
    resetQuiz,
    setError,
    setLoading
} = quizSlice.actions;

export default quizSlice.reducer;