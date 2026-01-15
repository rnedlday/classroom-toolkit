
import React, { useState } from 'react';
import { ToolType } from './types';
import Home from './components/Home';
import QRGenerator from './components/QRGenerator';
import RandomPicker from './components/RandomPicker';
import Stopwatch from './components/Stopwatch';
import DiceRoller from './components/DiceRoller';
import { Home as HomeIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.HOME);

  const renderTool = () => {
    switch (activeTool) {
      case ToolType.QR_GENERATOR:
        return <QRGenerator />;
      case ToolType.RANDOM_PICKER:
        return <RandomPicker />;
      case ToolType.STOPWATCH:
        return <Stopwatch />;
      case ToolType.DICE_ROLLER:
        return <DiceRoller />;
      default:
        return <Home onSelectTool={setActiveTool} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Header for Tools */}
      {activeTool !== ToolType.HOME && (
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTool(ToolType.HOME)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 flex items-center gap-2 group"
            >
              <HomeIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-semibold hidden sm:inline">홈으로</span>
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              {activeTool === ToolType.QR_GENERATOR && 'QR 생성기'}
              {activeTool === ToolType.RANDOM_PICKER && '랜덤 뽑기'}
              {activeTool === ToolType.STOPWATCH && '교실 타이머'}
              {activeTool === ToolType.DICE_ROLLER && '주사위 굴리기'}
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-400">Classroom Suite</div>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        {renderTool()}
      </main>

      <footer className="py-4 text-center text-slate-400 text-xs border-t border-slate-100">
        &copy; 2024 Classroom Productivity Suite. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
