import React from 'react';
import { X, Star, Package, CheckCircle2, Lock } from 'lucide-react';
import { Scanner, BarcodePrinter } from '../types';

interface ProductDetailModalProps {
  selectedProduct: Scanner | BarcodePrinter | null;
  setSelectedProduct: (product: Scanner | BarcodePrinter | null) => void;
  isLoggedIn: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  selectedProduct, 
  setSelectedProduct,
  isLoggedIn
}) => {
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">
        <button 
          onClick={() => setSelectedProduct(null)}
          className="absolute right-4 top-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-10"
        >
          <X size={20} />
        </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-slate-100 flex items-center justify-center p-8 min-h-[300px]">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{selectedProduct.brand}</span>
                  {selectedProduct.isPriority && (
                    <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> SẢN PHẨM ƯU TIÊN BÁN
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">{selectedProduct.name}</h2>
                
                <div className="flex flex-col gap-3 mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase block">Giá bán lẻ</span>
                          <span className="text-xl font-bold text-blue-700">{selectedProduct.retailPrice || 'Liên hệ'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-400 uppercase block">Tình trạng kho</span>
                          <span className="text-lg font-bold text-slate-700 flex items-center gap-1 justify-end">
                            <Package size={18} className="text-blue-500" /> {selectedProduct.stock} {selectedProduct.unit || 'máy'} có sẵn
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-blue-100 flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase block">Giá đại lý</span>
                          <span className="text-lg font-bold text-green-700">{selectedProduct.dealerPrice || 'Liên hệ'}</span>
                        </div>
                        {selectedProduct.notes && (
                          <div className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded font-bold uppercase">
                            {selectedProduct.notes}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="py-4 flex flex-col items-center justify-center gap-3">
                      <div className="text-slate-500 text-sm font-medium italic">Vui lòng liên hệ quản trị viên để biết thêm chi tiết.</div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-500" /> Ưu điểm nổi bật
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {'specialFeatures' in selectedProduct && selectedProduct.specialFeatures && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 uppercase mb-3">Tính năng đặc biệt</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.specialFeatures.map((feature, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-lg font-medium border border-blue-100">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {'accessories' in selectedProduct && selectedProduct.accessories && selectedProduct.accessories.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 uppercase mb-3">Phụ kiện đi kèm</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.accessories.map((acc, i) => (
                          <span key={i} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-lg font-medium border border-green-100">
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase mb-3">Thông số kỹ thuật</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Bảo hành</span>
                        <span className="text-xs text-slate-700 font-medium">{selectedProduct.warranty}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Đơn vị tính</span>
                        <span className="text-xs text-slate-700 font-medium">{selectedProduct.unit}</span>
                      </div>
                      {'type' in selectedProduct ? (
                        <>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Độ phân giải</span>
                            <span className="text-xs text-slate-700 font-medium">{selectedProduct.sensorResolution}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Độ bền</span>
                            <span className="text-xs text-slate-700 font-medium">{selectedProduct.durability}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Tốc độ in</span>
                            <span className="text-xs text-slate-700 font-medium">{selectedProduct.speed} ips</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Độ phân giải</span>
                            <span className="text-xs text-slate-700 font-medium">{selectedProduct.resolution}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg col-span-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Cổng kết nối</span>
                            <span className="text-xs text-slate-700 font-medium">{selectedProduct.connectivity}</span>
                          </div>
                          {selectedProduct.memory && (
                            <div className="p-3 bg-slate-50 rounded-lg col-span-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Bộ nhớ</span>
                              <span className="text-xs text-slate-700 font-medium">{selectedProduct.memory}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    Liên hệ báo giá ngay
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};
