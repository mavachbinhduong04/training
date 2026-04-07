import React, { useState } from 'react';
import { Filter, Wrench, Info, Package } from 'lucide-react';
import { PRINTER_ACCESSORIES } from '../data';

export const PrinterAccessories: React.FC = () => {
  const [filters, setFilters] = useState({
    category: 'All',
    compatibility: 'All'
  });

  const categories = Array.from(new Set(PRINTER_ACCESSORIES.map(item => item.category))).sort();
  const compatibilities = Array.from(new Set(PRINTER_ACCESSORIES.flatMap(item => item.compatibility))).sort();

  const filteredAccessories = PRINTER_ACCESSORIES.filter((item) => {
    if (filters.category !== 'All' && item.category !== filters.category) return false;
    if (filters.compatibility !== 'All' && !item.compatibility.includes(filters.compatibility)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Linh kiện Máy In</h2>
          <p className="text-sm text-slate-500">Danh sách linh kiện, phụ tùng và vật tư dành cho máy in mã vạch.</p>
        </div>
        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium self-start">
          {filteredAccessories.length} mục
        </span>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mr-2">
          <Filter size={16} className="text-amber-600" />
          Bộ lọc:
        </div>

        <select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-amber-200"
        >
          <option value="All">Tất cả loại linh kiện</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filters.compatibility}
          onChange={(e) => setFilters(prev => ({ ...prev, compatibility: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-amber-200"
        >
          <option value="All">Tất cả thiết bị tương thích</option>
          {compatibilities.map((compat) => (
            <option key={compat} value={compat}>{compat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAccessories.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="h-52 bg-slate-50 flex items-center justify-center p-6">
              <img src={item.imageUrl} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">{item.category}</div>
                  <h3 className="text-lg font-bold text-slate-800 mt-2">{item.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-[10px] uppercase">Kho</div>
                  <div className="text-slate-800 font-bold">{item.stock}</div>
                </div>
              </div>

              <p className="text-sm text-slate-600 min-h-[54px]">{item.description}</p>

              <div className="grid grid-cols-2 gap-3 text-sm text-slate-500">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-[10px] uppercase text-slate-400">Giá</div>
                  <div className="font-bold text-slate-800 mt-1">{item.price}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-[10px] uppercase text-slate-400">Tương thích</div>
                  <div className="text-slate-800 mt-1">{item.compatibility.slice(0, 2).join(', ')}{item.compatibility.length > 2 ? '...' : ''}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
                {item.compatibility.map((compat, i) => (
                  <span key={i} className="bg-slate-100 px-2 py-1 rounded-full">{compat}</span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2">
                <button className="flex items-center gap-2 text-amber-700 font-semibold text-sm hover:text-amber-900 transition-colors">
                  <Info size={16} /> Xem chi tiết
                </button>
                <button className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-2 rounded-xl hover:bg-amber-100 transition-colors">
                  <Package size={16} /> {item.stock > 0 ? 'Mua ngay' : 'Hết hàng'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAccessories.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 shadow-sm">
          <Wrench size={32} className="mx-auto text-amber-500 mb-4" />
          Không tìm thấy linh kiện phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </div>
  );
};
