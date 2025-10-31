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
      <Card className="w-full max-w-2xl p-8 bg-card border-border">
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
              🎉 Excellent! You have a strong understanding of the material!
            </p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-lg text-foreground font-semibold">
              👍 Great job! You have a good grasp of the concepts.
            </p>
          )}
          {percentage >= 40 && percentage < 60 && (
            <p className="text-lg text-foreground font-semibold">📚 Good effort! Review the material and try again.</p>
          )}
          {percentage < 40 && (
            <p className="text-lg text-foreground font-semibold">
              💪 Keep practicing! Review the concepts and retake the quiz.
            </p>
          )}
        </div>

        {/* Answer Review */}
        <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
          <h2 className="text-xl font-bold text-foreground mb-4">Answer Review</h2>
          {questions.map((question, idx) => {
            const userAnswer = answers[idx]
            const isCorrect = userAnswer === question.correctAnswer
            const userAnswerText =
              question.type === "trueFalse"
                ? userAnswer
                : userAnswer
                  ? question.options[userAnswer as keyof typeof question.options]
                  : "Not answered"

            return (
              <div
                key={question.id}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                }`}
              >
                <div className="flex gap-3">
                  <div className={`text-2xl ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                    {isCorrect ? "✓" : "✗"}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-2">
                      Q{idx + 1}: {question.question}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className={isCorrect ? "text-green-700" : "text-red-700"}>Your answer: {userAnswerText}</p>
                      {!isCorrect && (
                        <p className="text-green-700">
                          Correct answer:{" "}
                          {question.type === "trueFalse"
                            ? question.correctAnswer
                            : question.options[question.correctAnswer as keyof typeof question.options]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Restart Button */}
        <Button onClick={onRestart} className="w-full" size="lg">
          Retake Quiz
        </Button>
      </Card>
    </main>
  )
}
