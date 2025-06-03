"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useTestStore } from "@/lib/test-store"
import { Badge } from "@/components/ui/badge"

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getResults, testCompleted } = useTestStore()
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    if (!testCompleted) {
      router.push("/")
      return
    }

    const testResults = getResults()
    setResults(testResults)
  }, [getResults, router, testCompleted])

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-xl">Loading results...</div>
      </div>
    )
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 60) return "text-yellow-400"
    if (percentage >= 40) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Test Analysis
          </h1>
          <p className="text-gray-400">BITSAT Mock Test {params.id} Results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                Overall Score
                <Badge variant="secondary" className="bg-blue-600">
                  {Math.round((results.totalScore / 390) * 100)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-6xl font-bold text-center mb-4 ${getScoreColor(results.totalScore, 390)}`}>
                {results.totalScore} / 390
              </div>
              <Progress value={(results.totalScore / 390) * 100} className="h-4" />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Questions Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-900 rounded-lg">
                  <p className="text-sm text-green-300">Correct</p>
                  <p className="text-3xl font-bold text-green-400">{results.totalCorrect}</p>
                </div>
                <div className="text-center p-4 bg-red-900 rounded-lg">
                  <p className="text-sm text-red-300">Incorrect</p>
                  <p className="text-3xl font-bold text-red-400">{results.totalIncorrect}</p>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-300">Unattempted</p>
                  <p className="text-3xl font-bold text-gray-400">{results.totalUnattempted}</p>
                </div>
                <div className="text-center p-4 bg-blue-900 rounded-lg">
                  <p className="text-sm text-blue-300">Accuracy</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {results.totalAttempted > 0 ? Math.round((results.totalCorrect / results.totalAttempted) * 100) : 0}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">Section-wise Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(results.sections).map(([section, data]: [string, any]) => {
            const sectionColors = {
              physics: "blue",
              chemistry: "green",
              mathematics: "purple",
              english: "orange",
            }
            const color = sectionColors[section] || "gray"

            return (
              <Card key={section} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="capitalize text-white flex items-center justify-between">
                    {section === "english" ? "English & LR" : section}
                    <Badge variant="secondary" className={`bg-${color}-600`}>
                      {Math.round((data.score / data.maxScore) * 100)}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">
                        Score:{" "}
                        <span className={`font-bold ${getScoreColor(data.score, data.maxScore)}`}>
                          {data.score} / {data.maxScore}
                        </span>
                      </span>
                    </div>
                    <Progress value={(data.score / data.maxScore) * 100} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center p-3 bg-green-900 rounded-lg">
                      <p className="text-green-300 mb-1">Correct</p>
                      <p className="font-bold text-green-400 text-lg">{data.correct}</p>
                    </div>
                    <div className="text-center p-3 bg-red-900 rounded-lg">
                      <p className="text-red-300 mb-1">Incorrect</p>
                      <p className="font-bold text-red-400 text-lg">{data.incorrect}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-700 rounded-lg">
                      <p className="text-gray-300 mb-1">Unattempted</p>
                      <p className="font-bold text-gray-400 text-lg">{data.unattempted}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Scoring Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Correct Answer: +3 marks</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Incorrect Answer: -1 mark</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span>Unattempted: 0 marks</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => router.push("/")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Take Another Test
          </Button>
        </div>
      </div>
    </div>
  )
}
