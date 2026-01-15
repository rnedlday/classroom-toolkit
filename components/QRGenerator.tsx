
import React, { useState } from 'react';
import { Copy, Download, Link2 } from 'lucide-react';

const QRGenerator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    // Using Google Charts API for easy QR generation without heavy libs
    const encodedUrl = encodeURIComponent(url);
    const api = `https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${encodedUrl}&choe=UTF-8`;
    setQrUrl(api);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <div className="flex-1 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-white">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Link2 className="w-6 h-6" />
            URL을 QR코드로
          </h2>
          <p className="text-blue-100 opacity-90">학생들에게 공유할 링크를 입력하세요.</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleGenerate} className="flex gap-2 mb-8">
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 p-4 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
              required
            />
            <button
              type="submit"
              className="px-8 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
            >
              생성
            </button>
          </form>

          {qrUrl ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mb-6">
                <img src={qrUrl} alt="Generated QR" className="w-64 h-64 shadow-md" />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors"
                >
                  <Download className="w-5 h-5" /> 이미지 저장
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    alert('링크가 복사되었습니다!');
                  }}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Copy className="w-5 h-5" /> 링크 복사
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-medium">
              링크를 입력하고 생성 버튼을 눌러주세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
