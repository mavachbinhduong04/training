import React from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  Printer, 
  Layers, 
  GraduationCap, 
  Wrench,
  Menu, 
  X 
} from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  activeTab: Category;
  setActiveTab: (tab: Category) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    <Icon size={20} />
    {label && <span className="font-medium">{label}</span>}
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  setIsSidebarOpen 
}) => {
  return (
    <aside 
      className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-full z-30`}
    >
      <div className="p-6 flex items-center justify-between">
        {isSidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">M</div>
            <span className="font-bold text-lg tracking-tight text-blue-900">Mã Vạch BD</span>
          </div>
        )}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-2 mt-4">
        <SidebarItem 
          icon={LayoutDashboard} 
          label={isSidebarOpen ? "Tổng quan" : ""} 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
        />
        <SidebarItem 
          icon={Scan} 
          label={isSidebarOpen ? "Máy quét" : ""} 
          active={activeTab === 'scanners'} 
          onClick={() => setActiveTab('scanners')} 
        />
        <SidebarItem 
          icon={Printer} 
          label={isSidebarOpen ? "Máy in" : ""} 
          active={activeTab === 'printers'} 
          onClick={() => setActiveTab('printers')} 
        />
        <SidebarItem 
          icon={Wrench} 
          label={isSidebarOpen ? "Linh kiện máy in" : ""} 
          active={activeTab === 'printerAccessories'} 
          onClick={() => setActiveTab('printerAccessories')} 
        />
        <SidebarItem 
          icon={Layers} 
          label={isSidebarOpen ? "Mực in" : ""} 
          active={activeTab === 'ribbons'} 
          onClick={() => setActiveTab('ribbons')} 
        />
        <div className="pt-4 mt-4 border-t border-slate-100">
          <SidebarItem 
            icon={GraduationCap} 
            label={isSidebarOpen ? "Đào tạo Sales" : ""} 
            active={activeTab === 'training'} 
            onClick={() => setActiveTab('training')} 
          />
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">S</div>
          {isSidebarOpen && (
            <div>
              <div className="text-sm font-bold">Đội ngũ Sales</div>
              <div className="text-xs text-slate-400">Văn phòng Bình Dương</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
