'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion } from '../redux/quizSlice';

export default function QuestionCard() {
    const dispatch = useDispatch();
    const { questions, currentQuestionIndex, userAnswers } = useSelector((state) => state.quiz);

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

    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            .question-content table {
                border-collapse: collapse;
                margin: 15px 0;
                font-size: 14px;
            }
            .question-content th {
                background-color: #f2f2f2;
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
            }
            .question-content td {
                border: 1px solid #ddd;
                padding: 8px;
            }
        `;
        document.head.appendChild(styleTag);
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <div className="mb-2 text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <div
                className="text-lg font-semibold mb-4 text-gray-800 question-content"
                dangerouslySetInnerHTML={renderHTML(currentQuestion.question)}
            />

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