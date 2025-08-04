// components/EvaluationForm.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileDown, Save } from 'lucide-react';
import { EvaluationData } from '@/lib/types';
import EmployeeInfoSection from './EmployeeInfoSection';
import QualitySection from './QualitySection';
import BehaviorSection from './BehaviorSection';
import ScoreSummary from './ScoreSummary';
import { generatePDF } from '@/lib/pdf-generator';

export default function EvaluationForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<EvaluationData>({
    defaultValues: {
      sickLeave: 0,
      personalLeave: 0,
      otherLeave: 0,
      absent: 0,
      lateFrequency: 'never',
      quality: {
        goalAchievement: 10,
        skills: 10,
        understanding: 10,
        accuracy: 10,
        speed: 10
      },
      behavior: {
        discipline: 10,
        learning: 10,
        creativity: 10,
        cooperation: 10,
        volunteer: 10,
        generosity: 10,
        relationship: 10,
        dedication: 10,
        enthusiasm: 10,
        decision: 10
      },
      additionalComments: ''
    }
  });

  const formData = watch();

  const onSubmit = async (data: EvaluationData) => {
    setIsGenerating(true);
    try {
      await generatePDF(data);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        <EmployeeInfoSection register={register} errors={errors} />
        
        <QualitySection register={register} />
        
        <BehaviorSection register={register} />
        
        <ScoreSummary formData={formData} />

        {/* Additional Comments */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">ความเห็นเพิ่มเติม</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ข้อเสนอแนะ
              </label>
              <textarea
                {...register('additionalComments')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none"
                placeholder="ระบุความเห็นเพิ่มเติม หรือข้อเสนอแนะ..."
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อผู้ประเมิน <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('evaluatorName', { required: 'กรุณาระบุชื่อผู้ประเมิน' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  placeholder="ชื่อ-สกุล ผู้ประเมิน"
                />
                {errors.evaluatorName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.evaluatorName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ตำแหน่งผู้ประเมิน <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('evaluatorPosition', { required: 'กรุณาระบุตำแหน่ง' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  placeholder="ตำแหน่งผู้ประเมิน"
                />
                {errors.evaluatorPosition && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.evaluatorPosition.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="text-center py-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-800 text-white font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  กำลังสร้าง PDF...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  ดาวน์โหลด PDF
                </>
              )}
            </button>
            
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
