import { days } from '~/constants/days'
import type { Subject } from '~/schemas/subject'
import type { Timetable } from '~/schemas/timetable'

export async function POST(request: Request) {
  const subjects = (await request.json()) as Subject[]
  const combination: Subject[] = []
  const timetables: Timetable[] = []

  const combine = (depth = 0) => {
    if (depth === subjects.length) {
      const table: Timetable['timetable'] = Array.from({ length: 8 }, () => Array.from({ length: 5 }, () => null))

      for (const subject of combination) {
        if (subject.lectures[0].time) {
          for (const time of Array.from(subject.lectures[0].time, (arg) => Number(arg) - 1)) {
            table[time][days.indexOf(subject.lectures[0].day)] = subject
          }
        }
      }

      return timetables.push({ index: timetables.length, score: 0, timetable: table })
    }

    for (const lecture of subjects[depth].lectures) {
      const isReserved = combination.some(
        (subject) =>
          lecture.day === subject.lectures[0].day &&
          (lecture.time.includes(subject.lectures[0].time.charAt(0)) ||
            subject.lectures[0].time.includes(lecture.time.charAt(0))),
      )

      if (!isReserved) {
        combination[depth] = {
          ...subjects[depth],
          lectures: [lecture],
        }

        combine(depth + 1)

        combination.pop()
      }
    }
  }

  combine()

  return Response.json(timetables)
}
