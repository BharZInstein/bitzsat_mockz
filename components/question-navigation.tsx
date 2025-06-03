"use client"

import { useTestStore } from "@/lib/test-store"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuestionNavigationProps {
  section: string
  onQuestionSelect: (index: number) => void
  currentIndex: number
}

export function QuestionNavigation({ section, onQuestionSelect, currentIndex }: QuestionNavigationProps) {
  const { getSectionQuestions, getUserAnswer } = useTestStore()
  const questions = getSectionQuestions(section)

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="font-medium mb-4 text-white">Question Navigation</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, index) => {
          const answer = getUserAnswer(section, index)
          const isAnswered = answer !== null && answer !== undefined
          const isCurrent = currentIndex === index

          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={cn(
                "h-10 w-10 p-0 text-sm font-medium transition-all",
                isCurrent && "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-700",
                isAnswered
                  ? "bg-green-600 border-green-500 text-white hover:bg-green-700"
                  : "bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500",
              )}
              onClick={() => onQuestionSelect(index)}
            >
              {index + 1}
            </Button>
          )
        })}
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span className="text-gray-300">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded"></div>
          <span className="text-gray-300">Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
          <span className="text-gray-300">Current Question</span>
        </div>
      </div>
    </div>
  )
}
