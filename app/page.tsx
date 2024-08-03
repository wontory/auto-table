'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { subjectsAtom } from '~/atoms/subjects'
import { timetablesAtom } from '~/atoms/timetables'
import { SubjectList } from '~/components/subject-list'
import type { Timetable } from '~/schemas/timetable'

export default function Home() {
  const router = useRouter()

  const subjects = useAtomValue(subjectsAtom)
  const setTimetables = useSetAtom(timetablesAtom)

  const handleSubmit = async () => {
    const timetables = (await fetch('/api/combine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subjects),
    }).then((res) => res.json())) as Timetable[]

    const evaluatedTimetables = (await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timetables),
    }).then((res) => res.json())) as Timetable[]

    setTimetables(evaluatedTimetables)

    router.push('/result')
  }

  return (
    <div className="flex flex-col gap-4">
      <SubjectList />
      {subjects.length ? (
        <button type="button" className="btn btn-info btn-block" onClick={handleSubmit}>
          시간표 생성
        </button>
      ) : (
        <></>
      )}
    </div>
  )
}
