import './globals.css';
import { Inter } from 'next/font/google';
import { ReduxProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MCQ Practice App',
  description: 'Practice MCQs with timer and score tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}