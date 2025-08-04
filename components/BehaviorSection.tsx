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
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-6 h-6 text-gray-600" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">การประเมินด้านพฤติกรรม</h3>
          <p className="text-gray-600">Behavior Assessment</p>
        </div>
      </div>

      <div className="space-y-6">
        {behaviorItems.map((item, index) => (
          <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-b-0">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-gray-200 text-gray-700 text-xs font-medium rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <label className="text-sm text-gray-700 leading-relaxed">
                  {item.label}
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">คะแนน:</span>
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
                className="w-16 px-2 py-1 border border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              />
              <span className="text-xs text-gray-400">/10</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
        <p className="text-sm text-gray-700">
          <strong>หมายเหตุ:</strong> ให้คะแนนในแต่ละหัวข้อ โดย 1 = น้อยที่สุด, 10 = มากที่สุด
        </p>
      </div>
    </div>
  );
}
