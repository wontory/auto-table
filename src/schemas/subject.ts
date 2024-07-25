import { z } from 'zod'

import { lectureSchema } from '~/schemas/lecture'

export const subjectSchema = z.object({
  index: z.number(),
  title: z.string().min(1, {
    message: '과목명을 입력해주세요.',
  }),
  credit: z.number().min(1).max(3),
  lectures: z.array(lectureSchema),
})

export type Subject = z.infer<typeof subjectSchema>
