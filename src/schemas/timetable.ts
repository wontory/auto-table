import type { z } from 'zod'

import type { subjectSchema } from '~/schemas/subject'

export type Timetable = {
  index: number
  score: number
  timetable: (z.infer<typeof subjectSchema> | null)[][]
}
