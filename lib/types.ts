// lib/types.ts

export interface EvaluationData {
  [x: string]: any;
  // ข้อมูลพนักงาน
  employeeName: string;
  department: string;
  position: string;
  probationStart: string;
  probationEnd: string;
  salary: string;
  evaluationMonth: string;
  evaluationYear: string;
  
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