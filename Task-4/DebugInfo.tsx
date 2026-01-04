'use client';

import { useEffect, useState } from 'react';

export default function DebugInfo() {
  const [env, setEnv] = useState<string>('');
  
  useEffect(() => {
    // This will only run on the client side
    setEnv(process.env.NEXT_PUBLIC_GEMINI_API_KEY 
      ? `API Key: ${process.env.NEXT_PUBLIC_GEMINI_API_KEY.substring(0, 10)}...` 
      : 'No API Key Found');
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-red-100 text-red-800 p-3 rounded-lg text-xs max-w-xs">
      <div className="font-bold mb-1">Debug Info:</div>
      <div>Environment: {process.env.NODE_ENV}</div>
      <div>API Key Status: {env}</div>
    </div>
  );
}
