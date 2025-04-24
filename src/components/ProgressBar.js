'use client';

import { useSelector } from 'react-redux';

export default function ProgressBar() {
    const { questions, userAnswers } = useSelector((state) => state.quiz);

    if (!questions || questions.length === 0) {
        return null;
    }

    const answeredCount = userAnswers.filter(answer => answer !== null).length;
    const progressPercentage = (answeredCount / questions.length) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{answeredCount} of {questions.length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
}