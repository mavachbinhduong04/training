import React, { useState } from 'react';
import { Filter, Thermometer, Zap, Star, Package, Info, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { PRINTERS } from '../data';
import { BarcodePrinter } from '../types';
import { checkPriceRange } from '../lib/utils';

interface PrintersProps {
  setSelectedProduct: (product: BarcodePrinter) => void;
}

export const Printers: React.FC<PrintersProps> = ({ setSelectedProduct }) => {
  const [filters, setFilters] = useState({
    directThermal: false,
    speedRange: 'All',
    resolution: 'All',
    volumeType: 'All',
    brand: 'All',
    priceRange: 'All'
  });

  const filteredPrinters = PRINTERS.filter(p => {
    if (filters.directThermal && !p.isDirectThermal) return false;
    
    // Speed filter
    if (filters.speedRange !== 'All') {
      const minSpeed = parseInt(filters.speedRange);
      if (p.speed < minSpeed) return false;
    }

    // Resolution filter
    if (filters.resolution !== 'All' && !p.resolution.includes(filters.resolution)) return false;

    // Volume type filter
    if (filters.volumeType !== 'All' && !p.volume.includes(filters.volumeType)) return false;

    if (filters.brand !== 'All' && p.brand !== filters.brand) return false;
    if (!checkPriceRange(p.retailPrice, filters.priceRange)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">So sánh Máy In Mã Vạch</h2>
          <p className="text-sm text-slate-500">Tìm kiếm và lọc thiết bị phù hợp với nhu cầu của bạn.</p>
        </div>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium self-start">
          {filteredPrinters.length} sản phẩm
        </span>
      </div>

      {/* Filter UI */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mr-2">
          <Filter size={16} className="text-green-600" />
          Bộ lọc:
        </div>
        
        <button 
          onClick={() => setFilters(prev => ({ ...prev, directThermal: !prev.directThermal }))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
            filters.directThermal 
              ? 'bg-green-600 text-white shadow-md' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Thermometer size={14} />
          In nhiệt trực tiếp
        </button>

        <select 
          value={filters.speedRange}
          onChange={(e) => setFilters(prev => ({ ...prev, speedRange: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-green-200"
        >
          <option value="All">Tất cả tốc độ</option>
          <option value="4">4+ ips</option>
          <option value="8">8+ ips</option>
          <option value="12">12+ ips</option>
        </select>

        <select 
          value={filters.resolution}
          onChange={(e) => setFilters(prev => ({ ...prev, resolution: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-green-200"
        >
          <option value="All">Độ phân giải</option>
          <option value="203">203 DPI</option>
          <option value="300">300 DPI</option>
          <option value="600">600 DPI</option>
        </select>

        <select 
          value={filters.volumeType}
          onChange={(e) => setFilters(prev => ({ ...prev, volumeType: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-green-200"
        >
          <option value="All">Loại máy</option>
          <option value="Để bàn">Để bàn</option>
          <option value="Công nghiệp">Công nghiệp</option>
        </select>

        <div className="h-6 w-px bg-slate-200 mx-2" />

        <select 
          value={filters.brand}
          onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-green-200"
        >
          <option value="All">Tất cả thương hiệu</option>
          <option value="HPRT">HPRT</option>
          <option value="Zebra">Zebra</option>
          <option value="Honeywell">Honeywell</option>
          <option value="Godex">Godex</option>
          <option value="TSC">TSC</option>
        </select>

        <select 
          value={filters.priceRange}
          onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-green-200"
        >
          <option value="All">Tất cả mức giá</option>
          <option value="Under 5M">Dưới 5 triệu</option>
          <option value="5M - 10M">5 - 10 triệu</option>
          <option value="Over 10M">Trên 10 triệu</option>
        </select>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-700">Sản phẩm</th>
                <th className="p-4 font-semibold text-slate-700">Khổ rộng in</th>
                <th className="p-4 font-semibold text-slate-700">Độ phân giải</th>
                <th className="p-4 font-semibold text-slate-700">Tốc độ (ips)</th>
                <th className="p-4 font-semibold text-slate-700">Cổng kết nối</th>
                <th className="p-4 font-semibold text-slate-700">Bộ nhớ</th>
                <th className="p-4 font-semibold text-slate-700">Giá Tham Khảo</th>
                <th className="p-4 font-semibold text-slate-700">Tồn kho</th>
                <th className="p-4 font-semibold text-slate-700">In nhiệt trực tiếp</th>
                <th className="p-4 font-semibold text-slate-700">Khối lượng in</th>
                <th className="p-4 font-semibold text-slate-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrinters.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded p-1 flex items-center justify-center">
                        <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-1">
                          {p.name}
                          {p.isPriority && <Star size={12} className="text-amber-500" fill="currentColor" />}
                        </div>
                        <div className="text-[10px] font-bold text-green-600 uppercase tracking-tight">{p.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{p.width}</td>
                  <td className="p-4 text-sm text-slate-600">{p.resolution}</td>
                  <td className="p-4 text-sm text-slate-600 font-bold">{p.speed} ips</td>
                  <td className="p-4 text-sm text-slate-600">{p.connectivity}</td>
                  <td className="p-4 text-sm text-slate-600">{p.memory || '-'}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-blue-700">{p.retailPrice}</span>
                      <span className="text-[10px] font-bold text-green-700">{p.dealerPrice}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                      <Package size={14} className="text-blue-500" /> {p.stock}
                    </div>
                  </td>
                  <td className="p-4">
                    {p.isDirectThermal ? (
                      <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded font-bold uppercase">Có</span>
                    ) : (
                      <span className="text-[10px] bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase">Không</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-slate-500 italic">{p.volume}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedProduct(p)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Info size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid View for Mobile/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrinters.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
            <div className="h-48 bg-slate-50 flex items-center justify-center p-6 relative">
              <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
              {p.isPriority && (
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={10} fill="currentColor" /> ƯU TIÊN
                </div>
              )}
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-slate-100">
                <Package size={10} /> KHO: {p.stock}
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{p.brand}</span>
                  <h3 className="text-lg font-bold text-slate-800">{p.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-blue-700 font-bold text-xs">{p.retailPrice}</div>
                  <div className="text-green-700 font-bold text-[10px]">{p.dealerPrice}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 my-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 size={14} className="text-green-500" /> {p.resolution}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Zap size={14} className="text-amber-500" /> {p.speed} ips
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedProduct(p)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg font-bold text-sm hover:bg-green-600 hover:text-white transition-all"
                >
                  Chi tiết
                </button>
                <button className="px-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
