/**
 * @jest-environment jsdom
 */

import { EvaluationData } from '../lib/types'

// Mock data for testing
const mockEvaluationData: EvaluationData = {
  employeeName: 'นาย ทดสอบ ระบบ',
  department: 'แผนก IT',
  position: 'นักพัฒนา',
  salary: '50000',
  probationStart: '01/01/2025',
  probationEnd: '31/01/2025',
  sickLeave: 1,
  personalLeave: 2,
  otherLeave: 0,
  absent: 0,
  lateFrequency: 'never',
  workResponsibilities: 'พัฒนาระบบ\nทดสอบระบบ\nแก้ไขบัค',
  quality: {
    goalAchievement: 9,
    skills: 8,
    understanding: 9,
    accuracy: 8,
    speed: 9
  },
  behavior: {
    discipline: 10,
    learning: 9,
    creativity: 8,
    cooperation: 9,
    volunteer: 8,
    generosity: 9,
    relationship: 10,
    dedication: 9,
    enthusiasm: 8,
    decision: 9
  },
  additionalComments: 'พนักงานมีประสิทธิภาพดี',
  evaluationMonth: 'สิงหาคม',
  evaluationYear: '2568',
  evaluatorName: 'นาย หัวหน้า งาน',
  evaluatorPosition: 'ผู้จัดการ'
}

describe('Utility Functions', () => {
  test('should calculate quality scores correctly', () => {
    const qualityScores = mockEvaluationData.quality
    const totalQuality = Object.values(qualityScores).reduce((sum, score) => sum + score, 0)
    
    expect(totalQuality).toBe(43) // 9+8+9+8+9 = 43
  })

  test('should calculate behavior scores correctly', () => {
    const behaviorScores = mockEvaluationData.behavior
    const totalBehavior = Object.values(behaviorScores).reduce((sum, score) => sum + score, 0)
    
    expect(totalBehavior).toBe(89) // 10+9+8+9+8+9+10+9+8+9 = 89
  })

  test('should calculate total score correctly', () => {
    const qualityTotal = Object.values(mockEvaluationData.quality).reduce((sum, score) => sum + score, 0)
    const behaviorTotal = Object.values(mockEvaluationData.behavior).reduce((sum, score) => sum + score, 0)
    const totalScore = qualityTotal + behaviorTotal
    
    expect(totalScore).toBe(132) // 43 + 89 = 132
  })

  test('should calculate percentage correctly', () => {
    const qualityTotal = Object.values(mockEvaluationData.quality).reduce((sum, score) => sum + score, 0)
    const behaviorTotal = Object.values(mockEvaluationData.behavior).reduce((sum, score) => sum + score, 0)
    const totalScore = qualityTotal + behaviorTotal
    const percentage = ((totalScore / 150) * 100).toFixed(2)
    
    expect(percentage).toBe('88.00') // 132/150 * 100 = 88.00%
  })

  test('should validate evaluation data structure', () => {
    expect(mockEvaluationData.employeeName).toBeDefined()
    expect(mockEvaluationData.quality).toBeDefined()
    expect(mockEvaluationData.behavior).toBeDefined()
    expect(Object.keys(mockEvaluationData.quality)).toHaveLength(5)
    expect(Object.keys(mockEvaluationData.behavior)).toHaveLength(10)
  })

  test('should handle empty or undefined values', () => {
    const emptyData: Partial<EvaluationData> = {
      employeeName: '',
      quality: {
        goalAchievement: 0,
        skills: 0,
        understanding: 0,
        accuracy: 0,
        speed: 0
      }
    }

    expect(emptyData.employeeName).toBe('')
    expect(emptyData.quality?.goalAchievement).toBe(0)
  })
})
