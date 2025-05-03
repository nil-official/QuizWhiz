'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../../redux/quizSlice';
import { formatTime } from '../../utils/helpers';
import { commonStyles } from '@/utils/styles';
import { useInjectStyles } from '@/hooks/useInjectStyles';

export default function ResultsPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        questions,
        userAnswers,
        score,
        totalTime,
        isQuizFinished
    } = useSelector((state) => state.quiz);

    useInjectStyles(commonStyles.questionContent, 'question-card-styles');

    useEffect(() => {
        // Redirect to home if quiz hasn't finished
        if (!isQuizFinished) {
            router.push('/');
        }
    }, [isQuizFinished, router]);

    const handleRetakeQuiz = () => {
        dispatch(resetQuiz());
        router.push('/');
    };

    if (!isQuizFinished) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mb-4"></div>
                    <p>Loading results...</p>
                </div>
            </div>
        );
    }

    const scorePercentage = (score / questions.length) * 100;

    const renderHTML = (htmlContent) => {
        return { __html: htmlContent };
    };

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-gray-800 text-3xl font-bold mb-2">Quiz Results</h1>
                    <p className="text-gray-600">Here&apos;s how you performed</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Score</p>
                            <p className="text-3xl font-bold text-blue-600">
                                {score}/{questions.length}
                            </p>
                            <p className="text-gray-500 text-lg font-medium">
                                {scorePercentage.toFixed(0)}%
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Time Taken</p>
                            <p className="text-3xl font-bold text-green-600">
                                {formatTime(totalTime)}
                            </p>
                            <p className="text-gray-500 text-lg font-medium">
                                {(totalTime / 1000 / questions.length).toFixed(1)}s per question
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Questions</p>
                            <p className="text-3xl font-bold text-purple-600">
                                {questions.length}
                            </p>
                            <p className="text-gray-500 text-lg font-medium">
                                {userAnswers.filter(a => a !== null).length} answered
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-gray-600 text-xl font-semibold mb-4">Detailed Review</h2>

                    <div className="space-y-6">
                        {questions.map((question, questionIndex) => {
                            const userAnswerKey = userAnswers[questionIndex];
                            const isCorrect = userAnswerKey === question.answer;
                            const optionKeys = Object.keys(question.options);

                            return (
                                <div
                                    key={questionIndex}
                                    className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                                        }`}
                                >
                                    <div className="flex items-start">
                                        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full mr-3 mt-0.5 text-white font-medium text-sm bg-gray-700">
                                            {questionIndex + 1}
                                        </span>
                                        <div className="flex-1">
                                            <div
                                                className="font-medium mb-2 text-gray-600 question-content"
                                                dangerouslySetInnerHTML={renderHTML(question.question)}
                                            />

                                            {question.link && (
                                                <div className="mb-4">
                                                    <div className="mt-1 text-sm text-gray-500">
                                                        <a
                                                            href={question.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            View resource
                                                        </a>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-1 mb-3">
                                                {optionKeys.map((key) => {
                                                    let optionClass = "text-gray-700";

                                                    if (key === question.answer) {
                                                        optionClass = "text-green-600 font-medium";
                                                    } else if (userAnswerKey === key) {
                                                        optionClass = "text-red-600";
                                                    }

                                                    return (
                                                        <div key={key} className={optionClass}>
                                                            <span>{key.toUpperCase()}. </span>

                                                            {typeof question.options[key] === 'string' && question.options[key].includes('<')
                                                                ? <span className='question-content' dangerouslySetInnerHTML={renderHTML(question.options[key])} />
                                                                : question.options[key]
                                                            }

                                                            {key === question.answer &&
                                                                <span className="ml-2 text-xs bg-green-100 text-green-800 rounded px-1 py-0.5">Correct</span>
                                                            }
                                                            {userAnswerKey === key && key !== question.answer &&
                                                                <span className="ml-2 text-xs bg-red-100 text-red-800 rounded px-1 py-0.5">Your Answer</span>
                                                            }
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {!isCorrect && (
                                                <p className="text-sm text-gray-500">
                                                    The correct answer is: <span className="font-medium">
                                                        {question.answer.toUpperCase()}. {typeof question.options[question.answer] === 'string' && question.options[question.answer].includes('<')
                                                            ? <span className='question-content' dangerouslySetInnerHTML={renderHTML(question.options[question.answer])} />
                                                            : question.options[question.answer]
                                                        }
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={handleRetakeQuiz}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Take Another Quiz
                    </button>
                </div>
            </div>
        </main>
    );
}