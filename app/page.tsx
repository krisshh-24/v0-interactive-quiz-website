"use client"

import { useState } from "react"
import QuizContainer from "@/components/quiz-container"
import ResultsScreen from "@/components/results-screen"
import { quizData } from "@/lib/quiz-data"

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(quizData.length).fill(null))
  const [isComplete, setIsComplete] = useState(false)

  const handleAnswerSelect = (optionKey: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionKey
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers(new Array(quizData.length).fill(null))
    setIsComplete(false)
  }

  if (isComplete) {
    return <ResultsScreen answers={answers} questions={quizData} onRestart={handleRestart} />
  }

  return (
    <main className="min-h-screen bg-background">
      <QuizContainer
        question={quizData[currentQuestion]}
        questionNumber={currentQuestion + 1}
        totalQuestions={quizData.length}
        selectedAnswer={answers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={answers[currentQuestion] !== null}
        canGoPrevious={currentQuestion > 0}
      />
    </main>
  )
}
