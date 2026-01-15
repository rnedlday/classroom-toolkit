
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw, BellRing } from 'lucide-react';

const Stopwatch: React.FC = () => {
  const [targetMinutes, setTargetMinutes] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize notification sound
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (secondsLeft <= 0 && !isActive) return;
    setIsActive(!isActive);
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setSecondsLeft(targetMinutes * 60);
  }, [targetMinutes]);

  useEffect(() => {
    resetTimer();
  }, [targetMinutes, resetTimer]);

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      audioRef.current?.play().catch(e => console.error("Audio play failed", e));
      alert("시간이 종료되었습니다!");
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const progress = (secondsLeft / (targetMinutes * 60)) * 100;

  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-12 text-center border-8 border-slate-100 relative overflow-hidden">
        {/* Progress Background */}
        <div 
          className="absolute bottom-0 left-0 h-2 bg-amber-500 transition-all duration-1000"
          style={{ width: `${100 - progress}%` }}
        />

        <div className="flex items-center justify-center gap-3 text-amber-500 mb-8">
          <Timer className="w-10 h-10" />
          <h2 className="text-3xl font-black">수업 타이머</h2>
        </div>

        <div className="mb-12">
          <div className="text-[12rem] font-black tabular-nums leading-none text-slate-800 flex justify-center items-center gap-4">
            {formatTime(secondsLeft)}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-12">
          {[1, 5, 10, 20, 30, 40, 50, 60].map((min) => (
            <button
              key={min}
              onClick={() => setTargetMinutes(min)}
              className={`py-3 rounded-2xl font-bold transition-all ${
                targetMinutes === min 
                  ? 'bg-amber-500 text-white shadow-lg scale-105' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {min}분
            </button>
          ))}
        </div>

        <div className="flex gap-6 justify-center">
          <button
            onClick={resetTimer}
            className="w-20 h-20 flex items-center justify-center bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-all active:scale-90"
            title="초기화"
          >
            <RotateCcw className="w-8 h-8" />
          </button>
          
          <button
            onClick={toggleTimer}
            className={`w-32 h-32 flex items-center justify-center rounded-full text-white shadow-2xl transition-all active:scale-95 ${
              isActive 
                ? 'bg-rose-500 hover:bg-rose-600' 
                : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {isActive ? <Pause className="w-16 h-16 fill-current" /> : <Play className="w-16 h-16 fill-current ml-2" />}
          </button>

          <button
            onClick={() => audioRef.current?.play()}
            className="w-20 h-20 flex items-center justify-center bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-all active:scale-90"
            title="소리 테스트"
          >
            <BellRing className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
