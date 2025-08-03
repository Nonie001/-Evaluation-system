// components/QualitySection.tsx

import { UseFormRegister } from 'react-hook-form';
import { EvaluationData } from '@/lib/types';
import { Star } from 'lucide-react';

interface Props {
  register: UseFormRegister<EvaluationData>;
}

const qualityItems = [
  { key: 'goalAchievement', label: '2.1.1 งานสำเร็จตามเป้าหมาย' },
  { key: 'skills', label: '2.1.2 ทักษะ ความรู้ ที่จำเป็นต่อการทำงาน' },
  { key: 'understanding', label: '2.1.3 ความรู้ความเข้าใจในการปฏิบัติงาน' },
  { key: 'accuracy', label: '2.1.4 ความละเอียดรอบคอบ ความถูกต้องของงาน' },
  { key: 'speed', label: '2.1.5 ความรวดเร็ว งานที่ทำเสร็จสิ้นในระยะเวลาที่กำหนด' }
];

export default function QualitySection({ register }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {qualityItems.map((item, index) => (
          <div key={item.key} className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-emerald-600">{index + 1}</span>
                  </div>
                  <label className="text-sm text-gray-700 cursor-pointer leading-relaxed group-hover:text-gray-900 transition-colors">
                    {item.label}
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-end">
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm">
                  <span className="text-xs font-medium text-gray-500">คะแนน:</span>
                  <input
                    {...register(`quality.${item.key as keyof EvaluationData['quality']}`, {
                      valueAsNumber: true,
                      min: 1,
                      max: 10
                    })}
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={10}
                    className="w-16 h-8 border border-gray-300 rounded-lg text-center font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white"
                  />
                  <span className="text-xs font-medium text-gray-400">/10</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-white">!</span>
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-900 mb-1">หมายเหตุการให้คะแนน</p>
            <p className="text-sm text-emerald-800">
              ให้คะแนนในแต่ละหัวข้อ โดย <span className="font-semibold">1 = น้อยที่สุด</span>, <span className="font-semibold">10 = มากที่สุด</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}