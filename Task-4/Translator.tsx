'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const languages = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
];

interface TranslatorProps {
  onTranslate: (text: string, targetLanguage: string) => Promise<string>;
  isTranslating: boolean;
}

export default function Translator({ onTranslate, isTranslating }: TranslatorProps) {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [showLanguages, setShowLanguages] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    try {
      const result = await onTranslate(inputText, targetLanguage);
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error: Could not translate the text. Please try again.');
    }
  };

  const selectedLanguage = languages.find(lang => lang.code === targetLanguage)?.name || 'Spanish';

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800">
        <div className="mb-4">
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Enter text to translate (English)
          </label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Type or paste your text here..."
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Translate to
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLanguages(!showLanguages)}
              className="w-full flex justify-between items-center p-3 bg-white border border-gray-300 rounded-lg text-left dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <span>{selectedLanguage}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showLanguages ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showLanguages && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto dark:bg-gray-700 dark:border-gray-600"
              >
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                      targetLanguage === lang.code ? 'bg-blue-50 dark:bg-blue-900' : ''
                    }`}
                    onClick={() => {
                      setTargetLanguage(lang.code);
                      setShowLanguages(false);
                    }}
                  >
                    {lang.name}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <button
          onClick={handleTranslate}
          disabled={!inputText.trim() || isTranslating}
          className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            (!inputText.trim() || isTranslating) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isTranslating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Translating...
            </span>
          ) : (
            'Translate'
          )}
        </button>
      </div>

      {translatedText && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Translation to {selectedLanguage}:
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
            <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{translatedText}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
