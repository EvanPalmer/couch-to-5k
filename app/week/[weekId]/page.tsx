"use client"

import { use } from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Clock, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"
import { programData } from "@/lib/program-data"

export default function WeekDetail({ params }: { params: Promise<{ weekId: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const weekId = Number.parseInt(resolvedParams.weekId)

  const [program, setProgram] = useState(programData)
  const [isLoading, setIsLoading] = useState(true) // Add a loading state
  const weekData = program.find((week) => week.id === weekId)

  useEffect(() => {
    const storedProgress = localStorage.getItem("c25kProgress")
    if (storedProgress) {
      setProgram(JSON.parse(storedProgress))
    }
    setIsLoading(false) // Set loading to false after data is loaded
  }, [])

  // Save program progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("c25kProgress", JSON.stringify(program))
  }, [program])

  const toggleWorkoutCompletion = (workoutIndex: number) => {
    const updatedProgram = [...program]
    const weekIndex = updatedProgram.findIndex((week) => week.id === weekId)

    if (weekIndex !== -1) {
      updatedProgram[weekIndex] = {
        ...updatedProgram[weekIndex],
        workouts: updatedProgram[weekIndex].workouts.map((workout, idx) =>
          idx === workoutIndex ? { ...workout, completed: !workout.completed } : workout,
        ),
      }

      setProgram(updatedProgram)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-600 mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!weekData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-xl font-bold text-red-600 mb-4">Week not found</h1>
          <Link href="/" className="text-indigo-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to program
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Link href="/" className="mr-3">
                <ArrowLeft className="h-5 w-5 text-indigo-600" />
              </Link>
              <h1 className="text-2xl font-bold text-indigo-600">Week {weekData.id}</h1>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">{weekData.description}</p>
            </div>

            <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{weekData.duration} min</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{weekData.workouts.length} workouts</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-indigo-500" />
                <span>
                  {weekData.workouts.filter((w) => w.completed).length}/{weekData.workouts.length} completed
                </span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Workouts</h2>
            <div className="space-y-4">
              {weekData.workouts.map((workout, index) => (
                <Link href={`/week/${weekId}/workout/${index}`} key={index}>
                  <div
                    className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                      workout.completed
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-800">Workout {index + 1}</h3>
                      <div className="flex items-center">
                        {workout.completed ? (
                          <span className="flex items-center text-sm font-medium text-green-600 mr-2">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500 mr-2">Not completed</span>
                        )}
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{workout.instructions}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
