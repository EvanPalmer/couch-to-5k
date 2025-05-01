"use client"

import { use } from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { programData } from "@/lib/program-data"

export default function WorkoutDetail({ params }: { params: Promise<{ weekId: string; workoutId: string }> }) {
  const resolvedParams = use(params)
  const weekId = Number.parseInt(resolvedParams.weekId)
  const workoutId = Number.parseInt(resolvedParams.workoutId)

  const [program, setProgram] = useState(programData)
  const [isLoading, setIsLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(-1)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const weekData = program.find((week) => week.id === weekId)
  const workoutData = weekData?.workouts[workoutId]

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Initialize audio context
  useEffect(() => {
    try {
      // AudioContext must be created after user interaction in some browsers
      const handleUserInteraction = () => {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
      }

      window.addEventListener("click", handleUserInteraction, { once: true })

      return () => {
        window.removeEventListener("click", handleUserInteraction)
        // Clean up audio context
        if (audioContextRef.current && audioContextRef.current.state !== "closed") {
          audioContextRef.current.close()
        }
      }
    } catch (error) {
      console.error("Error initializing audio context:", error)
      setAudioError(true)
    }
  }, [])

  // Load program progress from localStorage
  useEffect(() => {
    const storedProgress = localStorage.getItem("c25kProgress")
    if (storedProgress) {
      setProgram(JSON.parse(storedProgress))
    }
    setIsLoading(false)

    return () => {
      // Clean up timer on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Calculate total workout duration
  const totalDuration = workoutData?.intervals.reduce((total, interval) => total + interval.duration, 0) || 0

  // Play a beep tone
  const playTone = (frequency = 880, duration = 200, volume = 0.5) => {
    if (!soundEnabled) return

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.type = "sine"
      oscillator.frequency.value = frequency
      gainNode.gain.value = volume

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.start()

      setTimeout(() => {
        oscillator.stop()
      }, duration)
    } catch (error) {
      console.error("Error playing tone:", error)
      setAudioError(true)
    }
  }

  // Speak text using Web Speech API
  const speak = (text: string) => {
    if (!soundEnabled) return

    try {
      if ("speechSynthesis" in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 1
        utterance.pitch = 1
        utterance.volume = 1
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.error("Error with speech synthesis:", error)
      setAudioError(true)
    }
  }

  // Start the workout
  const startWorkout = () => {
    setIsRunning(true)
    setCurrentIntervalIndex(0)
    setTimeRemaining(workoutData?.intervals[0].duration || 0)
    setTotalElapsed(0)

    // Play the first audio cue
    if (workoutData?.intervals[0].type === "walk") {
      speak("Walk")
    } else {
      speak("Run")
    }

    // Start the timer
    startTimer()
  }

  // Start the timer
  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        // Play countdown tones for the last 4 seconds
        if (prev <= 4 && prev > 0) {
          playTone(880, 200, 0.3) // Higher pitch, shorter duration for countdown
        }

        if (prev <= 1) {
          // Move to next interval
          setCurrentIntervalIndex((currentIndex) => {
            const nextIndex = currentIndex + 1

            // Check if workout is complete
            if (nextIndex >= (workoutData?.intervals.length || 0)) {
              clearInterval(timerRef.current!)
              setIsRunning(false)
              setCompleted(true)
              markWorkoutCompleted()
              speak("Workout complete")
              return currentIndex
            }

            // Play audio for the next interval
            if (workoutData?.intervals[nextIndex].type === "walk") {
              speak("Walk")
            } else {
              speak("Run")
            }

            // Set time for next interval
            setTimeRemaining(workoutData?.intervals[nextIndex].duration || 0)
            return nextIndex
          })
          return 0
        }
        return prev - 1
      })

      setTotalElapsed((prev) => prev + 1)
    }, 1000)
  }

  // Pause the workout
  const pauseWorkout = () => {
    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Resume the workout
  const resumeWorkout = () => {
    setIsRunning(true)
    startTimer()
  }

  // Reset the workout
  const resetWorkout = () => {
    setIsRunning(false)
    setCurrentIntervalIndex(-1)
    setTimeRemaining(0)
    setTotalElapsed(0)
    setCompleted(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Toggle sound on/off
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  // Mark workout as completed
  const markWorkoutCompleted = () => {
    const updatedProgram = [...program]
    const weekIndex = updatedProgram.findIndex((week) => week.id === weekId)

    if (weekIndex !== -1) {
      updatedProgram[weekIndex] = {
        ...updatedProgram[weekIndex],
        workouts: updatedProgram[weekIndex].workouts.map((workout, idx) =>
          idx === workoutId ? { ...workout, completed: true } : workout,
        ),
      }

      setProgram(updatedProgram)
      localStorage.setItem("c25kProgress", JSON.stringify(updatedProgram))
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle progress bar click
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only allow clicking if workout has started and isn't completed
    if (currentIntervalIndex === -1 || completed || !workoutData) return

    const progressBar = progressBarRef.current
    if (!progressBar) return

    // Calculate click position as percentage
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const clickPercentage = clickPosition / rect.width

    // Calculate target time in seconds
    const targetTime = Math.floor(clickPercentage * totalDuration)

    // Find the corresponding interval
    let accumulatedTime = 0
    let targetIntervalIndex = 0
    let timeRemainingInInterval = 0

    for (let i = 0; i < workoutData.intervals.length; i++) {
      const intervalDuration = workoutData.intervals[i].duration

      if (accumulatedTime + intervalDuration > targetTime) {
        // Found the interval
        targetIntervalIndex = i
        timeRemainingInInterval = accumulatedTime + intervalDuration - targetTime
        break
      }

      accumulatedTime += intervalDuration
    }

    // Update state
    setCurrentIntervalIndex(targetIntervalIndex)
    setTimeRemaining(timeRemainingInInterval)
    setTotalElapsed(targetTime)

    // Announce the current activity
    if (workoutData.intervals[targetIntervalIndex].type === "walk") {
      speak("Walk")
    } else {
      speak("Run")
    }

    // If paused, don't restart the timer
    if (!isRunning) return

    // Restart the timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    startTimer()
  }

  // Handle interval click in timeline
  const handleIntervalClick = (intervalIndex: number) => {
    // Only allow clicking if workout has started and isn't completed
    if (currentIntervalIndex === -1 || completed || !workoutData) return

    // Calculate total elapsed time up to this interval
    let totalElapsedTime = 0
    for (let i = 0; i < intervalIndex; i++) {
      totalElapsedTime += workoutData.intervals[i].duration
    }

    // Update state
    setCurrentIntervalIndex(intervalIndex)
    setTimeRemaining(workoutData.intervals[intervalIndex].duration)
    setTotalElapsed(totalElapsedTime)

    // Announce the current activity
    if (workoutData.intervals[intervalIndex].type === "walk") {
      speak("Walk")
    } else {
      speak("Run")
    }

    // If paused, don't restart the timer
    if (!isRunning) return

    // Restart the timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    startTimer()
  }

  // Calculate progress percentage
  const progressPercentage = totalDuration > 0 ? (totalElapsed / totalDuration) * 100 : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-600 mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!weekData || !workoutData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-xl font-bold text-red-600 mb-4">Workout not found</h1>
          <Link href={`/week/${weekId}`} className="text-indigo-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to week
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Link href={`/week/${weekId}`} className="mr-3">
                  <ArrowLeft className="h-5 w-5 text-indigo-600" />
                </Link>
                <h1 className="text-2xl font-bold text-indigo-600">
                  Week {weekId} - Workout {workoutId + 1}
                </h1>
              </div>
              <button
                onClick={toggleSound}
                className="text-gray-500 hover:text-indigo-600"
                aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
            </div>

            {completed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-green-700 mb-2">Workout Complete!</h2>
                <p className="text-green-600 mb-4">Great job! You've completed this workout.</p>
                <button
                  onClick={resetWorkout}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Start Again
                </button>
              </div>
            ) : (
              <>
                {currentIntervalIndex === -1 ? (
                  <div className="mb-6">
                    <p className="text-gray-700 mb-4">{workoutData.instructions}</p>
                    {audioError && (
                      <div className="text-yellow-600 text-sm mb-4 p-2 bg-yellow-50 rounded border border-yellow-200">
                        Note: There might be issues with audio cues on this device.
                      </div>
                    )}
                    <button
                      onClick={startWorkout}
                      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-md text-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Workout
                    </button>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-indigo-600">
                        {formatTime(totalElapsed)} / {formatTime(totalDuration)}
                      </span>
                    </div>
                    <div
                      ref={progressBarRef}
                      className="w-full bg-gray-200 rounded-full h-5 mb-4 cursor-pointer relative overflow-hidden"
                      onClick={handleProgressBarClick}
                      title="Click to navigate to a specific point in the workout"
                    >
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-white mix-blend-difference">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                    </div>

                    <div
                      className={`text-center p-8 mb-4 rounded-lg ${
                        workoutData.intervals[currentIntervalIndex].type === "walk"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <h2 className="text-3xl font-bold mb-2">
                        {workoutData.intervals[currentIntervalIndex].type === "walk" ? "WALK" : "RUN"}
                      </h2>
                      <p className="text-4xl font-mono">{formatTime(timeRemaining)}</p>
                      {timeRemaining <= 4 && (
                        <p className="text-lg mt-2 font-semibold animate-pulse">
                          Get ready to {workoutData.intervals[currentIntervalIndex].type === "walk" ? "run" : "walk"}!
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      {isRunning ? (
                        <button
                          onClick={pauseWorkout}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                        >
                          <Pause className="h-5 w-5 mr-2" />
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={resumeWorkout}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Resume
                        </button>
                      )}
                      <button
                        onClick={resetWorkout}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Workout Timeline</h2>
            <div className="space-y-2">
              {workoutData.intervals.map((interval, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-3 flex justify-between items-center ${
                    currentIntervalIndex === index
                      ? interval.type === "walk"
                        ? "border-blue-300 bg-blue-50"
                        : "border-red-300 bg-red-50"
                      : index < currentIntervalIndex
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200"
                  } ${currentIntervalIndex !== -1 && !completed ? "cursor-pointer hover:border-indigo-300 hover:bg-indigo-50" : ""}`}
                  onClick={() => currentIntervalIndex !== -1 && !completed && handleIntervalClick(index)}
                  title={currentIntervalIndex !== -1 && !completed ? "Click to jump to this interval" : ""}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${interval.type === "walk" ? "bg-blue-500" : "bg-red-500"}`}
                    ></div>
                    <span className="font-medium capitalize">{interval.type}</span>
                  </div>
                  <div className="text-sm text-gray-500">{formatTime(interval.duration)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
