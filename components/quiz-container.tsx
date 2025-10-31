"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Question {
  id: string
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: string
  type: "mcq" | "trueFalse"
}

interface QuizContainerProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedAnswer: string | null
  onAnswerSelect: (option: string) => void
  onNext: () => void
  onPrevious: () => void
  canGoNext: boolean
  canGoPrevious: boolean
}

export default function QuizContainer({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: QuizContainerProps) {
  const optionKeys = question.type === "trueFalse" ? ["True", "False"] : ["A", "B", "C", "D"]

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-2xl p-8 bg-card border-border">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </h2>
            <div className="text-sm text-muted-foreground">{Math.round((questionNumber / totalQuestions) * 100)}%</div>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-6 leading-tight">{question.question}</h1>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {optionKeys.map((key) => {
            const optionText =
              question.type === "trueFalse" ? key : question.options[key as keyof typeof question.options]
            const isSelected = selectedAnswer === key

            return (
              <button
                key={key}
                onClick={() => onAnswerSelect(key)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 bg-primary-foreground rounded-full" />}
                  </div>
                  <span className={`font-medium ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                    {key}: {optionText}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center gap-4">
          <Button onClick={onPrevious} disabled={!canGoPrevious} variant="outline" className="flex-1 bg-transparent">
            ← Previous
          </Button>

          <div className="text-sm text-muted-foreground font-medium">
            {questionNumber} / {totalQuestions}
          </div>

          <Button onClick={onNext} disabled={!canGoNext} className="flex-1">
            {questionNumber === totalQuestions ? "Finish" : "Next"} →
          </Button>
        </div>

        {!canGoNext && <p className="text-sm text-destructive mt-4 text-center">Please select an answer to continue</p>}
      </Card>
    </div>
  )
}
