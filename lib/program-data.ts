export interface Workout {
  instructions: string
  completed: boolean
  intervals: {
    duration: number // in seconds
    type: "walk" | "run"
  }[]
}

export interface WeekData {
  id: number
  description: string
  duration: number
  workouts: Workout[]
}

export const programData: WeekData[] = [
  {
    id: 1,
    description: "Alternate 60 seconds of jogging and 90 seconds of walking for a total of 20 minutes.",
    duration: 20,
    workouts: [
      {
        instructions:
          "5-minute warmup walk, then alternate 60 seconds of jogging and 90 seconds of walking for a total of 20 minutes.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 60, type: "run" }, // 60 seconds of jogging
          { duration: 90, type: "walk" }, // 90 seconds of walking
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then alternate 60 seconds of jogging and 90 seconds of walking for a total of 20 minutes.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 60, type: "run" }, // 60 seconds of jogging
          { duration: 90, type: "walk" }, // 90 seconds of walking
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then alternate 60 seconds of jogging and 90 seconds of walking for a total of 20 minutes.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 60, type: "run" }, // 60 seconds of jogging
          { duration: 90, type: "walk" }, // 90 seconds of walking
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
          { duration: 60, type: "run" },
          { duration: 90, type: "walk" },
        ],
      },
    ],
  },
  {
    id: 2,
    description: "Alternate 90 seconds of jogging and 2 minutes of walking for a total of 20 minutes.",
    duration: 20,
    workouts: [
      {
        instructions:
          "5-minute warmup walk, then alternate 90 seconds of jogging and 2 minutes of walking for a total of 20 minutes.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 90, type: "run" }, // 90 seconds of jogging
          { duration: 120, type: "walk" }, // 2 minutes of walking
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then alternate 90 seconds of jogging and 2 minutes of walking for a total of 20 minutes.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 90, type: "run" }, // 90 seconds of jogging
          { duration: 120, type: "walk" }, // 2 minutes of walking
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then alternate 90 seconds of jogging and 2 minutes of walking for a total of 20 minutes.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 90, type: "run" }, // 90 seconds of jogging
          { duration: 120, type: "walk" }, // 2 minutes of walking
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
          { duration: 90, type: "run" },
          { duration: 120, type: "walk" },
        ],
      },
    ],
  },
  {
    id: 3,
    description: "2 repetitions of: 90 seconds jogging, 90 seconds walking, 3 minutes jogging, 3 minutes walking.",
    duration: 22,
    workouts: [
      {
        instructions:
          "5-minute warmup walk, then 2 repetitions of: 90 seconds jogging, 90 seconds walking, 3 minutes jogging, 3 minutes walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          // First repetition
          { duration: 90, type: "run" }, // 90 seconds jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 180, type: "walk" }, // 3 minutes walking
          // Second repetition
          { duration: 90, type: "run" }, // 90 seconds jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 180, type: "walk" }, // 3 minutes walking
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then 2 repetitions of: 90 seconds jogging, 90 seconds walking, 3 minutes jogging, 3 minutes walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          // First repetition
          { duration: 90, type: "run" }, // 90 seconds jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 180, type: "walk" }, // 3 minutes walking
          // Second repetition
          { duration: 90, type: "run" }, // 90 seconds jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 180, type: "walk" }, // 3 minutes walking
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then 2 repetitions of: 90 seconds jogging, 90 seconds walking, 3 minutes jogging, 3 minutes walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          // First repetition
          { duration: 90, type: "run" }, // 90 seconds jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 180, type: "walk" }, // 3 minutes walking
          // Second repetition
          { duration: 90, type: "run" }, // 90 seconds jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 180, type: "walk" }, // 3 minutes walking
        ],
      },
    ],
  },
  {
    id: 4,
    description:
      "3 minutes jogging, 90 seconds walking, 5 minutes jogging, 2.5 minutes walking, 3 minutes jogging, 90 seconds walking, 5 minutes jogging.",
    duration: 25,
    workouts: [
      {
        instructions:
          "5-minute warmup walk, then 3 minutes jogging, 90 seconds walking, 5 minutes jogging, 2.5 minutes walking, 3 minutes jogging, 90 seconds walking, 5 minutes jogging.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 300, type: "run" }, // 5 minutes jogging
          { duration: 150, type: "walk" }, // 2.5 minutes walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 300, type: "run" }, // 5 minutes jogging
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then 3 minutes jogging, 90 seconds walking, 5 minutes jogging, 2.5 minutes walking, 3 minutes jogging, 90 seconds walking, 5 minutes jogging.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 300, type: "run" }, // 5 minutes jogging
          { duration: 150, type: "walk" }, // 2.5 minutes walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 300, type: "run" }, // 5 minutes jogging
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then 3 minutes jogging, 90 seconds walking, 5 minutes jogging, 2.5 minutes walking, 3 minutes jogging, 90 seconds walking, 5 minutes jogging.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 300, type: "run" }, // 5 minutes jogging
          { duration: 150, type: "walk" }, // 2.5 minutes walking
          { duration: 180, type: "run" }, // 3 minutes jogging
          { duration: 90, type: "walk" }, // 90 seconds walking
          { duration: 300, type: "run" }, // 5 minutes jogging
        ],
      },
    ],
  },
  {
    id: 5,
    description:
      "Workout 1: 5 min jog, 3 min walk, 5 min jog, 3 min walk, 5 min jog. Workout 2: 8 min jog, 5 min walk, 8 min jog. Workout 3: 20 min jog.",
    duration: 25,
    workouts: [
      {
        instructions: "5-minute warmup walk, then 5 min jog, 3 min walk, 5 min jog, 3 min walk, 5 min jog.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 300, type: "run" }, // 5 min jog
          { duration: 180, type: "walk" }, // 3 min walk
          { duration: 300, type: "run" }, // 5 min jog
          { duration: 180, type: "walk" }, // 3 min walk
          { duration: 300, type: "run" }, // 5 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 8 min jog, 5 min walk, 8 min jog.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 480, type: "run" }, // 8 min jog
          { duration: 300, type: "walk" }, // 5 min walk
          { duration: 480, type: "run" }, // 8 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 20 min jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1200, type: "run" }, // 20 min jog
        ],
      },
    ],
  },
  {
    id: 6,
    description:
      "Workout 1: 5 min jog, 3 min walk, 8 min jog, 3 min walk, 5 min jog. Workout 2: 10 min jog, 3 min walk, 10 min jog. Workout 3: 25 min jog.",
    duration: 30,
    workouts: [
      {
        instructions: "5-minute warmup walk, then 5 min jog, 3 min walk, 8 min jog, 3 min walk, 5 min jog.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 300, type: "run" }, // 5 min jog
          { duration: 180, type: "walk" }, // 3 min walk
          { duration: 480, type: "run" }, // 8 min jog
          { duration: 180, type: "walk" }, // 3 min walk
          { duration: 300, type: "run" }, // 5 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 10 min jog, 3 min walk, 10 min jog.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 600, type: "run" }, // 10 min jog
          { duration: 180, type: "walk" }, // 3 min walk
          { duration: 600, type: "run" }, // 10 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 25 min jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1500, type: "run" }, // 25 min jog
        ],
      },
    ],
  },
  {
    id: 7,
    description: "25 minute jog.",
    duration: 30,
    workouts: [
      {
        instructions: "5-minute warmup walk, then 25 minute jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1500, type: "run" }, // 25 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 25 minute jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1500, type: "run" }, // 25 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 25 minute jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1500, type: "run" }, // 25 min jog
        ],
      },
    ],
  },
  {
    id: 8,
    description: "28 minute jog.",
    duration: 33,
    workouts: [
      {
        instructions: "5-minute warmup walk, then 28 minute jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1680, type: "run" }, // 28 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 28 minute jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1680, type: "run" }, // 28 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 28 minute jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1680, type: "run" }, // 28 min jog
        ],
      },
    ],
  },
  {
    id: 9,
    description: "30 minute jog.",
    duration: 35,
    workouts: [
      {
        instructions: "5-minute warmup walk, then 30 minute jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1800, type: "run" }, // 30 min jog
        ],
      },
      {
        instructions: "5-minute warmup walk, then 30 minute jog with no walking.",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1800, type: "run" }, // 30 min jog
        ],
      },
      {
        instructions:
          "5-minute warmup walk, then 30 minute jog with no walking. Congratulations, you've completed the Couch to 5K program!",
        completed: false,
        intervals: [
          { duration: 300, type: "walk" }, // 5-minute warmup walk
          { duration: 1800, type: "run" }, // 30 min jog
        ],
      },
    ],
  },
]
