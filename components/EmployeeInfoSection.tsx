// components/EmployeeInfoSection.tsx

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { EvaluationData } from '@/lib/types';
import { User, Calendar, Briefcase } from 'lucide-react';

interface Props {
  register: UseFormRegister<EvaluationData>;
  errors: FieldErrors<EvaluationData>;
}

export default function EmployeeInfoSection({ register, errors }: Props) {
  return (
    <div className="space-y-8">
      {/* Header Logo */}
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-4">
          <User className="w-12 h-12 text-gray-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ระบบประเมินการทำงาน</h1>
            <p className="text-lg text-gray-600 mt-1">ข้อมูลพนักงานและการประเมินผลงาน</p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ชื่อ-สกุล <span className="text-red-500">*</span>
          </label>
          <input
            {...register('employeeName', { required: 'กรุณาระบุชื่อ-สกุล' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
            placeholder="ระบุชื่อ-สกุล"
          />
          {errors.employeeName && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span>⚠️</span>
              {errors.employeeName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ส่วน/ฝ่าย <span className="text-red-500">*</span>
          </label>
          <input
            {...register('department', { required: 'กรุณาระบุส่วน/ฝ่าย' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
            placeholder="ระบุส่วน/ฝ่าย"
          />
          {errors.department && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span>⚠️</span>
              {errors.department.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ตำแหน่ง
          </label>
          <input
            {...register('position')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
            placeholder="ระบุตำแหน่ง"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            อัตราค่าจ้าง (บาท/เดือน)
          </label>
          <input
            {...register('salary')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
            placeholder="0"
          />
        </div>
      </div>

      {/* Probation Period */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          ระยะเวลาทดลองงาน
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              วันที่เริ่มทดลองงาน
            </label>
            <input
              {...register('probationStart')}
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ถึงวันที่
            </label>
            <input
              {...register('probationEnd')}
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Evaluation Period */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-gray-600" />
          ข้อมูลการประเมิน
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ประจำเดือน
            </label>
            <select
              {...register('evaluationMonth')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
            >
              <option value="">เลือกเดือน</option>
              {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'].map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ปี พ.ศ.
            </label>
            <input
              {...register('evaluationYear')}
              type="text"
              placeholder="2568"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Leave Statistics */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          สถิติการลา
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ลาป่วย (วัน)</label>
            <input
              {...register('sickLeave', { valueAsNumber: true })}
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-center focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
              defaultValue={0}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ลากิจ (วัน)</label>
            <input
              {...register('personalLeave', { valueAsNumber: true })}
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-center focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
              defaultValue={0}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ลาอื่นๆ (วัน)</label>
            <input
              {...register('otherLeave', { valueAsNumber: true })}
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-center focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
              defaultValue={0}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ขาดงาน (วัน)</label>
            <input
              {...register('absent', { valueAsNumber: true })}
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-center focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
              defaultValue={0}
            />
          </div>
        </div>
      </div>

      {/* Late Frequency */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          สถานะการมาสาย
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex items-center bg-white p-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-all duration-200">
            <input
              {...register('lateFrequency')}
              type="radio"
              value="never"
              className="mr-3 text-gray-600"
            />
            <span className="text-sm font-medium text-gray-800">ไม่เคยมาสาย</span>
          </label>
          <label className="flex items-center bg-white p-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-all duration-200">
            <input
              {...register('lateFrequency')}
              type="radio"
              value="1-3"
              className="mr-3 text-gray-600"
            />
            <span className="text-sm font-medium text-gray-800">มาสาย 1-3 ครั้ง</span>
          </label>
          <label className="flex items-center bg-white p-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-all duration-200">
            <input
              {...register('lateFrequency')}
              type="radio"
              value="more3"
              className="mr-3 text-gray-600"
            />
            <span className="text-sm font-medium text-gray-800">มาสายมากกว่า 3 ครั้ง</span>
          </label>
        </div>
      </div>
    </div>
  );
}