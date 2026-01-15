
import React, { useState, useMemo } from 'react';
import { UserPlus, UserCheck, RotateCcw, Play, List } from 'lucide-react';
import { Student } from '../types';

const RandomPicker: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [lastPicked, setLastPicked] = useState<Student | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const handleUpdateList = () => {
    const names = inputText
      .split(/[\n,]/)
      .map((name) => name.trim())
      .filter((name) => name !== '');
    
    const newList = names.map((name, idx) => ({
      id: `${idx}-${name}`,
      name,
      isPicked: false,
    }));
    
    setStudents(newList);
    setLastPicked(null);
  };

  const remainingStudents = useMemo(() => students.filter(s => !s.isPicked), [students]);

  const pickRandom = () => {
    if (remainingStudents.length === 0) return;

    setIsPicking(true);
    
    // Animation effect
    let counter = 0;
    const interval = setInterval(() => {
      const tempIdx = Math.floor(Math.random() * remainingStudents.length);
      setLastPicked(remainingStudents[tempIdx]);
      counter++;
      
      if (counter > 15) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * remainingStudents.length);
        const selected = remainingStudents[finalIdx];
        
        setStudents(prev => prev.map(s => 
          s.id === selected.id ? { ...s, isPicked: true } : s
        ));
        setLastPicked(selected);
        setIsPicking(false);
      }
    }, 100);
  };

  const resetSelection = () => {
    setStudents(prev => prev.map(s => ({ ...s, isPicked: false })));
    setLastPicked(null);
  };

  return (
    <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
      {/* Input Side */}
      <div className="bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
        <div className="bg-emerald-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List className="w-6 h-6" />
            <h2 className="text-xl font-bold">명단 입력</h2>
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            총 {students.length}명
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col gap-4">
          <textarea
            placeholder="학생 이름을 한 줄에 하나씩 또는 쉼표로 구분하여 넣어주세요.&#10;예: 김철수, 이영희, 박지민..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none resize-none text-lg min-h-[300px]"
          />
          <button
            onClick={handleUpdateList}
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" /> 명단 적용하기
          </button>
        </div>
      </div>

      {/* Picking Side */}
      <div className="bg-slate-100 rounded-3xl flex flex-col gap-6 overflow-hidden border-4 border-white shadow-inner">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          {lastPicked ? (
            <div className={`transform transition-all duration-300 ${isPicking ? 'scale-90 opacity-50' : 'scale-110'}`}>
              <div className="w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border-8 border-emerald-500 mb-6 mx-auto">
                <span className="text-5xl font-black text-slate-800">{lastPicked.name}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-600">
                {isPicking ? '뽑는 중...' : '당첨!'}
              </h3>
            </div>
          ) : (
            <div className="text-slate-400">
              <UserCheck className="w-24 h-24 mx-auto mb-4 opacity-20" />
              <p className="text-xl font-semibold">준비 완료!</p>
              <p>버튼을 눌러 무작위로 학생을 뽑으세요.</p>
            </div>
          )}
        </div>

        <div className="p-8 bg-white/50 backdrop-blur-sm flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 font-bold">남은 인원: {remainingStudents.length}명</span>
            <button
              onClick={resetSelection}
              className="text-slate-500 hover:text-emerald-600 flex items-center gap-1 text-sm font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> 선택 초기화
            </button>
          </div>
          <button
            onClick={pickRandom}
            disabled={remainingStudents.length === 0 || isPicking}
            className={`w-full py-6 rounded-2xl text-2xl font-black shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 ${
              remainingStudents.length === 0 
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-2xl'
            }`}
          >
            <Play className="w-8 h-8 fill-current" />
            {remainingStudents.length === 0 ? '전원 선발됨' : '무작위 뽑기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomPicker;
