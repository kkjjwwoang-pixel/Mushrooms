import React, { useState } from 'react';
import { MessageSquare, Image as ImageIcon, BarChart2, Github } from 'lucide-react';
import { ViewMode } from './types';
import { ChatView } from './components/ChatView';
import { ImageView } from './components/ImageView';
import { StatsView } from './components/StatsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.Chat);

  const renderContent = () => {
    switch (currentView) {
      case ViewMode.Chat:
        return <ChatView />;
      case ViewMode.Image:
        return <ImageView />;
      case ViewMode.Stats:
        return <StatsView />;
      default:
        return <ChatView />;
    }
  };

  const NavItem: React.FC<{ view: ViewMode; icon: React.ReactNode; label: string }> = ({ view, icon, label }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === view
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
      }`}
    >
      {icon}
      <span className="font-medium hidden md:block">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-dark text-gray-100 font-sans selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-darker border-r border-gray-800 flex flex-col p-4 flex-shrink-0">
        <div className="mb-8 flex items-center justify-center md:justify-start gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="font-bold text-xl">G</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hidden md:block">
            Gemini Studio
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem 
            view={ViewMode.Chat} 
            icon={<MessageSquare size={20} />} 
            label="AI Chat" 
          />
          <NavItem 
            view={ViewMode.Image} 
            icon={<ImageIcon size={20} />} 
            label="Image Gen" 
          />
          <NavItem 
            view={ViewMode.Stats} 
            icon={<BarChart2 size={20} />} 
            label="Analytics" 
          />
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-800">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-300 transition-colors">
            <Github size={20} />
            <span className="text-sm hidden md:block">v1.0.0</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 pointer-events-none" />
        <div className="h-full p-4 md:p-8 max-w-7xl mx-auto relative z-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;