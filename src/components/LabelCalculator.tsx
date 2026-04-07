import React, { useState, useEffect } from 'react';
import { Calculator, Ruler, Layers, Info, ArrowRightLeft } from 'lucide-react';

export const LabelCalculator: React.FC = () => {
  const [rollLength, setRollLength] = useState<number>(50); // meters
  const [labelHeight, setLabelHeight] = useState<number>(50); // mm
  const [gap, setGap] = useState<number>(3); // mm
  const [labelsPerRoll, setLabelsPerRoll] = useState<number>(0);

  const [targetLabels, setTargetLabels] = useState<number>(1000);
  const [requiredMeters, setRequiredMeters] = useState<number>(0);

  useEffect(() => {
    // Calculate labels from meters
    // Formula: Labels = (Meters * 1000) / (Height + GAP)
    const calculatedLabels = (rollLength * 1000) / (labelHeight + gap);
    setLabelsPerRoll(Math.floor(calculatedLabels));
  }, [rollLength, labelHeight, gap]);

  useEffect(() => {
    // Calculate meters from labels
    // Formula: Meters = (Labels * (Height + GAP)) / 1000
    const calculatedMeters = (targetLabels * (labelHeight + gap)) / 1000;
    setRequiredMeters(Number(calculatedMeters.toFixed(2)));
  }, [targetLabels, labelHeight, gap]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-900 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="text-blue-400" size={24} />
          <h3 className="text-xl font-bold">Công cụ Tính toán Tem nhãn</h3>
        </div>
        <p className="text-slate-400 text-sm">Quy đổi nhanh giữa mét dài và số lượng tem cho Sales.</p>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Ruler size={14} /> Chiều cao tem (mm)
              </label>
              <input 
                type="number" 
                value={labelHeight}
                onChange={(e) => setLabelHeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <ArrowRightLeft size={14} /> Khoảng cách GAP (mm)
              </label>
              <input 
                type="number" 
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                1. Tính số tem từ mét dài
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input 
                    type="number" 
                    value={rollLength}
                    onChange={(e) => setRollLength(Number(e.target.value))}
                    className="w-full bg-white border border-blue-200 rounded-lg pl-4 pr-10 py-2 text-slate-800 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">m</span>
                </div>
                <div className="text-blue-600 font-bold">➔</div>
                <div className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-center">
                  {labelsPerRoll.toLocaleString()} tem
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                2. Tính mét dài từ số tem
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input 
                    type="number" 
                    value={targetLabels}
                    onChange={(e) => setTargetLabels(Number(e.target.value))}
                    className="w-full bg-white border border-blue-200 rounded-lg pl-4 pr-10 py-2 text-slate-800 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">tem</span>
                </div>
                <div className="text-blue-600 font-bold">➔</div>
                <div className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-center">
                  {requiredMeters.toLocaleString()} m
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <Info className="text-amber-500 shrink-0" size={18} />
            <p className="text-xs text-amber-700 leading-relaxed">
              <span className="font-bold">Công thức:</span> Số tem = Chiều dài (m) * 1000 / (Chiều cao tem + GAP). 
              <br />GAP thông thường là 3mm.
            </p>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Minh họa & Lõi giấy</h4>
          <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center p-4">
             {/* SVG Illustration of a label roll */}
             <svg viewBox="0 0 400 200" className="w-full h-full max-w-[300px]">
                {/* Roll core */}
                <circle cx="100" cy="100" r="30" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="100" cy="100" r="20" fill="#e2e8f0" />
                
                {/* Roll body */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="#3b82f6" strokeWidth="4" />
                
                {/* Labels coming out */}
                <path d="M100 30 L350 30" stroke="#3b82f6" strokeWidth="2" fill="none" />
                
                {/* Label 1 */}
                <rect x="150" y="20" width="60" height="20" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                {/* GAP */}
                <line x1="210" y1="30" x2="216" y2="30" stroke="#ef4444" strokeWidth="2" />
                {/* Label 2 */}
                <rect x="216" y="20" width="60" height="20" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                {/* GAP */}
                <line x1="276" y1="30" x2="282" y2="30" stroke="#ef4444" strokeWidth="2" />
                {/* Label 3 */}
                <rect x="282" y="20" width="60" height="20" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />

                {/* Dimensions */}
                <text x="180" y="55" fontSize="10" fill="#64748b" textAnchor="middle">Chiều dài tem</text>
                <text x="213" y="15" fontSize="8" fill="#ef4444" textAnchor="middle">GAP</text>
                <text x="350" y="35" fontSize="10" fill="#3b82f6">Hướng quấn</text>
             </svg>
             <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-slate-500 border border-slate-200">
               MINH HỌA QUY CÁCH
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="text-blue-600" size={16} />
                <span className="text-xs font-bold text-slate-700">Lõi 1 inch (25mm)</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Dùng cho máy in để bàn (Desktop). Cuộn tối đa 50m.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="text-green-600" size={16} />
                <span className="text-xs font-bold text-slate-700">Lõi 3 inch (76mm)</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Dùng cho máy in công nghiệp. Cuộn 100m - 150m.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
