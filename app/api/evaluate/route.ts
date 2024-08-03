import type { Timetable } from '~/schemas/timetable'

const checkDayOff = (timetable: Timetable) => {
  for (let day = 0; day < 5; day++) {
    for (let period = 0; period < 8; period++) {
      if (timetable.timetable[period][day] !== null) break
      if (period === 7) timetable.score += 7
    }
  }
}

const checkMorningClass = (timetable: Timetable) => {
  for (let day = 0; day < 5; day++) {
    for (let period = 0; period < 3; period++) {
      if (timetable.timetable[period][day] === null) timetable.score += 1.5
    }
  }
}

export async function POST(request: Request) {
  const timetables = (await request.json()) as Timetable[]

  for (const timetable of timetables) {
    checkDayOff(timetable)
    checkMorningClass(timetable)
  }

  return Response.json(timetables)
}
