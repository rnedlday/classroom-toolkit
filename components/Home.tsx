
import React from 'react';
import { ToolType } from '../types';
import { QrCode, UserCheck, Timer, Dice5 } from 'lucide-react';

interface HomeProps {
  onSelectTool: (tool: ToolType) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectTool }) => {
  const tools = [
    {
      type: ToolType.QR_GENERATOR,
      title: 'QR 생성기',
      description: 'URL을 넣으면 즉석에서 QR코드가 생성됩니다.',
      icon: <QrCode className="w-10 h-10" />,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      type: ToolType.RANDOM_PICKER,
      title: '랜덤 뽑기',
      description: '명단을 붙여넣고 무작위로 학생을 뽑습니다.',
      icon: <UserCheck className="w-10 h-10" />,
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600'
    },
    {
      type: ToolType.STOPWATCH,
      title: '스탑워치',
      description: '수업 시간을 설정하고 알람을 듣습니다.',
      icon: <Timer className="w-10 h-10" />,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600'
    },
    {
      type: ToolType.DICE_ROLLER,
      title: '주사위 뽑기',
      description: '주사위를 굴려 숫자를 확인합니다.',
      icon: <Dice5 className="w-10 h-10" />,
      color: 'bg-rose-500',
      hoverColor: 'hover:bg-rose-600'
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">교실 도구 모음</h1>
        <p className="text-lg text-slate-600">오늘 수업에 필요한 도구를 선택하세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {tools.map((tool) => (
          <button
            key={tool.type}
            onClick={() => onSelectTool(tool.type)}
            className={`${tool.color} ${tool.hoverColor} text-white p-8 rounded-3xl shadow-lg transition-all transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center gap-4 group h-full`}
          >
            <div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform">
              {tool.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{tool.title}</h2>
              <p className="text-white/80 font-medium">{tool.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
