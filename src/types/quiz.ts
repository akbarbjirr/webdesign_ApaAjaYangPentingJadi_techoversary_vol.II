export type QuizDifficulty = 'mudah' | 'sedang' | 'sulit'

export function isQuizDifficulty(value: string): value is QuizDifficulty {
  return value === 'mudah' || value === 'sedang' || value === 'sulit'
}

export interface QuizQuestion {
  id: string
  difficulty: QuizDifficulty
  materi: string
  scenario: string
  question: string
  options: string[]
  points: number
  image?: string
  imageAlt?: string
}

export interface QuizReviewItem {
  id: string
  question: string
  chosenIndex: number
  correctIndex: number
  isCorrect: boolean
  points: number
  earnedPoints: number
  optionFeedback: string
  explanation: string
}
