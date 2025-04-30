"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"
import { programData } from "@/lib/program-data"

export default function Home() {
  const [program, setProgram] = useState(programData)
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null)

  // Load program progress from localStorage on initial render
  useEffect(() => {
    const storedProgress = localStorage.getItem("c25kProgress")
    if (storedProgress) {
      setProgram(JSON.parse(storedProgress))
    }
  }, [])

  // Save program progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("c25kProgress", JSON.stringify(program))
  }, [program])

  // Handle PWA installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setInstallPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("ServiceWorker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err)
          },
        )
      })
    }
  }, [])

  const installApp = async () => {
    if (!installPrompt) return

    // Show the install prompt
    const promptEvent = installPrompt as any
    promptEvent.prompt()

    // Wait for the user to respond to the prompt
    const choiceResult = await promptEvent.userChoice

    // Reset the install prompt variable
    setInstallPrompt(null)

    console.log("User choice:", choiceResult.outcome)
  }

  // Calculate overall progress
  const totalWorkouts = program.reduce((sum, week) => sum + week.workouts.length, 0)
  const completedWorkouts = program.reduce(
    (sum, week) => sum + week.workouts.filter((workout) => workout.completed).length,
    0,
  )
  const progressPercentage = Math.round((completedWorkouts / totalWorkouts) * 100)

  // Check if a week is fully completed
  const isWeekCompleted = (week: (typeof program)[0]) => {
    return week.workouts.every((workout) => workout.completed)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-indigo-600">Couch to 5K Guide</h1>
              {installPrompt && (
                <button
                  onClick={installApp}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Install App
                </button>
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-indigo-600">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Program Weeks</h2>
            <div className="space-y-4">
              {program.map((week) => {
                const isCompleted = isWeekCompleted(week)
                const completedWorkoutsCount = week.workouts.filter((w) => w.completed).length

                return (
                  <Link href={`/week/${week.id}`} key={week.id}>
                    <div
                      className={`border rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer ${
                        isCompleted
                          ? "border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium text-gray-800">Week {week.id}</h3>
                        <div className="flex items-center">
                          <div className="flex items-center text-sm mr-2">
                            <CheckCircle
                              className={`h-4 w-4 mr-1 ${isCompleted ? "text-green-500" : "text-indigo-500"}`}
                            />
                            <span className={isCompleted ? "text-green-600" : "text-gray-500"}>
                              {completedWorkoutsCount}/{week.workouts.length}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{week.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{week.duration} min</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{week.workouts.length} workouts</span>
                        </div>
                      </div>

                      {isCompleted && (
                        <div className="mt-2 text-sm font-medium text-green-600 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Week completed
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
