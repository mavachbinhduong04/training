import React from 'react';
import { LayoutDashboard, Scan, Printer, Layers, GraduationCap, Wrench } from 'lucide-react';
import { Category } from '../types';
import { SCANNERS, PRINTERS, PRINTER_ACCESSORIES, RIBBONS, LESSONS } from '../data';

interface DashboardProps {
  setActiveTab: (tab: Category) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Chào mừng đến với Sales Hub</h2>
          <p className="text-blue-100 max-w-lg">Hệ thống hỗ trợ kinh doanh và đào tạo chuyên sâu cho đội ngũ Mã Vạch Bình Dương.</p>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setActiveTab('scanners')} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">Xem Máy Quét</button>
            <button onClick={() => setActiveTab('training')} className="bg-blue-500/30 backdrop-blur-sm text-white border border-blue-400/30 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-500/50 transition-colors">Bắt đầu Đào tạo</button>
          </div>
        </div>
        <LayoutDashboard className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white/10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Máy Quét', count: SCANNERS.length, icon: <Scan className="text-blue-600" />, tab: 'scanners' },
          { label: 'Máy In', count: PRINTERS.length, icon: <Printer className="text-green-600" />, tab: 'printers' },
          { label: 'Linh kiện máy in', count: PRINTER_ACCESSORIES.length, icon: <Wrench className="text-amber-600" />, tab: 'printerAccessories' },
          { label: 'Mực In', count: RIBBONS.length, icon: <Layers className="text-orange-600" />, tab: 'ribbons' },
          { label: 'Bài học', count: LESSONS.length, icon: <GraduationCap className="text-purple-600" />, tab: 'training' },
        ].map((stat, i) => (
          <button 
            key={i} 
            onClick={() => setActiveTab(stat.tab as Category)}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">{stat.icon}</div>
              <span className="text-2xl font-bold text-slate-800">{stat.count}</span>
            </div>
            <div className="text-sm font-medium text-slate-500">{stat.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
