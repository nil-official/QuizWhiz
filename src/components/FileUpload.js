'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadQuestions, setError, setLoading } from '../redux/quizSlice';
import { validateQuizData } from '../utils/helpers';

export default function FileUpload() {
    const [dragActive, setDragActive] = useState(false);
    const dispatch = useDispatch();

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const processFile = async (file) => {
        if (file.type !== 'application/json') {
            dispatch(setError('Please upload a JSON file'));
            return;
        }

        dispatch(setLoading(true));

        try {
            const text = await file.text();
            const jsonData = JSON.parse(text);

            if (!validateQuizData(jsonData)) {
                dispatch(setError('Invalid quiz data format'));
                return;
            }

            dispatch(loadQuestions(jsonData));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError('Error parsing JSON file: ' + error.message));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                </div>
                <p className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">JSON file containing quiz questions</p>

                <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleChange}
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Choose File
                </label>
            </div>
        </div>
    );
}