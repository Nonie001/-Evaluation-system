// components/BehaviorSection.tsx

import { UseFormRegister } from 'react-hook-form';
import { EvaluationData } from '@/lib/types';
import { Users } from 'lucide-react';

interface Props {
  register: UseFormRegister<EvaluationData>;
}

const behaviorItems = [
  { key: 'discipline', label: '2.2.1 การปฏิบัติตามระเบียบ วินัย ตรงต่อเวลา' },
  { key: 'learning', label: '2.2.2 ความสามารถในการเรียนรู้งาน' },
  { key: 'creativity', label: '2.2.3 ความคิดริเริ่มสร้างสรรค์' },
  { key: 'cooperation', label: '2.2.4 ความร่วมมือ การประสานงาน การมีส่วนร่วม' },
  { key: 'volunteer', label: '2.2.5 ความมีจิตอาสา ช่วยเหลือผู้อื่น' },
  { key: 'generosity', label: '2.2.6 ความเอื้อเฟื้อเผื่อแผ่' },
  { key: 'relationship', label: '2.2.7 ความมีมนุษยสัมพันธ์' },
  { key: 'dedication', label: '2.2.8 ความเสียสละและอุทิศเวลาให้กับงาน' },
  { key: 'enthusiasm', label: '2.2.9 ความกระตือรือร้น ความมานะพยายาม' },
  { key: 'decision', label: '2.2.10 การตัดสินใจและการแก้ปัญหา' }
];

export default function BehaviorSection({ register }: Props) {
  return (
    <div className="space-y-4">
      <div className="evaluation-grid">
        {behaviorItems.map((item, index) => (
          <div key={item.key} className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-purple-600">{index + 1}</span>
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
                    {...register(`behavior.${item.key as keyof EvaluationData['behavior']}`, {
                      valueAsNumber: true,
                      min: 1,
                      max: 10
                    })}
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={10}
                    className="w-16 h-8 border border-gray-300 rounded-lg text-center font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-white"
                  />
                  <span className="text-xs font-medium text-gray-400">/10</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-white">!</span>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-900 mb-1">หมายเหตุการให้คะแนน</p>
            <p className="text-sm text-purple-800">
              ให้คะแนนในแต่ละหัวข้อ โดย <span className="font-semibold">1 = น้อยที่สุด</span>, <span className="font-semibold">10 = มากที่สุด</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}