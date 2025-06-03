import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            BITZ_MOCKS
          </h1>
          <p className="text-sm text-gray-400">Built with ❤️ by Bharz</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Link href="/test/1" className="block group">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-750 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
              <CardContent className="p-12 flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                  <span className="text-3xl font-bold">1</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 text-white">Full Length Mock Test</h2>
                <p className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">3h</p>
                <p className="text-gray-400 text-lg">130 Questions • Physics • Chemistry • Mathematics • English & LR</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400 mb-2">30</div>
              <div className="text-gray-300">Physics</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">30</div>
              <div className="text-gray-300">Chemistry</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">40</div>
              <div className="text-gray-300">Mathematics</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-orange-400 mb-2">30</div>
              <div className="text-gray-300">English & LR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
