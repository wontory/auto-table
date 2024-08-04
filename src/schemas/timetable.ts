import type { z } from 'zod'

import type { Tag } from '~/constants/badges'
import type { subjectSchema } from '~/schemas/subject'

export type Timetable = {
  index: number
  score: number
  tags: Tag[]
  timetable: (z.infer<typeof subjectSchema> | null)[][]
}
