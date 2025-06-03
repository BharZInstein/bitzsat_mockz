import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            BITSAT Mock Test Platform
          </h1>
          <p className="text-xl text-gray-300">Prepare for BITSAT with our comprehensive mock tests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link href="/test/1" className="block group">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
              <CardContent className="p-8 flex flex-col items-center justify-center min-h-[250px]">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">Test 1</h2>
                <p className="text-5xl font-bold text-blue-400">3h</p>
                <p className="text-gray-400 mt-2">130 Questions</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/test/2" className="block group">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
              <CardContent className="p-8 flex flex-col items-center justify-center min-h-[250px]">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">Test 2</h2>
                <p className="text-5xl font-bold text-purple-400">3h</p>
                <p className="text-gray-400 mt-2">130 Questions</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">30</div>
              <div className="text-sm text-gray-400">Physics</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-400">30</div>
              <div className="text-sm text-gray-400">Chemistry</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">40</div>
              <div className="text-sm text-gray-400">Mathematics</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">30</div>
              <div className="text-sm text-gray-400">English & LR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
