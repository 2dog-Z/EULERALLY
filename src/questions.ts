export interface AnswerOption {
  id: string
  content: string
}

export interface Question {
  id: string
  prompt: string
  options: [AnswerOption, AnswerOption, AnswerOption, AnswerOption]
  correctOptionId: string
}

export const questions: Question[] = [
  {
    id: 'stage0-arith-sum',
    prompt: '2 + 3 = ?',
    options: [
      { id: 'sum-4', content: '4' },
      { id: 'sum-5', content: '5' },
      { id: 'sum-6', content: '6' },
      { id: 'sum-7', content: '7' },
    ],
    correctOptionId: 'sum-5',
  },
  {
    id: 'stage0-arith-product',
    prompt: '7 × 8 = ?',
    options: [
      { id: 'product-48', content: '48' },
      { id: 'product-56', content: '56' },
      { id: 'product-64', content: '64' },
      { id: 'product-72', content: '72' },
    ],
    correctOptionId: 'product-56',
  },
]
