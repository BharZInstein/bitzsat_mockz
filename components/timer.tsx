"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useTestStore } from "@/lib/test-store"

export function Timer() {
  const router = useRouter()
  const { testStarted, testId, submitTest } = useTestStore()
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60) // 3 hours in seconds

  useEffect(() => {
    if (!testStarted) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          submitTest()
          router.push(`/results/${testId}`)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testStarted, router, testId, submitTest])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const isLowTime = timeLeft < 600 // Less than 10 minutes

  return (
    <Card className={`w-auto ${isLowTime ? "bg-red-900 border-red-700" : "bg-gray-800 border-gray-700"}`}>
      <CardContent className="p-4 flex items-center justify-center">
        <div className={`text-xl font-bold font-mono ${isLowTime ? "text-red-300" : "text-white"}`}>
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </CardContent>
    </Card>
  )
}
