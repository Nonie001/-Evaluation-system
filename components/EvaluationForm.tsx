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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Employee Information */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            ข้อมูลเจ้าหน้าที่
          </h3>
        </div>
        <div className="p-6">
          <EmployeeInfoSection register={register} errors={errors} />
        </div>
      </div>

      {/* Quality Assessment */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            การประเมินด้านคุณภาพ
          </h3>
        </div>
        <div className="p-6">
          <QualitySection register={register} />
        </div>
      </div>

      {/* Behavior Assessment */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            การประเมินด้านพฤติกรรม
          </h3>
        </div>
        <div className="p-6">
          <BehaviorSection register={register} />
        </div>
      </div>

      {/* Score Summary */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            สรุปผลการประเมิน
          </h3>
        </div>
        <div className="p-6">
          <ScoreSummary formData={formData} />
        </div>
      </div>

      {/* Additional Comments */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            ความเห็นเพิ่มเติม
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <textarea
              {...register('additionalComments')}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all duration-200"
              placeholder="ระบุความเห็นเพิ่มเติม หรือข้อเสนอแนะ..."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อผู้ประเมิน <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('evaluatorName', { required: 'กรุณาระบุชื่อผู้ประเมิน' })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder="ชื่อ-สกุล ผู้ประเมิน"
                />
                {errors.evaluatorName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder="ตำแหน่งผู้ประเมิน"
                />
                {errors.evaluatorPosition && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.evaluatorPosition.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <button
            type="submit"
            disabled={isGenerating}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-w-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <FileDown size={20} className={isGenerating ? 'animate-pulse' : ''} />
              <span>
                {isGenerating ? 'กำลังสร้าง PDF...' : 'ดาวน์โหลด PDF'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}