
import React, { useState } from 'react';
import { Dice5, RotateCcw } from 'lucide-react';

const DiceRoller: React.FC = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Simulate rolling animation with intervals
    let rolls = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls > 15) {
        clearInterval(interval);
        setDiceValue(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    }, 80);
  };

  const renderDots = (value: number) => {
    const dotPositions = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };

    const activeDots = dotPositions[value as keyof typeof dotPositions] || [];

    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full p-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            {activeDots.includes(i) && (
              <div className="w-6 h-6 bg-slate-800 rounded-full shadow-inner" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-[4rem] shadow-2xl p-12 text-center relative overflow-hidden">
        <div className="bg-rose-500 absolute top-0 left-0 w-full h-4" />
        
        <div className="flex items-center justify-center gap-3 text-rose-500 mb-12">
          <Dice5 className="w-10 h-10" />
          <h2 className="text-3xl font-black">주사위 굴리기</h2>
        </div>

        <div 
          className={`w-64 h-64 mx-auto mb-16 bg-white border-[12px] border-slate-100 rounded-[2.5rem] shadow-2xl transform transition-all duration-100 ${
            isRolling ? 'rotate-[360deg] scale-90 blur-[1px]' : 'rotate-0 scale-100'
          }`}
        >
          {renderDots(diceValue)}
        </div>

        <div className="space-y-4">
          <button
            onClick={rollDice}
            disabled={isRolling}
            className={`w-full py-6 rounded-3xl text-2xl font-black shadow-xl transition-all active:scale-95 ${
              isRolling 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-rose-500 text-white hover:bg-rose-600 hover:shadow-2xl'
            }`}
          >
            {isRolling ? '굴리는 중...' : '주사위 던지기'}
          </button>
          
          <button
            onClick={() => setDiceValue(1)}
            className="flex items-center gap-2 mx-auto text-slate-400 hover:text-rose-500 transition-colors font-semibold"
          >
            <RotateCcw className="w-4 h-4" /> 리셋
          </button>
        </div>
      </div>

      <div className="mt-12 text-slate-400 font-medium">
        팁: 주사위를 던져서 순서를 정하거나 점수를 매겨보세요!
      </div>
    </div>
  );
};

export default DiceRoller;
