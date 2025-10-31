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

interface ResultsScreenProps {
  answers: (string | null)[]
  questions: Question[]
  onRestart: () => void
}

export default function ResultsScreen({ answers, questions, onRestart }: ResultsScreenProps) {
  const score = answers.reduce((acc, answer, idx) => {
    return acc + (answer === questions[idx].correctAnswer ? 1 : 0)
  }, 0)

  const percentage = Math.round((score / questions.length) * 100)
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-blue-600"
    if (percentage >= 40) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-4xl p-8 bg-card border-border">
        {/* Results Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Quiz Complete!</h1>
          <div className="space-y-2">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {score} / {questions.length}
            </div>
            <p className="text-xl text-muted-foreground">You scored {percentage}%</p>
          </div>
        </div>

        {/* Performance Message */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 text-center">
          {percentage >= 80 && (
            <p className="text-lg text-foreground font-semibold">
              Excellent! You have a strong understanding of the material!
            </p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-lg text-foreground font-semibold">Great job! You have a good grasp of the concepts.</p>
          )}
          {percentage >= 40 && percentage < 60 && (
            <p className="text-lg text-foreground font-semibold">Good effort! Review the material and try again.</p>
          )}
          {percentage < 40 && (
            <p className="text-lg text-foreground font-semibold">
              Keep practicing! Review the concepts and retake the quiz.
            </p>
          )}
        </div>

        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground">Detailed Review</h2>
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
            {questions.map((question, idx) => {
              const userAnswer = answers[idx]
              const isCorrect = userAnswer === question.correctAnswer

              return (
                <div
                  key={question.id}
                  className={`p-6 rounded-lg border-2 ${
                    isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`text-2xl font-bold flex-shrink-0 ${isCorrect ? "text-green-600" : "text-red-600"}`}
                    >
                      {isCorrect ? "✓" : "✗"}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-lg">
                        Q{idx + 1}: {question.question}
                      </p>
                    </div>
                  </div>

                  {/* All Options */}
                  <div className="space-y-2 mb-4 ml-11">
                    {question.type === "mcq"
                      ? Object.entries(question.options).map(([key, value]) => {
                          const isUserSelected = userAnswer === key
                          const isCorrectOption = key === question.correctAnswer

                          return (
                            <div
                              key={key}
                              className={`p-3 rounded text-sm ${
                                isCorrectOption
                                  ? "bg-green-200 border-2 border-green-600 font-semibold text-green-900"
                                  : isUserSelected
                                    ? "bg-red-200 border-2 border-red-600 font-semibold text-red-900"
                                    : "bg-white border border-gray-300 text-foreground"
                              }`}
                            >
                              <span className="font-bold">{key}.</span> {value}
                              {isCorrectOption && <span className="ml-2 font-bold">(Correct Answer)</span>}
                              {isUserSelected && !isCorrectOption && (
                                <span className="ml-2 font-bold">(Your Answer)</span>
                              )}
                            </div>
                          )
                        })
                      : // True/False options
                        ["True", "False"].map((option) => {
                          const isUserSelected = userAnswer === option
                          const isCorrectOption = option === question.correctAnswer

                          return (
                            <div
                              key={option}
                              className={`p-3 rounded text-sm ${
                                isCorrectOption
                                  ? "bg-green-200 border-2 border-green-600 font-semibold text-green-900"
                                  : isUserSelected
                                    ? "bg-red-200 border-2 border-red-600 font-semibold text-red-900"
                                    : "bg-white border border-gray-300 text-foreground"
                              }`}
                            >
                              {option}
                              {isCorrectOption && <span className="ml-2 font-bold">(Correct Answer)</span>}
                              {isUserSelected && !isCorrectOption && (
                                <span className="ml-2 font-bold">(Your Answer)</span>
                              )}
                            </div>
                          )
                        })}
                    {!userAnswer && <p className="text-sm font-semibold text-red-700 italic">Not answered</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Restart Button */}
        <Button onClick={onRestart} className="w-full" size="lg">
          Retake Quiz
        </Button>
      </Card>
    </main>
  )
}
