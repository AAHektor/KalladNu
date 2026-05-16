import React, { useState } from 'react';
import { Calendar, MapPin, Send, FileText, Info, X } from 'lucide-react';

const SendInvite: React.FC = () => {
  // Enkel statshantering för e-post-chips (hårdkodat som start i din frontend-first)
  const [emails, setEmails] = useState<string[]>([
    'anna.andersson@company.com',
    'erik.lind.en.mycket.lang.adress.som.testar.granserna@company.com' // Lång test-adress
  ]);

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16 font-sans text-slate-900">
      <div className="max-w-xl mx-auto px-6 pt-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Skapa ny inbjudan</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Fyll i detaljerna för att kalla personal eller deltagare till ett nytt pass.
          </p>
        </div>

        {/* Huvudkort för formuläret */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Titel */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Titel
              </label>
              <input 
                type="text" 
                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
              />
            </div>

            {/* Beskrivning */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Beskrivning
              </label>
              <textarea 
                rows={4}
                placeholder="Beskriv syftet med kallelsen..."
                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium resize-none placeholder:text-gray-400"
              />
            </div>

            {/* Tid & Datum + Plats */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Tid & Datum
                </label>
                <div className="relative">
                  <input 
                    type="datetime-local" 
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-4 pr-10 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-gray-400"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Plats
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-4 pr-10 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            {/* Inbjudna E-postadresser */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Inbjudna (E-postadresser)
              </label>
              
              {/* Huvudcontainer */}
              <div className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl p-4 space-y-3 overflow-hidden">
                
                {/* Container för e-postchips */}
                <div className="flex flex-wrap gap-2 w-full">
                  {emails.map((email) => (
                    <div 
                      key={email} 
                      className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold pl-3 pr-1.5 py-1.5 rounded-xl flex items-center justify-between gap-1.5 min-w-0 max-w-full"
                    >
                      <span className="break-all block flex-1 pr-1">{email}</span>
                      
                      <button 
                        type="button"
                        onClick={() => removeEmail(email)}
                        className="hover:bg-indigo-100 p-0.5 rounded-md transition-colors text-indigo-400 hover:text-indigo-600 shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Inputrad */}
                <input 
                  type="text" 
                  placeholder="Lägg till e-post..."
                  className="w-full bg-transparent border-none outline-none p-0 text-sm font-medium placeholder:text-gray-400 focus:ring-0"
                />
              </div>
              
              <p className="mt-2 text-[11px] text-gray-400 italic">
                Separera med kommatecken eller tryck Enter.
              </p>
            </div>

            {/* Knappar */}
            <div className="space-y-3 pt-2">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md shadow-indigo-100 cursor-pointer">
                <Send size={18} /> Skicka Kallelser
              </button>

              <button className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all border-2 border-indigo-600 active:scale-[0.99] cursor-pointer">
                <FileText size={18} /> Spara som utkast
              </button>
            </div>

          </form>
        </div>

        {/* Info-box (Visste du?) */}
        <div className="bg-orange-100/70 border border-orange-200/50 rounded-2xl p-5 flex gap-4 items-start">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg mt-0.5 shrink-0">
            <Info size={16} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-orange-900 mb-0.5">Visste du?</h4>
            <p className="text-xs text-orange-800/90 leading-relaxed font-medium">
              Kallelser skickas omedelbart via push-notis och e-post till alla inbjudna deltagare.
            </p>
          </div>
        </div>          

      </div>
    </div>
  );
};

export default SendInvite;