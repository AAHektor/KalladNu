import React, { useState } from 'react';
import { 
  Calendar, 
  Mail, 
  Plus, 
  Users, 
  PartyPopper, 
  Megaphone, 
  LayoutDashboard, 
  Send, 
  UserCircle,
  Menu,
  X 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Menyval för att slippa duplicera kod
  const menuItems = [
    { icon: <LayoutDashboard size={24} />, label: 'Dashboard', active: true },
    { icon: <Mail size={24} />, label: 'Invitations', active: false },
    { icon: <Send size={24} />, label: 'Sent', active: false },
    { icon: <UserCircle size={24} />, label: 'Profile', active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10 font-sans text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-24">
        
        <div className="pt-10 pb-8 md:pt-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
            Välkommen tillbaka
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Hej, Anna!</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute left-0 top-1/4 bottom-1/4 w-1.5 bg-indigo-600 rounded-r-full"></div>
              <Calendar className="text-indigo-600 w-8 h-8 mb-4" />
              <p className="text-sm font-semibold text-gray-500 mb-1">Kommande Event</p>
              <p className="text-3xl md:text-4xl font-black text-slate-800">12</p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <Mail className="text-orange-600 w-8 h-8 mb-4" />
              <p className="text-sm font-semibold text-gray-500 mb-1">Nya Inbjudningar</p>
              <p className="text-3xl md:text-4xl font-black text-slate-800">3</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 shadow-lg shadow-indigo-100 relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Redo att organisera?</h2>
              <p className="text-indigo-100 text-sm mb-6 opacity-90">Skapa ny kallelse för ditt nästa möte.</p>
              <button className="w-full cursor-pointer bg-white text-indigo-700 font-bold py-4 rounded-2xl tracking-widest text-xs hover:bg-indigo-100 transition-all uppercase">
                Skapa ny kallelse
              </button>
            </div>
            <Plus className="absolute -right-4 -top-4 text-white/10 w-24 h-24" />
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Senaste aktivitet</h3>
            <button className="text-indigo-600 text-sm font-bold tracking-wide uppercase">Visa alla</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-[2.2rem] shadow-sm border border-gray-50 flex items-center justify-between hover:border-indigo-200 transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-2xl group-hover:bg-indigo-100 transition-colors">
                  <Users className="text-indigo-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm md:text-base">Ledningsmöte Q3</p>
                  <p className="text-xs text-gray-400 font-medium">Imorgon • 09:00</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full">Ja</span>
            </div>

            <div className="bg-white p-5 rounded-[2.2rem] shadow-sm border border-gray-50 flex items-center justify-between hover:border-orange-200 transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-3 rounded-2xl group-hover:bg-orange-100 transition-colors">
                  <PartyPopper className="text-orange-500 w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm md:text-base">Afterwork: Sommar</p>
                  <p className="text-xs text-gray-400 font-medium">16 Jun • 17:30</p>
                </div>
              </div>
              <span className="bg-orange-50 text-orange-600 text-[10px] font-extrabold px-3 py-1.5 rounded-full">Väntar</span>
            </div>

            <div className="bg-white p-5 rounded-[2.2rem] shadow-sm border border-gray-50 flex items-center justify-between hover:border-red-200 transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-2xl group-hover:bg-indigo-100 transition-colors">
                  <Megaphone className="text-indigo-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm md:text-base">Projekt Kick-off</p>
                  <p className="text-xs text-gray-400 font-medium">19 Jun • 10:00</p>
                </div>
              </div>
              <span className="bg-red-50 text-red-500 text-[10px] font-extrabold px-3 py-1.5 rounded-full">Nej</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;