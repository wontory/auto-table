import { z } from 'zod'

export const lectureSchema = z.object({
  professor: z.string(),
  day: z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI']),
  time: z.string(),
})

export type Lecture = z.infer<typeof lectureSchema>
