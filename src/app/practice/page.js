'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { goToNextQuestion, goToPreviousQuestion, finishQuiz } from '../../redux/quizSlice';
import QuestionCard from '../../components/QuestionCard';
import Timer from '../../components/Timer';
import ProgressBar from '../../components/ProgressBar';

export default function PracticePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        questions,
        currentQuestionIndex,
        userAnswers,
        isQuizStarted,
        isQuizFinished
    } = useSelector((state) => state.quiz);

    useEffect(() => {
        // Redirect to home if quiz hasn't started
        if (!isQuizStarted) {
            router.push('/');
        }

        // Redirect to results if quiz is finished
        if (isQuizFinished) {
            router.push('/results');
        }
    }, [isQuizStarted, isQuizFinished, router]);

    const handleNext = () => {
        dispatch(goToNextQuestion());
    };

    const handlePrevious = () => {
        dispatch(goToPreviousQuestion());
    };

    const handleFinish = () => {
        dispatch(finishQuiz());
        router.push('/results');
    };

    const allQuestionsAnswered = userAnswers.every(answer => answer !== null);
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    if (!isQuizStarted || questions.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mb-4"></div>
                    <p>Loading quiz...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Timer />
                </div>

                <ProgressBar />

                <div className="mb-6">
                    <QuestionCard />
                </div>

                <div className="flex justify-between items-center max-w-2xl mx-auto">
                    <button
                        onClick={handlePrevious}
                        disabled={isFirstQuestion}
                        className={`px-4 py-2 rounded-lg font-medium ${isFirstQuestion
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
                            }`}
                    >
                        Previous
                    </button>

                    {isLastQuestion ? (
                        <button
                            onClick={handleFinish}
                            disabled={!allQuestionsAnswered}
                            className={`px-6 py-2 rounded-lg font-medium ${allQuestionsAnswered
                                ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {allQuestionsAnswered ? 'Submit' : 'Answer All Questions'}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-600"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}