import React from 'react';
import { UserPlus, Key, PlusCircle, Rocket, ArrowRight } from 'lucide-react';
import groupImg from './assets/joinGroup.avif';

const Group: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans text-slate-900">
      
      <div className="text-center mb-10 max-w-sm">
        <div className="bg-indigo-100 p-4 rounded-full w-fit mx-auto mb-4">
          <UserPlus className="text-indigo-600 w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Gå med i en grupp</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Kom igång genom att ansluta till ett befintligt team eller skapa ett eget för din organisation.
        </p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-50 p-2 rounded-xl">
              <Key className="text-indigo-600 w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">Gå med i en befintlig grupp</h2>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="T.ex. ABC-123" 
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-600"
            />
            <button className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              Gå med <ArrowRight size={18} />
            </button>
          </div>
          <p className="mt-4 text-[11px] text-center text-gray-400 px-4">
            Be din administratör om en unik inbjudningskod för att ansluta.
          </p>
        </div>

        <div className="relative flex items-center justify-center py-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">Eller</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-50 p-2 rounded-xl">
              <PlusCircle className="text-orange-600 w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">Skapa en ny grupp</h2>
          </div>
          
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Vill du hantera ditt eget team? Skapa en ny grupp och bjud in dina kollegor för att börja spåra närvaro.
          </p>

          <button className="w-full cursor-pointer bg-gray-50 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all border border-gray-200 active:scale-[0.98]">
            Skapa en ny grupp <Rocket size={18} />
          </button>
        </div>

        <div className="relative rounded-[2.5rem] overflow-hidden h-48 shadow-inner">
          <img 
            src={groupImg} 
            alt="Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
            <p className="text-white text-sm font-medium leading-snug max-w-[200px]">
              Hantera ditt teams närvaro med precision och enkelhet.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button className=" cursor-pointer text-indigo-600 font-semibold text-sm hover:text-indigo-900 transition-colors">
            Behöver du hjälp? Kontakta support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Group;