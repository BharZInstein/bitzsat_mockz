"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timer } from "@/components/timer"
import { QuestionNavigation } from "@/components/question-navigation"
import { QuestionDisplay } from "@/components/question-display"
import { useTestStore } from "@/lib/test-store"
import { Badge } from "@/components/ui/badge"

export default function TestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showStartDialog, setShowStartDialog] = useState(true)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [activeSection, setActiveSection] = useState("physics")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const {
    initializeTest,
    testStarted,
    startTest,
    submitTest,
    setCurrentSection,
    navigateToQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    testId,
    getSectionQuestions,
    getUserAnswer,
  } = useTestStore()

  useEffect(() => {
    initializeTest(params.id)
  }, [params.id, initializeTest])

  const handleStartTest = () => {
    setShowStartDialog(false)
    startTest()
  }

  const handleSubmitTest = () => {
    submitTest()
    router.push(`/results/${testId}`)
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setCurrentSection(section)
    setCurrentQuestionIndex(0)
  }

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestionIndex(index)
    navigateToQuestion(index)
  }

  const handleNextAndSave = () => {
    const sectionQuestions = getSectionQuestions(activeSection)
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Move to next section
      const sections = ["physics", "chemistry", "mathematics", "english"]
      const currentSectionIndex = sections.indexOf(activeSection)
      if (currentSectionIndex < sections.length - 1) {
        const nextSection = sections[currentSectionIndex + 1]
        setActiveSection(nextSection)
        setCurrentSection(nextSection)
        setCurrentQuestionIndex(0)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      // Move to previous section
      const sections = ["physics", "chemistry", "mathematics", "english"]
      const currentSectionIndex = sections.indexOf(activeSection)
      if (currentSectionIndex > 0) {
        const prevSection = sections[currentSectionIndex - 1]
        const prevSectionQuestions = getSectionQuestions(prevSection)
        setActiveSection(prevSection)
        setCurrentSection(prevSection)
        setCurrentQuestionIndex(prevSectionQuestions.length - 1)
      }
    }
  }

  if (!testStarted && !showStartDialog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-xl">Loading test...</div>
      </div>
    )
  }

  const getSectionStats = (section: string) => {
    const questions = getSectionQuestions(section)
    let attempted = 0
    questions.forEach((_, index) => {
      if (getUserAnswer(section, index)) attempted++
    })
    return { total: questions.length, attempted }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold">BITSAT Mock Test {params.id}</h1>
            <p className="text-gray-400">
              Question {currentQuestionIndex + 1} of {getSectionQuestions(activeSection).length}
            </p>
          </div>
          <Timer />
        </div>

        <Tabs value={activeSection} onValueChange={handleSectionChange} className="mb-6">
          <TabsList className="grid grid-cols-4 mb-6 bg-gray-800">
            {[
              { key: "physics", label: "Physics", color: "blue" },
              { key: "chemistry", label: "Chemistry", color: "green" },
              { key: "mathematics", label: "Mathematics", color: "purple" },
              { key: "english", label: "English & LR", color: "orange" },
            ].map(({ key, label, color }) => {
              const stats = getSectionStats(key)
              return (
                <TabsTrigger key={key} value={key} className="relative">
                  <div className="flex flex-col items-center">
                    <span>{label}</span>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {stats.attempted}/{stats.total}
                    </Badge>
                  </div>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {["physics", "chemistry", "mathematics", "english"].map((section) => (
            <TabsContent key={section} value={section} className="mt-0">
              <Card className="bg-gray-800 border-gray-700">
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                      <QuestionDisplay section={section} questionIndex={currentQuestionIndex} />
                      <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-700">
                        <Button
                          onClick={handlePrevious}
                          disabled={currentQuestionIndex === 0 && activeSection === "physics"}
                          variant="outline"
                          className="bg-gray-700 border-gray-600 hover:bg-gray-600"
                        >
                          Previous
                        </Button>

                        <Button
                          onClick={() => setShowSubmitDialog(true)}
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Submit Test
                        </Button>

                        <Button onClick={handleNextAndSave} className="bg-blue-600 hover:bg-blue-700">
                          Next & Save
                        </Button>
                      </div>
                    </div>
                    <div className="lg:col-span-1">
                      <QuestionNavigation
                        section={section}
                        onQuestionSelect={handleQuestionNavigation}
                        currentIndex={currentQuestionIndex}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Start Test Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Start BITSAT Mock Test</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Do you want to start the test? Once started, the 3-hour timer will begin.</p>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Test Details:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Duration: 3 hours</li>
                <li>• Total Questions: 130</li>
                <li>• Physics: 30 questions</li>
                <li>• Chemistry: 30 questions</li>
                <li>• Mathematics: 40 questions</li>
                <li>• English & LR: 30 questions</li>
                <li>• Scoring: +3 for correct, -1 for incorrect, 0 for unattempted</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => router.push("/")} className="bg-gray-700 border-gray-600">
              Cancel
            </Button>
            <Button onClick={handleStartTest} className="bg-blue-600 hover:bg-blue-700">
              Start Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submit Test Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Submit Test</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to submit the test? This action cannot be undone.</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
              className="bg-gray-700 border-gray-600"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSubmitTest} className="bg-red-600 hover:bg-red-700">
              Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
