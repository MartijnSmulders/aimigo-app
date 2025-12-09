import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import MessageBubble from './components/MessageBubble';
import LoadingDots from './components/LoadingDots';
import Logo from './components/Logo';
import { getAImigoResponse } from './services/geminiService';
import { Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hoi! Ik ben AImigo, jouw digitale studentassistent. 👋\n\nIk weet alles over roosters, locaties, wifi en contactpersonen op locatie Kasteeldreef. Waar kan ik je mee helpen?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Get AI response
      const responseText = await getAImigoResponse(text);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Er ging iets mis. Probeer het later opnieuw.",
        timestamp: new Date(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar (Left side, centered content) */}
      <aside className="hidden md:flex w-1/3 lg:w-1/4 flex-col items-center justify-center border-r border-slate-200 bg-white p-8 text-center z-10 relative">
        <div className="mb-6">
          <Logo size="lg" />
        </div>
        
        <p className="text-slate-500 font-medium text-lg mb-8">
          Yonder Student Assistent
        </p>
        <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
           <span className="text-sm font-semibold text-blue-700">
            📍 Locatie Kasteeldreef
          </span>
        </div>
      </aside>

      {/* Right Content Area (Chat) */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        <Header /> {/* Mobile Header only shows on small screens */}

        <main className="flex-1 overflow-y-auto pt-4 px-4 pb-4 scroll-smooth">
          <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-end">
              {/* Quick Suggestions (Only show if few messages) */}
              {messages.length < 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 opacity-80 mt-auto">
                      <button onClick={() => handleSendMessage("Wat is het wifi wachtwoord?")} className="text-left p-3 text-sm bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-slate-600">
                          📶 Wat is het wifi wachtwoord?
                      </button>
                      <button onClick={() => handleSendMessage("Wanneer heb ik pauze?")} className="text-left p-3 text-sm bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-slate-600">
                          🕒 Wanneer zijn de pauzes?
                      </button>
                      <button onClick={() => handleSendMessage("Hoe meld ik me ziek?")} className="text-left p-3 text-sm bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-slate-600">
                          🤒 Hoe meld ik me ziek?
                      </button>
                      <button onClick={() => handleSendMessage("Wie is de vertrouwenspersoon?")} className="text-left p-3 text-sm bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-slate-600">
                          🤝 Wie is de vertrouwenspersoon?
                      </button>
                  </div>
              )}

            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                  <LoadingDots />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </main>

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;