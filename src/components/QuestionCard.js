'use client';

import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion } from '../redux/quizSlice';
import { commonStyles } from '@/utils/styles';
import { useInjectStyles } from '@/hooks/useInjectStyles';

export default function QuestionCard() {
    const dispatch = useDispatch();
    const { questions, currentQuestionIndex, userAnswers } = useSelector((state) => state.quiz);

    useInjectStyles(commonStyles.questionContent, 'question-card-styles');

    if (!questions || questions.length === 0) {
        return <div className="text-center p-4">No questions loaded</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestionIndex];
    const optionKeys = Object.keys(currentQuestion.options);

    const handleOptionSelect = (optionKey) => {
        dispatch(answerQuestion({ questionIndex: currentQuestionIndex, answerKey: optionKey }));
    };

    const renderHTML = (htmlContent) => {
        return { __html: htmlContent };
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <div className="mb-2 text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <div
                className="text-lg font-semibold mb-4 text-gray-800 question-content"
                dangerouslySetInnerHTML={renderHTML(currentQuestion.question)}
            />

            {currentQuestion.link && (
                <div className="mb-4">
                    <div className="mt-1 text-sm text-gray-500">
                        <a
                            href={currentQuestion.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View resource
                        </a>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {optionKeys.map((key) => (
                    <div key={key} className="flex items-center">
                        <button
                            className={`w-full text-left p-3 rounded-lg border text-gray-800 cursor-pointer ${currentAnswer === key
                                ? 'bg-blue-100 border-blue-500'
                                : 'border-gray-300 hover:bg-gray-50'
                                }`}
                            onClick={() => handleOptionSelect(key)}
                        >
                            <span className="font-medium mr-2">{key.toUpperCase()}.</span>
                            {typeof currentQuestion.options[key] === 'string' && currentQuestion.options[key].includes('<')
                                ? <span className='question-content' dangerouslySetInnerHTML={renderHTML(currentQuestion.options[key])} />
                                : currentQuestion.options[key]
                            }
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};