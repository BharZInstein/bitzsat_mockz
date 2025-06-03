"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useTestStore } from "@/lib/test-store"

interface QuestionDisplayProps {
  section: string
  questionIndex: number
}

export function QuestionDisplay({ section, questionIndex }: QuestionDisplayProps) {
  const { getSectionQuestions, getUserAnswer, setUserAnswer } = useTestStore()
  const questions = getSectionQuestions(section)
  const question = questions[questionIndex]

  const selectedOption = getUserAnswer(section, questionIndex)

  const handleOptionSelect = (option: string) => {
    setUserAnswer(section, questionIndex, option)
  }

  if (!question) {
    return <div className="text-white">Question not found</div>
  }

  return (
    <div className="text-white">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Question {questionIndex + 1}
          </span>
          <span className="text-gray-400 text-sm capitalize">{section}</span>
        </div>
        <div
          className="prose prose-invert max-w-none text-gray-100 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: question.text }}
        />
      </div>

      <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect} className="space-y-3">
        {question.options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index) // A, B, C, D

          return (
            <div
              key={index}
              className={`flex items-start space-x-3 rounded-lg border p-4 transition-all cursor-pointer hover:bg-gray-700 ${
                selectedOption === optionLabel ? "bg-blue-900 border-blue-600" : "bg-gray-800 border-gray-600"
              }`}
              onClick={() => handleOptionSelect(optionLabel)}
            >
              <RadioGroupItem value={optionLabel} id={`option-${questionIndex}-${optionLabel}`} className="mt-1" />
              <Label htmlFor={`option-${questionIndex}-${optionLabel}`} className="flex-1 cursor-pointer text-gray-100">
                <span className="font-semibold mr-3 text-blue-400">{optionLabel}.</span>
                <span dangerouslySetInnerHTML={{ __html: option }} />
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}
