import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Plus } from 'lucide-react';

const SentInvitations: React.FC = () => {
  const [filter, setFilter] = useState<'alla' | 'kommande' | 'avslutade'>('alla');
  const navigate = useNavigate();

  const invitations = [
    { id: 1, title: 'Personalmöte Q4', date: '15 Dec 2023', time: '09:00 - 10:30', status: '12/15 svarade', percentage: 80, statusType: 'success' },
    { id: 2, title: 'Workshop: UI Design', date: '18 Dec 2023', time: '13:00 - 15:00', status: '5/20 svarade', percentage: 25, statusType: 'warning' },
    { id: 3, title: 'Team Lunch: Fredag', date: '20 Dec 2023', time: '12:00 - 13:00', status: '0/10 svarade', percentage: 0, statusType: 'danger' },
    { id: 4, title: 'Projektavstämning', date: '22 Dec 2023', time: '10:00 - 11:00', status: '8/8 svarade', percentage: 100, statusType: 'success' },
  ];

  const getStatusClasses = (type: string) => {
    switch(type) {
      case 'success': return { badge: 'bg-green-100 text-green-700', bar: 'bg-indigo-600' };
      case 'warning': return { badge: 'bg-orange-100 text-orange-700', bar: 'bg-amber-800' };
      case 'danger': return { badge: 'bg-red-100 text-red-700', bar: 'bg-gray-200' };
      default: return { badge: 'bg-gray-100 text-gray-600', bar: 'bg-gray-200' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans text-slate-900 relative">
      <div className="max-w-xl md:max-w-3xl mx-auto px-6 pt-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Skickade kallelser</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Hantera och följ upp dina utskickade inbjudningar.
            </p>
          </div>
          <button 
            onClick={() => navigate('/sendInvite')}
            className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-2xl shadow-sm shadow-indigo-100 transition-all active:scale-[0.98] cursor-pointer text-sm"
          >
            <Plus size={18} strokeWidth={2.5} />
            Skapa ny kallelse
          </button>
        </div>

        <div className="flex gap-2 mb-8">
          {['alla', 'kommande', 'avslutade'].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all capitalize ${
                filter === item 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200/70'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invitations.map((invite) => {
            const styles = getStatusClasses(invite.statusType);
            
            return (
              <div 
                key={invite.id} 
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between transition-all overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{invite.title}</h3>
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full shrink-0 ${styles.badge}`}>
                      {invite.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{invite.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                      <Clock size={16} className="text-gray-400" />
                      <span>{invite.time}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${styles.bar}`} 
                    style={{ width: `${invite.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button 
        onClick={() => navigate('/sendInvite')}
        className="md:hidden fixed bottom-6 right-6 z-[70] bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-90 cursor-pointer"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default SentInvitations;