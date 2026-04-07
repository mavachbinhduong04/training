import React, { useState } from 'react';
import { Filter, Wifi, Maximize, Smartphone, Star, Package, Info, AlertCircle, Search } from 'lucide-react';
import { SCANNERS } from '../data';
import { Scanner } from '../types';
import { checkPriceRange } from '../lib/utils';

interface ScannersProps {
  setSelectedProduct: (product: Scanner) => void;
}

export const Scanners: React.FC<ScannersProps> = ({ setSelectedProduct }) => {
  const [filters, setFilters] = useState({
    connectionType: 'All',
    longRange: false,
    pda: false,
    brand: 'All',
    priceRange: 'All',
    accessory: 'All',
    stockStatus: 'All' // ✅ Thêm bộ lọc tồn kho
  });

  const allAccessories = Array.from(new Set(SCANNERS.flatMap(s => s.accessories || []))).sort();

  const filteredScanners = SCANNERS.filter(s => {
    if (filters.connectionType === 'Wireless' && !s.isWireless) return false;
    if (filters.connectionType === 'Wired' && s.isWireless) return false;
    if (filters.longRange && !s.isLongRange) return false;
    if (filters.pda && !s.isPDA) return false;
    if (filters.brand !== 'All' && s.brand !== filters.brand) return false;
    if (!checkPriceRange(s.retailPrice, filters.priceRange)) return false;
    if (filters.accessory !== 'All' && !s.accessories?.includes(filters.accessory)) return false;
    
    // ✅ Logic lọc tồn kho
    if (filters.stockStatus === 'InStock' && s.stock <= 0) return false;
    if (filters.stockStatus === 'LowStock' && (s.stock <= 0 || s.stock >= 10)) return false;
    if (filters.stockStatus === 'OutOfStock' && s.stock > 0) return false;
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">So sánh Máy Quét Mã Vạch</h2>
          <p className="text-sm text-slate-500">Tìm kiếm và lọc thiết bị phù hợp với nhu cầu của bạn.</p>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium self-start">
          {filteredScanners.length} sản phẩm
        </span>
      </div>

      {/* Filter UI */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mr-2">
          <Filter size={16} className="text-blue-600" />
          Bộ lọc:
        </div>
        
        <select 
          value={filters.connectionType}
          onChange={(e) => setFilters(prev => ({ ...prev, connectionType: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="All">Tất cả kết nối</option>
          <option value="Wired">Có dây</option>
          <option value="Wireless">Không dây</option>
        </select>

        <button 
          onClick={() => setFilters(prev => ({ ...prev, longRange: !prev.longRange }))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
            filters.longRange 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Maximize size={14} />
          Quét tầm xa
        </button>

        <button 
          onClick={() => setFilters(prev => ({ ...prev, pda: !prev.pda }))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
            filters.pda 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Smartphone size={14} />
          PDA
        </button>

        <div className="h-6 w-px bg-slate-200 mx-2" />

        <select 
          value={filters.brand}
          onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="All">Tất cả thương hiệu</option>
          <option value="Zebra">Zebra</option>
          <option value="Honeywell">Honeywell</option>
          <option value="iData">iData</option>
          <option value="Syble">Syble</option>
          <option value="Mobydata">Mobydata</option>
        </select>

        <select 
          value={filters.priceRange}
          onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="All">Tất cả mức giá</option>
          <option value="Under 2M">Dưới 2 triệu</option>
          <option value="2M - 5M">2 - 5 triệu</option>
          <option value="5M - 10M">5 - 10 triệu</option>
          <option value="Over 10M">Trên 10 triệu</option>
        </select>

        {/* ✅ Dropdown lọc tồn kho */}
        <select 
          value={filters.stockStatus}
          onChange={(e) => setFilters(prev => ({ ...prev, stockStatus: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="All">Tất cả tồn kho</option>
          <option value="InStock">Còn hàng (&gt;0)</option>
          <option value="LowStock">Sắp hết (&lt;10)</option>
          <option value="OutOfStock">Hết hàng (0)</option>
        </select>

        <select 
          value={filters.accessory}
          onChange={(e) => setFilters(prev => ({ ...prev, accessory: e.target.value }))}
          className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="All">Tất cả phụ kiện</option>
          {allAccessories.map(acc => (
            <option key={acc} value={acc}>{acc}</option>
          ))}
        </select>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-700">Sản phẩm</th>
                <th className="p-4 font-semibold text-slate-700">Loại</th>
                <th className="p-4 font-semibold text-slate-700">Màn hình</th>
                <th className="p-4 font-semibold text-slate-700">RAM/ROM</th>
                <th className="p-4 font-semibold text-slate-700">Độ phân giải</th>
                <th className="p-4 font-semibold text-slate-700">Độ bền (IP)</th>
                <th className="p-4 font-semibold text-slate-700">Kết nối</th>
                <th className="p-4 font-semibold text-slate-700">Giá Tham Khảo</th>
                <th className="p-4 font-semibold text-slate-700">Phụ kiện</th>
                <th className="p-4 font-semibold text-slate-700">Tồn kho</th>
                <th className="p-4 font-semibold text-slate-700">Tính năng</th>
                <th className="p-4 font-semibold text-slate-700">Ứng dụng</th>
                <th className="p-4 font-semibold text-slate-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredScanners.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded p-1 flex items-center justify-center">
                        <img src={s.imageUrl} alt={s.name} className="max-w-full max-h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-1">
                          {s.name}
                          {s.isPriority && <Star size={12} className="text-amber-500" fill="currentColor" />}
                        </div>
                        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">{s.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{s.type}</td>
                  <td className="p-4 text-sm text-slate-600">{s.isPDA ? s.screenSize : '-'}</td>
                  <td className="p-4 text-sm text-slate-600">{s.isPDA ? s.ram : '-'}</td>
                  <td className="p-4 text-sm text-slate-600">{s.sensorResolution}</td>
                  <td className="p-4 text-sm text-slate-600">{s.durability}</td>
                  <td className="p-4 text-sm text-slate-600">
                    {s.isWireless ? (
                      <span className="flex items-center gap-1 text-blue-600 font-medium">
                        <Wifi size={14} /> Không dây
                      </span>
                    ) : (
                      <span className="text-slate-500">Có dây</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-blue-700">{s.retailPrice}</span>
                      <span className="text-[10px] font-bold text-green-700">{s.dealerPrice}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {s.accessories?.map((acc, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                          {acc}
                        </span>
                      )) || <span className="text-slate-400 text-xs">-</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`flex items-center gap-1 text-sm font-medium ${s.stock === 0 ? 'text-red-600' : s.stock < 10 ? 'text-amber-600' : 'text-slate-700'}`}>
                      <Package size={14} /> {s.stock}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {s.specialFeatures?.map((feature, i) => (
                        <span key={i} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-500 italic">{s.application}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedProduct(s)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
        {filteredScanners.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
            <div className="h-48 bg-slate-50 flex items-center justify-center p-6 relative">
              <img src={s.imageUrl} alt={s.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
              {s.isPriority && (
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={10} fill="currentColor" /> ƯU TIÊN
                </div>
              )}
              <div className={`absolute top-3 right-3 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border shadow-sm ${
                s.stock === 0 
                  ? 'bg-red-100 text-red-700 border-red-200' 
                  : s.stock < 10 
                    ? 'bg-amber-100 text-amber-700 border-amber-200' 
                    : 'bg-white/80 text-slate-600 border-slate-100'
              }`}>
                <Package size={10} /> KHO: {s.stock}
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{s.brand}</span>
                  <h3 className="text-lg font-bold text-slate-800">{s.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-blue-700 font-bold text-xs">{s.retailPrice}</div>
                  <div className="text-green-700 font-bold text-[10px]">{s.dealerPrice}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 my-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  {s.isWireless ? <Wifi size={14} className="text-blue-500" /> : <Package size={14} className="text-slate-400" />}
                  {s.isWireless ? 'Không dây' : 'Có dây'}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <AlertCircle size={14} className="text-blue-500" /> {s.durability}
                </div>
              </div>

              {s.isPDA && (
                <div className="bg-blue-50/50 p-2 rounded-lg mb-4 grid grid-cols-2 gap-2 border border-blue-100">
                  <div className="text-[10px] text-slate-500">
                    <span className="font-bold block text-blue-700">Màn hình:</span>
                    {s.screenSize}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    <span className="font-bold block text-blue-700">RAM/ROM:</span>
                    {s.ram}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {s.specialFeatures?.slice(0, 2).map((feature, i) => (
                  <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">
                    {feature}
                  </span>
                ))}
              </div>

              {s.accessories && s.accessories.length > 0 && (
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Phụ kiện:</span>
                  <div className="flex flex-wrap gap-1">
                    {s.accessories.map((acc, i) => (
                      <span key={i} className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedProduct(s)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 hover:text-white transition-all"
                >
                  Chi tiết
                </button>
                <button className="px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
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
