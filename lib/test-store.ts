"use client"

import { create } from "zustand"
import { physicsQuestions } from "@/data/physics-questions"
import { chemistryQuestions } from "@/data/chemistry-questions"
import { mathQuestions } from "@/data/math-questions"
import { englishQuestions } from "@/data/english-questions"
import { correctAnswers } from "@/data/correct-answers"

interface TestState {
  testId: string | null
  testStarted: boolean
  testCompleted: boolean
  currentSection: string
  currentQuestionIndex: number
  userAnswers: Record<string, Record<number, string | null>>

  // Actions
  initializeTest: (testId: string) => void
  startTest: () => void
  submitTest: () => void
  setCurrentSection: (section: string) => void
  navigateToQuestion: (index: number) => void
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  setUserAnswer: (section: string, questionIndex: number, answer: string) => void
  getUserAnswer: (section: string, questionIndex: number) => string | null

  // Getters
  getSectionQuestions: (section: string) => any[]
  getCurrentQuestion: () => any
  getResults: () => any
}

export const useTestStore = create<TestState>((set, get) => ({
  testId: null,
  testStarted: false,
  testCompleted: false,
  currentSection: "physics",
  currentQuestionIndex: 0,
  userAnswers: {
    physics: {},
    chemistry: {},
    mathematics: {},
    english: {},
  },

  initializeTest: (testId) => {
    set({
      testId,
      testStarted: false,
      testCompleted: false,
      currentSection: "physics",
      currentQuestionIndex: 0,
      userAnswers: {
        physics: {},
        chemistry: {},
        mathematics: {},
        english: {},
      },
    })
  },

  startTest: () => {
    set({ testStarted: true })
  },

  submitTest: () => {
    set({ testCompleted: true })
  },

  setCurrentSection: (section) => {
    set({ currentSection: section, currentQuestionIndex: 0 })
  },

  navigateToQuestion: (index) => {
    set({ currentQuestionIndex: index })
  },

  goToNextQuestion: () => {
    const { currentSection, currentQuestionIndex } = get()
    const sectionQuestions = get().getSectionQuestions(currentSection)

    if (currentQuestionIndex < sectionQuestions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 })
    } else {
      // If at the end of the section, move to the next section
      const sections = ["physics", "chemistry", "mathematics", "english"]
      const currentSectionIndex = sections.indexOf(currentSection)

      if (currentSectionIndex < sections.length - 1) {
        const nextSection = sections[currentSectionIndex + 1]
        set({ currentSection: nextSection, currentQuestionIndex: 0 })
      }
    }
  },

  goToPreviousQuestion: () => {
    const { currentSection, currentQuestionIndex } = get()

    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 })
    } else {
      // If at the beginning of the section, move to the previous section
      const sections = ["physics", "chemistry", "mathematics", "english"]
      const currentSectionIndex = sections.indexOf(currentSection)

      if (currentSectionIndex > 0) {
        const prevSection = sections[currentSectionIndex - 1]
        const prevSectionQuestions = get().getSectionQuestions(prevSection)
        set({
          currentSection: prevSection,
          currentQuestionIndex: prevSectionQuestions.length - 1,
        })
      }
    }
  },

  setUserAnswer: (section, questionIndex, answer) => {
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [section]: {
          ...state.userAnswers[section],
          [questionIndex]: answer,
        },
      },
    }))
  },

  getUserAnswer: (section, questionIndex) => {
    const { userAnswers } = get()
    return userAnswers[section]?.[questionIndex] || null
  },

  getSectionQuestions: (section) => {
    switch (section) {
      case "physics":
        return physicsQuestions
      case "chemistry":
        return chemistryQuestions
      case "mathematics":
        return mathQuestions
      case "english":
        return englishQuestions
      default:
        return []
    }
  },

  getCurrentQuestion: () => {
    const { currentSection, currentQuestionIndex } = get()
    const sectionQuestions = get().getSectionQuestions(currentSection)
    return sectionQuestions[currentQuestionIndex]
  },

  getResults: () => {
    const { userAnswers } = get()

    // Initialize results object
    const results = {
      totalScore: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      totalAttempted: 0,
      totalUnattempted: 0,
      sections: {
        physics: { score: 0, maxScore: 90, correct: 0, incorrect: 0, unattempted: 0 },
        chemistry: { score: 0, maxScore: 90, correct: 0, incorrect: 0, unattempted: 0 },
        mathematics: { score: 0, maxScore: 120, correct: 0, incorrect: 0, unattempted: 0 },
        english: { score: 0, maxScore: 90, correct: 0, incorrect: 0, unattempted: 0 },
      },
    }

    // Calculate section-wise results
    Object.entries(userAnswers).forEach(([section, answers]) => {
      const sectionQuestions = get().getSectionQuestions(section)
      const sectionCorrectAnswers = correctAnswers[section]

      let sectionCorrect = 0
      let sectionIncorrect = 0
      let sectionUnattempted = 0

      sectionQuestions.forEach((_, index) => {
        const userAnswer = answers[index]
        const correctAnswer = sectionCorrectAnswers[index]

        if (userAnswer === null || userAnswer === undefined) {
          sectionUnattempted++
        } else if (userAnswer === correctAnswer) {
          sectionCorrect++
        } else {
          sectionIncorrect++
        }
      })

      // Calculate section score: +3 for correct, -1 for incorrect
      const sectionScore = sectionCorrect * 3 - sectionIncorrect

      // Update section results
      results.sections[section].correct = sectionCorrect
      results.sections[section].incorrect = sectionIncorrect
      results.sections[section].unattempted = sectionUnattempted
      results.sections[section].score = sectionScore

      // Update total results
      results.totalCorrect += sectionCorrect
      results.totalIncorrect += sectionIncorrect
      results.totalUnattempted += sectionUnattempted
      results.totalScore += sectionScore
    })

    results.totalAttempted = results.totalCorrect + results.totalIncorrect

    return results
  },
}))
