// components/EvaluationForm.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileDown, Calculator, User, Plus, X } from 'lucide-react';
import { EvaluationData } from '@/lib/types';
import { generatePDF } from '@/lib/pdf-generator';

export default function EvaluationForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [responsibilities, setResponsibilities] = useState([
    '', '', '', '', '', '', '', '', '', ''  // 10 ข้อเป็นค่าเริ่มต้น
  ]);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<EvaluationData>({
    defaultValues: {
      employeeName: '',
      department: '',
      position: '',
      salary: '',
      probationStart: '',
      probationEnd: '',
      evaluationMonth: '',
      evaluationYear: '',
      task1_1: '',
      task1_2: '',
      task1_3: '',
      task1_4: '',
      task1_5: '',
      task1_6: '',
      task1_7: '',
      task1_8: '',
      task1_9: '',
      task1_11: '',
      task1_12: '',
      task1_13: '',
      section2_1: '',
      section2_2: '',
      section2_3: '',
      section2_4: '',
      section2_5: '',
      section2_6: '',
      workResponsibilities: '',
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
      additionalComments: '',
      evaluatorName: '',
      evaluatorPosition: ''
    }
  });

  const formData = watch();

  const calculateQualityScore = () => {
    return Object.values(formData.quality || {}).reduce((sum, score) => sum + (Number(score) || 0), 0);
  };

  const calculateBehaviorScore = () => {
    return Object.values(formData.behavior || {}).reduce((sum, score) => sum + (Number(score) || 0), 0);
  };

  const qualityScore = calculateQualityScore();
  const behaviorScore = calculateBehaviorScore();
  const totalScore = qualityScore + behaviorScore;
  const percentage = ((totalScore / 150) * 100).toFixed(0);

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, '']);
  };

  const removeResponsibility = (index: number) => {
    if (responsibilities.length > 10) {  // เปลี่ยนจาก 1 เป็น 10
      const newResponsibilities = responsibilities.filter((_, i) => i !== index);
      setResponsibilities(newResponsibilities);
    }
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const onSubmit = async (data: EvaluationData) => {
    setIsGenerating(true);
    try {
      // รวมหน้าที่ความรับผิดชอบทั้งหมดเป็นข้อความเดียว
      const responsibilitiesText = responsibilities
        .filter(item => item.trim() !== '')
        .map((item, index) => `${index + 1}. ${item}`)
        .join('\n');
      
      const submitData = {
        ...data,
        workResponsibilities: responsibilitiesText
      };
      
      await generatePDF(submitData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* ส่วนที่ 1 - ข้อมูลพนักงาน */}
        <div className="bg-white border-2 border-gray-300 shadow-sm">
          <div className="bg-gray-100 px-6 py-3 border-b-2 border-gray-300">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">ส่วนที่ 1 ข้อมูลเจ้าหน้าที่</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อ-สกุล <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('employeeName', { required: 'กรุณาระบุชื่อ-สกุล' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="นางสาว... หรือ นาย..."
                />
                {errors.employeeName && (
                  <p className="text-red-500 text-xs mt-1">{errors.employeeName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ฝ่าย/แผนก <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('department', { required: 'กรุณาระบุฝ่าย/แผนก' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="ฝ่ายธุรการ"
                />
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ตำแหน่ง
                </label>
                <input
                  {...register('position')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="เจ้าหน้าที่บริหารงานทั่วไป"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เงินเดือน
                </label>
                <div className="flex items-center">
                  <input
                    {...register('salary')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    placeholder="25,000"
                  />
                  <span className="ml-2 text-sm text-gray-600">บาท</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ระยะเวลาในงาน (เริ่ม)
                </label>
                <input
                  {...register('probationStart')}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ถึงวันที่
                </label>
                <input
                  {...register('probationEnd')}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ประจำเดือน/ปี
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    {...register('evaluationMonth')}
                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  >
                    <option value="">เลือกเดือน</option>
                    {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'].map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <input
                    {...register('evaluationYear')}
                    type="text"
                    placeholder="2567"
                    className="w-20 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สถิติการลา
              </label>
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <div className="flex items-center space-x-1">
                  <label className="text-sm text-gray-600">ลาป่วย</label>
                  <input
                    {...register('sickLeave', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    className="w-12 px-1 py-1 border border-gray-300 text-center text-sm"
                  />
                  <span className="text-sm text-gray-600">วัน</span>
                </div>
                <div className="flex items-center space-x-1">
                  <label className="text-sm text-gray-600">ลากิจ</label>
                  <input
                    {...register('personalLeave', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    className="w-12 px-1 py-1 border border-gray-300 text-center text-sm"
                  />
                  <span className="text-sm text-gray-600">วัน</span>
                </div>
                <div className="flex items-center space-x-1">
                  <label className="text-sm text-gray-600">ลาอื่นๆ</label>
                  <input
                    {...register('otherLeave', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    className="w-12 px-1 py-1 border border-gray-300 text-center text-sm"
                  />
                  <span className="text-sm text-gray-600">วัน</span>
                </div>
                <div className="flex items-center space-x-1">
                  <label className="text-sm text-gray-600">ขาดงาน</label>
                  <input
                    {...register('absent', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    className="w-12 px-1 py-1 border border-gray-300 text-center text-sm"
                  />
                  <span className="text-sm text-gray-600">วัน</span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="inline-flex items-center text-sm text-gray-600 mr-2">มาสาย:</div>
                <div className="inline-flex gap-6">
                  <label className="inline-flex items-center">
                    <input
                      {...register('lateFrequency')}
                      type="radio"
                      value="never"
                      className="mr-1"
                    />
                    <span className="text-sm">( ) ไม่เคยมาสาย</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      {...register('lateFrequency')}
                      type="radio"
                      value="1-3"
                      className="mr-1"
                    />
                    <span className="text-sm">( ) มาสาย 1-3 ครั้ง</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      {...register('lateFrequency')}
                      type="radio"
                      value="more3"
                      className="mr-1"
                    />
                    <span className="text-sm">( ) มาสายมากกว่า 3 ครั้ง</span>
                  </label>
                </div>
              </div>
            </div>

            {/* หน้าที่ความรับผิดชอบ */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  หน้าที่ความรับผิดชอบในการปฏิบัติงาน
                </label>
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  เพิ่มข้อ
                </button>
              </div>
              
              <div className="space-y-2">
                {responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-sm text-gray-600 mt-2 min-w-[20px]">{index + 1}.</span>
                    <textarea
                      value={responsibility}
                      onChange={(e) => updateResponsibility(index, e.target.value)}
                      rows={2}
                      className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none"
                      placeholder="ระบุหน้าที่ความรับผิดชอบ..."
                    />
                    {responsibilities.length > 10 && (  // เปลี่ยนจาก 1 เป็น 10
                      <button
                        type="button"
                        onClick={() => removeResponsibility(index)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors mt-1"
                        title="ลบข้อนี้"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                มี 10 ข้อเป็นค่าเริ่มต้น - คลิก "เพิ่มข้อ" เพื่อเพิ่มหน้าที่ความรับผิดชอบเพิ่มเติม
              </p>
            </div>
          </div>
        </div>

        {/* ส่วนที่ 2 - การประเมิน */}
        <div className="bg-white border-2 border-gray-300 shadow-sm">
          <div className="bg-gray-100 px-6 py-3 border-b-2 border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">ส่วนที่ 2 การประเมิน</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left bg-gray-50 text-sm font-medium">
                    รายการประเมิน
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center bg-gray-50 text-sm font-medium w-32">
                    ระดับคะแนน<br />
                    <span className="text-xs">10 → 1</span>
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center bg-gray-50 text-sm font-medium w-40">
                    ความเห็นเพิ่มเติม
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* ด้านคุณภาพ */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-sm" colSpan={3}>
                    2.1 ด้านคุณภาพ (50)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.1.1 งานที่ทำสำเร็จเป็นไปตามเป้าหมายที่กำหนด</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('quality.goalAchievement', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.1.2 ทักษะ ความรู้ ที่จำเป็นต่อการทำงาน</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('quality.skills', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.1.3 ความรู้ความเข้าใจในการปฏิบัติงาน</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('quality.understanding', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.1.4 ความละเอียดรอบคอบ ความถูกต้องของงาน</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('quality.accuracy', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.1.5 ความรวดเร็ว งานที่ทำแล้วเสร็จในระยะเวลาที่กำหนด</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('quality.speed', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>

                {/* ด้านพฤติกรรม */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-sm" colSpan={3}>
                    2.2 ด้านพฤติกรรม (100)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.1 การปฏิบัติตามระเบียบ วินัย ตรงต่อเวลา</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.discipline', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-xs">มีความเคารพต่อข้อกำหนดและระเบียบดี</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.2 ความสามารถในการเรียนรู้งาน</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.learning', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.3 ความคิดริเริ่มสร้างสรรค์</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.creativity', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.4 ความร่วมมือ การประสานงาน การมีส่วนร่วม</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.cooperation', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.5 ความมีจิตอาสา ช่วยเหลือผู้อื่น</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.volunteer', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.6 ความเอื้อเฟื้อเผื่อแผ่</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.generosity', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.7 ความมีมนุษยสัมพันธ์</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.relationship', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.8 ความเสียสละและอุทิศเวลาให้กับงาน</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.dedication', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.9 ความกระตือรือร้น ความมานะพยายาม</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.enthusiasm', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">2.2.10 การตัดสินใจและการแก้ปัญหา</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      {...register('behavior.decision', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ส่วนที่ 3 - ผลการประเมิน */}
        <div className="bg-white border-2 border-gray-300 shadow-sm">
          <div className="bg-gray-100 px-6 py-3 border-b-2 border-gray-300">
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">ส่วนที่ 3 ผลการประเมินประจำเดือน</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border-2 border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 bg-gray-50 text-sm font-medium text-center">
                      ด้านประเมิน
                    </th>
                    <th className="border border-gray-300 px-4 py-3 bg-gray-50 text-sm font-medium text-center">
                      คะแนน (150)
                    </th>
                    <th className="border border-gray-300 px-4 py-3 bg-gray-50 text-sm font-medium text-center">
                      คิดเป็นร้อยละ (100)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">3.1 ด้านคุณภาพ (50 คะแนนเต็ม)</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{qualityScore}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{((qualityScore / 50) * 100).toFixed(0)}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">3.2 ด้านพฤติกรรม (100 คะแนนเต็ม)</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{behaviorScore}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{((behaviorScore / 100) * 100).toFixed(0)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-sm font-bold">รวม</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold text-lg text-blue-600">{totalScore}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold text-lg text-blue-600">{percentage}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-lg font-medium text-gray-700 mb-2">ผลการประเมิน</h4>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {percentage}% ({totalScore}/150 คะแนน)
              </div>
              <div className="text-lg font-medium text-gray-700">
                {Number(percentage) >= 90 ? 'ดีเยี่ยม' : 
                 Number(percentage) >= 80 ? 'ดี' : 
                 Number(percentage) >= 70 ? 'พอใช้' : 'ต้องปรับปรุง'}
              </div>
            </div>
          </div>
        </div>

        {/* ความเห็นเพิ่มเติม */}
        <div className="bg-white border-2 border-gray-300 shadow-sm">
          <div className="bg-gray-100 px-6 py-3 border-b-2 border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">ความเห็นเพิ่มเติม</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ข้อเสนอแนะ
              </label>
              <textarea
                {...register('additionalComments')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none"
                placeholder="ข้อเสนอแนะและคำแนะนำเพื่อการพัฒนา เช่น ควรพัฒนาทักษะการใช้เทคโนโลยี หรือ ควรเพิ่มความรอบคอบในการทำงาน"
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
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="ชื่อ-สกุล ผู้ประเมิน"
                />
                {errors.evaluatorName && (
                  <p className="text-red-500 text-sm mt-1">{errors.evaluatorName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ตำแหน่งผู้ประเมิน <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('evaluatorPosition', { required: 'กรุณาระบุตำแหน่ง' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="หัวหน้างาน / ผู้จัดการ / ผู้อำนวยการ"
                />
                {errors.evaluatorPosition && (
                  <p className="text-red-500 text-sm mt-1">{errors.evaluatorPosition.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ปุ่มส่งข้อมูล */}
        <div className="text-center py-8">
          <button
            type="submit"
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        </div>
      </form>
    </div>
  );
}
