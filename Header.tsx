import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm md:hidden">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Yonder Student Assistent</span>
          </div>
        </div>
        
        <div className="hidden sm:block">
           <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Locatie Kasteeldreef
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;