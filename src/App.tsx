import { useRef, useState } from 'react'
import { questions } from './questions'

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const promptRef = useRef<HTMLHeadingElement>(null)

  const question = questions[questionIndex]
  if (!question) throw new Error('No question available')

  const isLocked = selectedOptionId !== null
  const isCorrect = selectedOptionId === question.correctOptionId
  const correctOption = question.options.find(
    (option) => option.id === question.correctOptionId,
  )

  function selectOption(optionId: string) {
    if (isLocked) return
    setSelectedOptionId(optionId)
  }

  function nextQuestion() {
    setQuestionIndex((index) => (index + 1) % questions.length)
    setSelectedOptionId(null)
    // The clicked Next button becomes disabled, and the browser drops focus to
    // <body>. Move it to the new prompt so keyboard and screen-reader users land
    // on the question that just replaced the old one.
    promptRef.current?.focus()
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center gap-8 px-4 py-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-[0.2em]">EULERALLY</h1>
        <p className="mt-1 text-sm opacity-60">TRAIN YOUR MATH INTUITION</p>
      </header>

      <h2
        ref={promptRef}
        tabIndex={-1}
        className="text-center text-2xl font-medium break-words focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {question.prompt}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, index) => (
          <button
            key={option.id}
            type="button"
            disabled={isLocked}
            onClick={() => selectOption(option.id)}
            className="min-h-14 rounded-lg border px-3 py-3 text-left text-lg break-words disabled:opacity-70"
          >
            {OPTION_LABELS[index]}. {option.content}
          </button>
        ))}
      </div>

      <div role="status" className="min-h-12 text-center">
        {isLocked && (
          <p className="text-lg font-semibold">{isCorrect ? 'Correct' : 'Wrong'}</p>
        )}
        {isLocked && !isCorrect && (
          <p className="text-sm opacity-70">Correct answer: {correctOption?.content}</p>
        )}
      </div>

      <button type="button" onClick={nextQuestion} disabled={!isLocked} className="min-h-12 rounded-lg border">
        Next
      </button>
    </main>
  )
}
