"use client"

import { useState, useEffect } from "react"
import QuizContainer from "@/components/quiz-container"
import ResultsScreen from "@/components/results-screen"
import { quizData } from "@/lib/quiz-data"
import { shuffleArray } from "@/lib/shuffle"

export default function Home() {
  const [shuffledQuestions, setShuffledQuestions] = useState(quizData)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(quizData.length).fill(null))
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setShuffledQuestions(shuffleArray(quizData))
  }, [])

  const handleAnswerSelect = (optionKey: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionKey
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
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
    setAnswers(new Array(shuffledQuestions.length).fill(null))
    setIsComplete(false)
    setShuffledQuestions(shuffleArray(quizData))
  }

  if (isComplete) {
    return <ResultsScreen answers={answers} questions={shuffledQuestions} onRestart={handleRestart} />
  }

  return (
    <main className="min-h-screen bg-background">
      <QuizContainer
        question={shuffledQuestions[currentQuestion]}
        questionNumber={currentQuestion + 1}
        totalQuestions={shuffledQuestions.length}
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
