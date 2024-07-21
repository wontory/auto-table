import { z } from 'zod'

export const lectureSchema = z.object({
  index: z.number(),
  professor: z.string().min(1, { message: '담당교수를 입력해주세요.' }),
  day: z.enum(['월', '화', '수', '목', '금'], {
    message: '요일은 월, 화, 수, 목, 금 중 하나여야 합니다.',
  }),
  time: z.string().min(1, { message: '교시를 입력해주세요.' }),
})

export type Lecture = z.infer<typeof lectureSchema>
