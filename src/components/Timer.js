'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatTime } from '../utils/helpers';

export default function Timer() {
    const { timeStarted, isQuizFinished } = useSelector((state) => state.quiz);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!timeStarted || isQuizFinished) return;

        const intervalId = setInterval(() => {
            setCurrentTime(Date.now() - timeStarted);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeStarted, isQuizFinished]);

    if (!timeStarted) {
        return null;
    }

    return (
        <div className="text-center py-2">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2">
                <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="font-mono text-lg text-gray-600">{formatTime(currentTime)}</span>
            </div>
        </div>
    );
}