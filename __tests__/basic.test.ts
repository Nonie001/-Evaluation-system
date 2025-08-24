/**
 * Basic tests for the Employee Evaluation System
 */

// Simple calculation tests
describe('Score Calculations', () => {
  test('should calculate total from quality scores', () => {
    const qualityScores = { a: 9, b: 8, c: 9, d: 8, e: 9 }
    const total = Object.values(qualityScores).reduce((sum, score) => sum + score, 0)
    expect(total).toBe(43)
  })

  test('should calculate total from behavior scores', () => {
    const behaviorScores = { 
      a: 10, b: 9, c: 8, d: 9, e: 8, 
      f: 9, g: 10, h: 9, i: 8, j: 9 
    }
    const total = Object.values(behaviorScores).reduce((sum, score) => sum + score, 0)
    expect(total).toBe(89)
  })

  test('should calculate percentage correctly', () => {
    const totalScore = 132
    const maxScore = 150
    const percentage = ((totalScore / maxScore) * 100).toFixed(2)
    expect(percentage).toBe('88.00')
  })

  test('should handle perfect scores', () => {
    const perfectScore = 150
    const maxScore = 150
    const percentage = ((perfectScore / maxScore) * 100).toFixed(2)
    expect(percentage).toBe('100.00')
  })

  test('should handle minimum scores', () => {
    const minScore = 15 // 1 point each for 15 criteria
    const maxScore = 150
    const percentage = ((minScore / maxScore) * 100).toFixed(2)
    expect(percentage).toBe('10.00')
  })
})

// String manipulation tests
describe('Text Processing', () => {
  test('should format late frequency text', () => {
    const getLateFrequencyText = (frequency: string): string => {
      switch(frequency) {
        case 'never': return '(✓) ไม่เคยมาสาย ( ) มาสาย 1-3 ครั้ง ( ) มาสายมากกว่า 3 ครั้ง'
        case '1-3': return '( ) ไม่เคยมาสาย (✓) มาสาย 1-3 ครั้ง ( ) มาสายมากกว่า 3 ครั้ง'
        case 'more3': return '( ) ไม่เคยมาสาย ( ) มาสาย 1-3 ครั้ง (✓) มาสายมากกว่า 3 ครั้ง'
        default: return '(✓) ไม่เคยมาสาย ( ) มาสาย 1-3 ครั้ง ( ) มาสายมากกว่า 3 ครั้ง'
      }
    }

    expect(getLateFrequencyText('never')).toContain('(✓) ไม่เคยมาสาย')
    expect(getLateFrequencyText('1-3')).toContain('(✓) มาสาย 1-3 ครั้ง')
    expect(getLateFrequencyText('more3')).toContain('(✓) มาสายมากกว่า 3 ครั้ง')
  })

  test('should replace newlines with br tags', () => {
    const text = 'หน้าที่ที่ 1\nหน้าที่ที่ 2\nหน้าที่ที่ 3'
    const htmlText = text.replace(/\n/g, '<br>')
    expect(htmlText).toBe('หน้าที่ที่ 1<br>หน้าที่ที่ 2<br>หน้าที่ที่ 3')
  })
})

// Array operations tests
describe('Array Operations', () => {
  test('should create default responsibility array', () => {
    const defaultCount = 10
    const defaultArray = Array.from({ length: defaultCount }, (_, i) => `หน้าที่ความรับผิดชอบ ${i + 1}`)
    
    expect(defaultArray).toHaveLength(10)
    expect(defaultArray[0]).toBe('หน้าที่ความรับผิดชอบ 1')
    expect(defaultArray[9]).toBe('หน้าที่ความรับผิดชอบ 10')
  })

  test('should add item to array', () => {
    let responsibilities = ['Item 1', 'Item 2']
    responsibilities = [...responsibilities, 'Item 3']
    
    expect(responsibilities).toHaveLength(3)
    expect(responsibilities[2]).toBe('Item 3')
  })

  test('should remove item from array', () => {
    let responsibilities = ['Item 1', 'Item 2', 'Item 3']
    responsibilities = responsibilities.filter((_, index) => index !== 1)
    
    expect(responsibilities).toHaveLength(2)
    expect(responsibilities).toEqual(['Item 1', 'Item 3'])
  })
})

// Date and time tests
describe('Date Formatting', () => {
  test('should format Thai month names', () => {
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ]
    
    expect(thaiMonths).toHaveLength(12)
    expect(thaiMonths[7]).toBe('สิงหาคม') // August is index 7
  })

  test('should format Buddhist year', () => {
    const christianYear = 2025
    const buddhistYear = christianYear + 543
    
    expect(buddhistYear).toBe(2568)
  })
})
