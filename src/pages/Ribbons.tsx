import React, { useState } from 'react';
import { RIBBONS } from '../data';
import { Filter, Search, Tag, Info, CheckCircle2, ChevronRight, Package, Star } from 'lucide-react';

export const Ribbons: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [adhesionFilter, setAdhesionFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');

  const filteredRibbons = RIBBONS.filter(r => {
    const matchesType = typeFilter === 'All' || r.type === typeFilter;
    const matchesAdhesion = adhesionFilter === 'All' || r.adhesion?.includes(adhesionFilter);
    
    let matchesMaterial = true;
    if (materialFilter !== 'All') {
      matchesMaterial = r.material.toLowerCase().includes(materialFilter.toLowerCase());
    }

    return matchesType && matchesAdhesion && matchesMaterial;
  });

  const getColorClass = (color: string) => {
    const c = color.toLowerCase();
    if (c.includes('black') || c.includes('đen')) return 'bg-slate-900';
    if (c.includes('blue') || c.includes('xanh dương')) return 'bg-blue-600';
    if (c.includes('red') || c.includes('đỏ')) return 'bg-red-600';
    if (c.includes('green') || c.includes('xanh lá')) return 'bg-green-600';
    if (c.includes('gold') || c.includes('vàng')) return 'bg-amber-400';
    if (c.includes('silver') || c.includes('bạc')) return 'bg-slate-300';
    if (c.includes('white') || c.includes('trắng')) return 'bg-white border border-slate-200';
    return 'bg-slate-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:items-center md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Danh mục Mực In (Ribbon)</h2>
          <p className="text-sm text-slate-500">Các loại mực in phổ biến cho máy in tem nhãn.</p>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium self-start">
          {filteredRibbons.length} sản phẩm
        </span>
      </div>

      {/* Filter UI */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mr-2">
          <Filter size={16} className="text-blue-600" />
          Bộ lọc:
        </div>

        <select 
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="All">Tất cả loại mực</option>
          <option value="Wax">Mực Wax</option>
          <option value="Wax/Resin">Mực Wax/Resin</option>
          <option value="Resin">Mực Resin</option>
        </select>

        <select 
          value={adhesionFilter}
          onChange={(e) => setAdhesionFilter(e.target.value)}
          className="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="All">Tất cả độ bám</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Tốt">Tốt</option>
          <option value="Rất tốt">Rất tốt</option>
        </select>

        <select 
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
          className="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="All">Tất cả vật liệu in</option>
          <option value="thường">Decal thường (Giấy)</option>
          <option value="PVC">Decal PVC (Nhựa)</option>
          <option value="xi bạc">Decal Xi bạc</option>
          <option value="vải">Nhãn vải (Ruban)</option>
          <option value="OPP">Màng OPP</option>
        </select>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-700 text-sm">Sản phẩm</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Loại</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Vật liệu in</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Quy cách</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Màu sắc</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Độ bám</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Ghi chú</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRibbons.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded p-1 flex items-center justify-center">
                        <img src={r.imageUrl} alt={r.name} className="max-w-full max-h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{r.name}</div>
                        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">{r.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      r.type === 'Wax' ? 'bg-blue-50 text-blue-600' : 
                      r.type === 'Wax/Resin' ? 'bg-purple-50 text-purple-600' : 
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {r.type}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-600 font-medium">
                    {r.material}
                  </td>
                  <td className="p-4 text-sm text-slate-600">{r.spec}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getColorClass(r.color)} shadow-sm`} />
                      <span className="text-sm text-slate-600">{r.color}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <CheckCircle2 size={12} className="text-green-500" /> {r.adhesion}
                    </div>
                  </td>
                  <td className="p-4">
                    {r.notes && (
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded whitespace-nowrap">
                        {r.notes}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Info size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid View for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
        {filteredRibbons.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row">
            <div className="sm:w-1/3 bg-slate-50 flex items-center justify-center p-4 border-b sm:border-b-0 sm:border-r border-slate-100">
              <img src={r.imageUrl} alt={r.name} className="max-w-full max-h-32 object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
            </div>
            
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{r.sku}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      r.type === 'Wax' ? 'bg-blue-50 text-blue-600' : 
                      r.type === 'Wax/Resin' ? 'bg-purple-50 text-purple-600' : 
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {r.type}
                    </span>
                  </div>
                  <h3 className="text-md font-bold text-slate-800">{r.name}</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-[10px] text-slate-500">
                  <span className="font-bold block text-slate-400 uppercase">Quy cách</span>
                  {r.spec}
                </div>
                <div className="text-[10px] text-slate-500">
                  <span className="font-bold block text-slate-400 uppercase">Màu sắc</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${getColorClass(r.color)} shadow-sm`} />
                    {r.color}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-slate-100 text-slate-700 py-1.5 rounded-lg font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
