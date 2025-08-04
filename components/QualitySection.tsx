// components/QualitySection.tsx

import { UseFormRegister } from 'react-hook-form';
import { EvaluationData } from '@/lib/types';
import { Award } from 'lucide-react';

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
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-center gap-3 mb-8">
        <Award className="w-6 h-6 text-gray-600" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">การประเมินด้านคุณภาพ</h3>
          <p className="text-gray-600">Quality Assessment</p>
        </div>
      </div>

      <div className="space-y-6">
        {qualityItems.map((item, index) => (
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
                {...register(`quality.${item.key as keyof EvaluationData['quality']}`, {
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
