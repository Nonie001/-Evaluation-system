import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EvaluationForm from '../components/EvaluationForm'

// Mock fetch for PDF generation
global.fetch = jest.fn()

describe('EvaluationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders evaluation form with all sections', () => {
    render(<EvaluationForm />)
    
    // Check if main sections are present
    expect(screen.getByText('ระบบประเมินการทำงาน')).toBeInTheDocument()
    expect(screen.getByText('ส่วนที่ 1: ข้อมูลเจ้าหน้าที่')).toBeInTheDocument()
    expect(screen.getByText('ส่วนที่ 2: การประเมิน')).toBeInTheDocument()
    expect(screen.getByText('ด้านคุณภาพ')).toBeInTheDocument()
    expect(screen.getByText('ด้านพฤติกรรม')).toBeInTheDocument()
  })

  test('displays 10 default responsibility fields', () => {
    render(<EvaluationForm />)
    
    const responsibilityInputs = screen.getAllByPlaceholderText(/หน้าที่ความรับผิดชอบ/)
    expect(responsibilityInputs).toHaveLength(10)
  })

  test('can add new responsibility field', async () => {
    const user = userEvent.setup()
    render(<EvaluationForm />)
    
    const addButton = screen.getByRole('button', { name: /เพิ่มหน้าที่/ })
    await user.click(addButton)
    
    const responsibilityInputs = screen.getAllByPlaceholderText(/หน้าที่ความรับผิดชอบ/)
    expect(responsibilityInputs).toHaveLength(11)
  })

  test('can remove responsibility field (only when more than 10)', async () => {
    const user = userEvent.setup()
    render(<EvaluationForm />)
    
    // Add one more field first
    const addButton = screen.getByRole('button', { name: /เพิ่มหน้าที่/ })
    await user.click(addButton)
    
    // Now we should have remove buttons
    const removeButtons = screen.getAllByRole('button', { name: /ลบ/ })
    expect(removeButtons.length).toBeGreaterThan(0)
    
    // Remove one field
    await user.click(removeButtons[0])
    
    const responsibilityInputs = screen.getAllByPlaceholderText(/หน้าที่ความรับผิดชอบ/)
    expect(responsibilityInputs).toHaveLength(10)
  })

  test('all quality scores default to 10', () => {
    render(<EvaluationForm />)
    
    const qualitySelects = screen.getAllByDisplayValue('10')
    // Should have quality scores (5) + behavior scores (10) = 15 total
    expect(qualitySelects.length).toBeGreaterThanOrEqual(5)
  })

  test('calculates total score correctly', async () => {
    const user = userEvent.setup()
    render(<EvaluationForm />)
    
    // Wait for the form to initialize with default scores
    await waitFor(() => {
      expect(screen.getByText('คะแนนรวม: 150/150 (100.00%)')).toBeInTheDocument()
    })
  })

  test('updates score when changing quality rating', async () => {
    const user = userEvent.setup()
    render(<EvaluationForm />)
    
    // Find first quality score select and change it
    const firstQualitySelect = screen.getAllByDisplayValue('10')[0]
    await user.selectOptions(firstQualitySelect, '8')
    
    await waitFor(() => {
      expect(screen.getByText('คะแนนรวม: 148/150 (98.67%)')).toBeInTheDocument()
    })
  })

  test('PDF generation button is present', () => {
    render(<EvaluationForm />)
    
    const pdfButton = screen.getByRole('button', { name: /สร้าง PDF/ })
    expect(pdfButton).toBeInTheDocument()
  })

  test('handles form submission for PDF generation', async () => {
    const user = userEvent.setup()
    
    // Mock successful fetch response
    const mockBlob = new Blob(['fake pdf content'], { type: 'application/pdf' })
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    })

    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'mock-url')
    global.URL.revokeObjectURL = jest.fn()

    render(<EvaluationForm />)
    
    // Fill in required fields
    await user.type(screen.getByLabelText(/ชื่อ-สกุล/), 'John Doe')
    
    const pdfButton = screen.getByRole('button', { name: /สร้าง PDF/ })
    await user.click(pdfButton)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.any(String),
      })
    })
  })

  test('form validation works for required fields', async () => {
    const user = userEvent.setup()
    render(<EvaluationForm />)
    
    const pdfButton = screen.getByRole('button', { name: /สร้าง PDF/ })
    await user.click(pdfButton)
    
    // Should show validation message for required field
    await waitFor(() => {
      expect(screen.getByText(/กรุณากรอกชื่อ-สกุล/)).toBeInTheDocument()
    })
  })

  test('navigation between sections works', async () => {
    const user = userEvent.setup()
    render(<EvaluationForm />)
    
    // Should start on section 1
    expect(screen.getByText('ส่วนที่ 1: ข้อมูลเจ้าหน้าที่')).toBeInTheDocument()
    
    // Go to section 2
    const nextButton = screen.getByRole('button', { name: /ถัดไป/ })
    await user.click(nextButton)
    
    expect(screen.getByText('ส่วนที่ 2: การประเมิน')).toBeInTheDocument()
    
    // Go back to section 1
    const backButton = screen.getByRole('button', { name: /ย้อนกลับ/ })
    await user.click(backButton)
    
    expect(screen.getByText('ส่วนที่ 1: ข้อมูลเจ้าหน้าที่')).toBeInTheDocument()
  })
})
