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
    <div className="space-y-12 py-6">
      {/* Employee Information Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-gray-600" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">ข้อมูลพนักงาน</h2>
            <p className="text-gray-600">Employee Information</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ชื่อ-สกุล <span className="text-red-500">*</span>
            </label>
            <input
              {...register('employeeName', { required: 'กรุณาระบุชื่อ-สกุล' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              placeholder="ระบุชื่อ-สกุล"
            />
            {errors.employeeName && (
              <p className="text-red-500 text-sm">
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              placeholder="ระบุส่วน/ฝ่าย"
            />
            {errors.department && (
              <p className="text-red-500 text-sm">
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Work Period */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-gray-600" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">ระยะเวลาการทำงาน</h3>
            <p className="text-gray-600">Work Period</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              วันที่เริ่มการทำงาน
            </label>
            <input
              {...register('probationStart')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ถึงวันที่
            </label>
            <input
              {...register('probationEnd')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Evaluation Period */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-6 h-6 text-gray-600" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">ข้อมูลการประเมิน</h3>
            <p className="text-gray-600">Evaluation Information</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ประจำเดือน
            </label>
            <select
              {...register('evaluationMonth')}
              className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Work Schedule */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">ปฏิบัติงาน</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              วันที่ปฏิบัติงาน
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  {...register('workDays')}
                  type="radio"
                  value="weekdays"
                  className="mr-3 text-gray-600"
                />
                <span className="text-sm text-gray-800">วันจันทร์ - วันศุกร์</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('workDays')}
                  type="radio"
                  value="everyday"
                  className="mr-3 text-gray-600"
                />
                <span className="text-sm text-gray-800">ทุกวัน</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('workDays')}
                  type="radio"
                  value="shift"
                  className="mr-3 text-gray-600"
                />
                <span className="text-sm text-gray-800">เป็นกะ</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              เวลาทำงาน
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  {...register('workHours')}
                  type="radio"
                  value="8hours"
                  className="mr-3 text-gray-600"
                />
                <span className="text-sm text-gray-800">8 ชั่วโมง/วัน</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('workHours')}
                  type="radio"
                  value="12hours"
                  className="mr-3 text-gray-600"
                />
                <span className="text-sm text-gray-800">12 ชั่วโมง/วัน</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('workHours')}
                  type="radio"
                  value="other"
                  className="mr-3 text-gray-600"
                />
                <span className="text-sm text-gray-800">อื่นๆ</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">การมาสาย</h4>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ความถี่ในการมาสาย
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                {...register('lateFrequency')}
                type="radio"
                value="never"
                className="mr-3 text-gray-600"
              />
              <span className="text-sm text-gray-800">ไม่เคยมาสาย</span>
            </label>
            <label className="flex items-center">
              <input
                {...register('lateFrequency')}
                type="radio"
                value="1-3"
                className="mr-3 text-gray-600"
              />
              <span className="text-sm text-gray-800">มาสาย 1-3 ครั้ง</span>
            </label>
            <label className="flex items-center">
              <input
                {...register('lateFrequency')}
                type="radio"
                value="more3"
                className="mr-3 text-gray-600"
              />
              <span className="text-sm text-gray-800">มาสายมากกว่า 3 ครั้ง</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
