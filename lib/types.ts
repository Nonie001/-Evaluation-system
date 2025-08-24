// lib/types.ts

export interface EvaluationData {
  [x: string]: any;
  // ข้อมูลพนักงาน
  employeeName: string;
  department: string;
  position: string;
  probationStart: string; // วันที่เริ่มการทำงาน
  probationEnd: string;   // วันที่สิ้นสุดการประเมิน
  salary: string;
  evaluationMonth: string;
  evaluationYear: string;
  
  // ลักษณะการทำงาน
  workNature: 'normal' | 'special';
  workCharacteristic: 'systematic' | 'creative' | 'independent';
  workSchedule: 'mon-fri' | 'everyday' | 'shift' | 'half-day';
  workTime: string;
  
  // หน้าที่ความรับผิดชอบ
  task1_1: string;
  task1_2: string;
  task1_3: string;
  task1_4: string;
  task1_5: string;
  task1_6: string;
  task1_7: string;
  task1_8: string;
  task1_9: string;
  task1_11: string;
  task1_12: string;
  task1_13: string;
  
  // ส่วนที่ 2
  section2_1: string;
  section2_2: string;
  section2_3: string;
  section2_4: string;
  section2_5: string;
  section2_6: string;
  workResponsibilities: string;
  
  // สถิติการลา
  sickLeave: number;
  personalLeave: number;
  otherLeave: number;
  absent: number;
  lateFrequency: 'never' | '1-3' | 'more3';
  
  // คะแนนด้านคุณภาพ
  quality: {
    goalAchievement: number;
    skills: number;
    understanding: number;
    accuracy: number;
    speed: number;
  };
  
  // คะแนนด้านพฤติกรรม
  behavior: {
    discipline: number;
    learning: number;
    creativity: number;
    cooperation: number;
    volunteer: number;
    generosity: number;
    relationship: number;
    dedication: number;
    enthusiasm: number;
    decision: number;
  };
  
  // อื่นๆ
  additionalComments: string;
  evaluatorName: string;
  evaluatorPosition: string;
}