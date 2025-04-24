'use client';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { startQuiz } from '../redux/quizSlice';
import FileUpload from '../components/FileUpload';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { questions, error, isLoading } = useSelector((state) => state.quiz);

  const handleStartQuiz = () => {
    dispatch(startQuiz());
    router.push('/practice');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">QuizWhiz</h1>
          <p className="text-gray-600">Upload your questions and start practicing</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">Upload Questions</h2>
          <FileUpload />

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mt-4 text-center text-gray-500">
              Loading questions...
            </div>
          )}

          {questions.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-green-600 mb-2">
                {questions.length} questions loaded successfully!
              </p>
              <button
                onClick={handleStartQuiz}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Start Quiz
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-gray-600">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Upload a JSON file with quiz questions</li>
            <li>Questions will be shuffled automatically</li>
            <li>Timer will start when you begin the quiz</li>
            <li>Answer all questions and submit to see your score</li>
          </ul>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <h3 className="font-medium text-yellow-800 mb-1">JSON Format Example:</h3>
            <pre className="text-xs text-gray-700 overflow-x-auto">
              {`[
  {
    "question": "A traditional cryptosystem consists of",
    "options": {
      "a": "Three tuple",
      "b": "Four tuple",
      "c": "Five tuple",
      "d": "Six tuple"
    },
    "answer": "c"
  },
  {
    "question": "Let P,C,K denotes plaintext, ciphertext and key space...",
    "options": {
      "a": "6",
      "b": "7",
      "c": "8",
      "d": "9"
    },
    "answer": "b"
  }
]`}
            </pre>
          </div>
        </div>

        <footer className="mt-auto bg-white border-t border-gray-200 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold text-gray-800">QuizWhiz</h2>
                <p className="text-gray-600 text-sm mt-1">An interactive quiz application for self-assessment</p>
              </div>

              <div className="text-center md:text-right">
                <p className="text-gray-700 font-medium">Designed & Developed by</p>
                <div className="flex items-center justify-center md:justify-end space-x-4 mt-2">
                  <Link href="https://www.linkedin.com/in/chakraborty-niladri/" className="text-blue-600 hover:text-blue-800 flex items-center" target="_blank" rel="noopener noreferrer">
                    <span className="mr-1">Niladri Chakraborty</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col md:flex-row justify-between text-gray-600 text-sm">
              <p>© {new Date().getFullYear()} QuizWhiz. All rights reserved.</p>
              <div className="flex space-x-4 mt-3 md:mt-0">
                <Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-600">Terms of Use</Link>
                <Link href="/contact" className="hover:text-blue-600">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}