import { z } from 'zod'

import { lectureSchema } from '~/schemas/lecture'

export const subjectSchema = z.object({
  index: z.number(),
  title: z.string().min(1, {
    message: '과목명을 입력해주세요.',
  }),
  credit: z
    .number({
      message: '학점은 숫자로 입력해주세요.',
    })
    .min(1, {
      message: '최소 1학점 이상 입력해주세요.',
    })
    .max(3, {
      message: '최대 3학점까지 입력할 수 있습니다.',
    }),
  lectures: z.array(lectureSchema),
})

export type Subject = z.infer<typeof subjectSchema>
