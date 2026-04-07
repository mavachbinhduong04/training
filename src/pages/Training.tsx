import React from 'react';
import { ChevronRight } from 'lucide-react';
import { LESSONS } from '../data';
import { LabelCalculator } from '../components/LabelCalculator';

export const Training: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Đào tạo Sales Chuyên sâu</h2>
          <p className="text-sm text-slate-500">Nâng cao kiến thức để tư vấn khách hàng hiệu quả hơn.</p>
        </div>
      </div>

      {/* Label Calculator Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-600 rounded-full" />
          <h3 className="text-lg font-bold text-slate-800">Công cụ hỗ trợ Sales</h3>
        </div>
        <LabelCalculator />
      </section>

      {/* Lessons Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-600 rounded-full" />
          <h3 className="text-lg font-bold text-slate-800">Bài học & Kiến thức</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LESSONS.map((lesson) => (
            <div 
              key={lesson.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {lesson.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{lesson.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{lesson.description}</p>
                  <div className="space-y-2">
                    {lesson.content.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                        <ChevronRight size={14} className="text-blue-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
