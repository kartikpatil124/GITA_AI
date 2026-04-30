import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Bookmark, Settings, Trash2, Pin, MessageCircle, PanelLeftClose, PanelLeft, Sparkles, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { state, dispatch, newConversation, setActiveConversation, deleteConversation, pinConversation } = useAppContext();
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pinned = state.conversations.filter(c => c.pinned);
  const recent = state.conversations
    .filter(c => !c.pinned && c.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const handleNewChat = () => {
    newConversation();
    navigate('/chat');
  };

  const handleSelectConv = (id) => {
    setActiveConversation(id);
    navigate('/chat');
    // Close sidebar on mobile
    if (window.innerWidth < 768) dispatch({ type: 'SET_SIDEBAR', payload: false });
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'Now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d`;
    return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {state.sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => dispatch({ type: 'SET_SIDEBAR', payload: false })} />
      )}

      <motion.aside
        className={`fixed md:relative z-40 h-full flex flex-col border-r border-white/[0.04] transition-all duration-300
          ${state.sidebarOpen ? 'w-72' : 'w-0 md:w-16'} bg-surface-50`}
        initial={false}
      >
        {/* Top Controls */}
        <div className={`flex items-center gap-2 p-3 border-b border-white/[0.03] ${!state.sidebarOpen ? 'md:justify-center' : ''}`}>
          {state.sidebarOpen ? (
            <>
              <Link to="/" className="flex items-center gap-2 flex-1 min-w-0">
                <Sparkles className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span className="font-cinzel text-sm text-gold-gradient font-semibold tracking-wider truncate">Gita AI</span>
              </Link>
              <button onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-gray-500 transition-colors" aria-label="Collapse sidebar">
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-gray-500 transition-colors mx-auto hidden md:block" aria-label="Expand sidebar">
              <PanelLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {state.sidebarOpen && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* New Chat */}
            <div className="p-3">
              <button onClick={handleNewChat} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-200 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.05] transition-all">
                <Plus className="w-4 h-4 text-gold-500" /> New Conversation
              </button>
            </div>

            {/* Search */}
            <div className="px-3 mb-2">
              {showSearch ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <Search className="w-3.5 h-3.5 text-gray-600" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search chats..." className="flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none" autoFocus />
                  <button onClick={() => { setShowSearch(false); setSearch(''); }} className="text-gray-600"><X className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-white/[0.03] transition-colors">
                  <Search className="w-3.5 h-3.5" /> Search conversations
                </button>
              )}
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-2">
              {/* Pinned */}
              {pinned.length > 0 && (
                <div className="mb-3">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-2 mb-1.5">Pinned</p>
                  {pinned.map(conv => (
                    <ConvItem key={conv.id} conv={conv} active={conv.id === state.activeConversationId}
                      onClick={() => handleSelectConv(conv.id)} onDelete={() => deleteConversation(conv.id)} onPin={() => pinConversation(conv.id)}
                      formatDate={formatDate} />
                  ))}
                </div>
              )}

              {/* Recent */}
              <div>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-2 mb-1.5">Recent</p>
                {recent.length === 0 ? (
                  <p className="text-xs text-gray-700 px-2 py-4 text-center">No conversations yet</p>
                ) : (
                  recent.map(conv => (
                    <ConvItem key={conv.id} conv={conv} active={conv.id === state.activeConversationId}
                      onClick={() => handleSelectConv(conv.id)} onDelete={() => deleteConversation(conv.id)} onPin={() => pinConversation(conv.id)}
                      formatDate={formatDate} />
                  ))
                )}
              </div>
            </div>

            {/* Bottom Links */}
            <div className="p-2 border-t border-white/[0.03] space-y-0.5">
              <Link to="/saved" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === '/saved' ? 'text-gold-400 bg-white/[0.04]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
                <Bookmark className="w-4 h-4" /> Saved Wisdom
              </Link>
              <Link to="/settings" className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === '/settings' ? 'text-gold-400 bg-white/[0.04]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
                <Settings className="w-4 h-4" /> Settings
              </Link>
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
}

function ConvItem({ conv, active, onClick, onDelete, onPin, formatDate }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`group flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all mb-0.5 ${active ? 'bg-white/[0.06] text-gray-200' : 'text-gray-500 hover:bg-white/[0.03] hover:text-gray-300'}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
      <span className="flex-1 text-sm truncate">{conv.title}</span>
      {hover ? (
        <div className="flex items-center gap-0.5">
          <button onClick={e => { e.stopPropagation(); onPin(); }} className="p-1 rounded hover:bg-white/[0.06]" aria-label="Pin">
            <Pin className={`w-3 h-3 ${conv.pinned ? 'text-gold-400' : ''}`} />
          </button>
          <button onClick={e => { e.stopPropagation(); onDelete(); }} className="p-1 rounded hover:bg-white/[0.06] text-red-400/60" aria-label="Delete">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <span className="text-[10px] text-gray-700">{formatDate(conv.updatedAt)}</span>
      )}
    </div>
  );
}
