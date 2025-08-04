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
        <h4 className="text-lg font-semibold text-gray-800 mb-4">ลักษณะการทำงาน</h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ลักษณะงานที่มอบหมาย
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  {...register('workNature')}
                  type="radio"
                  value="normal"
                  className="mr-3 text-gray-600"
                />
                <span className="text-sm text-gray-800">งานปกติงานประจำ</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('workNature')}
                  type="radio"
                  value="special"
                  className="mr-3 text-gray-600"
                />
                <span className="text-sm text-gray-800">งานพิเศษ เช่น ส่วนงานที่เป็นฟังก์ชั่นส่วนใหม่</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ลักษณะการทำงาน
            </label>
            <div className="space-y-2">
              <label className="flex items-start">
                <input
                  {...register('workCharacteristic')}
                  type="radio"
                  value="systematic"
                  className="mr-3 mt-1 text-gray-600"
                />
                <span className="text-sm text-gray-800">เป็นระบบ มีขั้นตอนการทำงานที่ชัดเจน (สำหรับ งานที่มีหลักเกณฑ์ชัดเจน เช่น นักงบประมาณ) มีเครื่องมือสำหรับการทำงาน เช่น นโยบาย กฎเกณฑ์ โปรแกรมคอมพิวเตอร์ ที่ช่วยสนับสนุนหรือประยุกต์ใช้ในการทำงาน</span>
              </label>
              <label className="flex items-start">
                <input
                  {...register('workCharacteristic')}
                  type="radio"
                  value="creative"
                  className="mr-3 mt-1 text-gray-600"
                />
                <span className="text-sm text-gray-800">ต้องใช้ความคิดในการตัดสินใจ และต้องประยุกต์ใช้หลักการ ความรู้ ประสบการณ์ในการทำงาน (เช่น งานวิเคราะห์นโยบาย การให้คำปรึกษา)</span>
              </label>
              <label className="flex items-start">
                <input
                  {...register('workCharacteristic')}
                  type="radio"
                  value="independent"
                  className="mr-3 mt-1 text-gray-600"
                />
                <span className="text-sm text-gray-800">เป็นการทำงานที่ไม่มีแบบแผนที่ชัดเจน ต้องใช้ความคิดสร้างสรรค์ ความคิดริเริ่ม วางแผนการทำงาน และมีอิสระในการทำงาน (เช่น การพัฒนาระบบใหม่ๆ การสร้างแผนงานโครงการ)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              การปฏิบัติงาน
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="flex items-center">
                    <input
                      {...register('workSchedule')}
                      type="radio"
                      value="mon-fri"
                      className="mr-2 text-gray-600"
                    />
                    <span className="text-sm text-gray-800">จันทร์ - ศุกร์</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center">
                    <input
                      {...register('workSchedule')}
                      type="radio"
                      value="everyday"
                      className="mr-2 text-gray-600"
                    />
                    <span className="text-sm text-gray-800">ทุกวัน</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center">
                    <input
                      {...register('workSchedule')}
                      type="radio"
                      value="shift"
                      className="mr-2 text-gray-600"
                    />
                    <span className="text-sm text-gray-800">เป็นกะ</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center">
                    <input
                      {...register('workSchedule')}
                      type="radio"
                      value="half-day"
                      className="mr-2 text-gray-600"
                    />
                    <span className="text-sm text-gray-800">ครึ่งวัน</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">เวลา:</span>
                  <input
                    {...register('workTime')}
                    type="text"
                    className="px-2 py-1 border border-gray-300 text-sm w-20"
                    placeholder="เวลา"
                  />
                  <span className="text-sm text-gray-700">น.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Details */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">หน้าที่ความรับผิดชอบ</h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              1. งานที่ได้รับมอบหมายสำเร็จตามเป้าหมายที่กำหนด (สำหรับ งานที่กำหนดเป้าหมายได้ชัดเจน เช่น งาน 21/2563)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">1.1. งานที่ได้รับมอบหมายและดำเนินการแล้วเสร็จ ฯ แต่ยังไม่ครบสมบูรณ์</label>
                <textarea
                  {...register('task1_1')}
                  rows={3}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">1.2. งานที่ได้รับมอบหมายแต่ยังดำเนินการไม่แล้วเสร็จ ค้างชั่วคราว</label>
                <textarea
                  {...register('task1_2')}
                  rows={3}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  placeholder=""
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-gray-600 mb-1">1.3. รายงานงานเพิ่มเติม ฯ งานที่ได้รับการนำไปใช้ประโยชน์</label>
              <textarea
                {...register('task1_3')}
                rows={3}
                className="w-full px-2 py-1 border border-gray-300 text-sm"
                placeholder=""
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              1.4. งานที่รับผิดชอบการควบคุมกำกับงานให้ใช้ประโยชน์
            </label>
            <textarea
              {...register('task1_4')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              1.5. งานที่ได้รับมอบหมายงานใหม่งานไปใช้ประโยชน์
            </label>
            <textarea
              {...register('task1_5')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              1.6. งานที่สนุกส์ใหม่กลับนำไปได้ประโยชน์งานให้ใช้ประโยชน์
            </label>
            <textarea
              {...register('task1_6')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              1.7. งานที่ทำการปรับปรุงแก้ไข
            </label>
            <textarea
              {...register('task1_7')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              1.8. งานที่สร้างผลงานงานที่มีผลงานสำคัญที่สร้างประโยชน์ให้กับแก่ส่วนงาน
            </label>
            <textarea
              {...register('task1_8')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              1.9. ปริมาณงานมากในช่วงงานให้ใช้ประโยชน์งานการทำงาน
            </label>
            <textarea
              {...register('task1_9')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              1.10.ปริมาณงานมากงานการทำงานมากที่ได้รับเสนอความร่วมมือให้ทุกการทำงานสำหรับให้ๆ
            </label>
            <div className="space-y-2">
              <label className="block text-xs text-gray-600 mb-1">1.11.งานที่ทำได้สำเร็จ (power point) เป็นรีรายการกระตื่นส่งใส่วงงานให้ใช้ประโยชน์ทำงาน การประสาน-ข้ามรีบำรุทำงานการอย่างประยุกต์ ปริมาณและการเงินงานให้ใช้ประโยชน์ ประจำมาติการงานงานใหม่งานใช้ประโยชน์</label>
              <textarea
                {...register('task1_11')}
                rows={3}
                className="w-full px-2 py-1 border border-gray-300 text-sm"
                placeholder=""
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-600 mb-1">1.12.งานที่ทำได้สำเร็จ (power point) สำหรับการกำหนดดำเนินงานให้ใช้ประโยชน์ และการทำให้อาดำเสร็จการทำงานจานได้งานประกอบงานการทำงาน</label>
              <textarea
                {...register('task1_12')}
                rows={3}
                className="w-full px-2 py-1 border border-gray-300 text-sm"
                placeholder=""
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-600 mb-1">1.13.ปฏิบัติงานให้เพื่อการจึ่ง ๆ งานการประการนำไปใช้ประโยชน์</label>
              <textarea
                {...register('task1_13')}
                rows={3}
                className="w-full px-2 py-1 border border-gray-300 text-sm"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">2 ลักษณะ ๆ</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2.1. ลักษณะการรู้งานวิเคราะห์ ประเมินค่า และควบคุมการทำงาน ฯ งบประมาณการทำงาน
            </label>
            <textarea
              {...register('section2_1')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2.2. ลักษณะไปงานมีลักษณะการงานกลับง่ายใฝ่ประกอบงานงื่องปรนัยงานสำคัญงานคำปรึกษา
            </label>
            <textarea
              {...register('section2_2')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2.3. งานที่ได้ได้งึทำให้กับท้องงาน และการงานเอากคำไปสรุปมาครุมากงาาร
            </label>
            <textarea
              {...register('section2_3')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2.4. มรรถาวิเคร ปฏิงงานลัง ๆ ห้างใต้งื่าไร และการบำหนดระบบงาทกหารุนอาดให้งานการงาร่วมเป็นลำ ประธานงานเป็นการงานเทำภาคการ
            </label>
            <textarea
              {...register('section2_4')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2.5. ล้ามความสำคัญอำนาจงาน/งายากาน ใรไม่หงปคราหงุ้นวยงามการกมชมาร
            </label>
            <textarea
              {...register('section2_5')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2.6. งพเป็น ห่างมรกอพร ล้ามใต้งื่งดบหญทกหารการงามการประไชำงานเทภาคการ
            </label>
            <textarea
              {...register('section2_6')}
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 text-sm"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
