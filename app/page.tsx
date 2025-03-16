'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { subjectsAtom } from '~/atoms/subjects'
import { timetablesAtom } from '~/atoms/timetables'
import { SubjectList } from '~/components/subject-list'
import type { Timetable } from '~/schemas/timetable'
import { cn } from '~/utils/cn'

export default function Home() {
  const router = useRouter()

  const subjects = useAtomValue(subjectsAtom)
  const setTimetables = useSetAtom(timetablesAtom)

  const isInvalid = subjects.some((subject) => subject.lectures.length === 0)
  const invalidSubjects = subjects.filter((subject) => subject.lectures.length === 0)

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
        <div className={cn(isInvalid && 'tooltip tooltip-bottom tooltip-info')}>
          {isInvalid && (
            <div className="tooltip-content">
              강의 정보를 입력하지 않은 과목이 있어요!
              <br />
              <strong className="text-info-content italic">
                {invalidSubjects.map((subject) => subject.title).join(', ')}
              </strong>
            </div>
          )}
          <button type="button" className="btn btn-info btn-block" onClick={handleSubmit} disabled={isInvalid}>
            시간표 생성
          </button>
        </div>
      ) : null}
    </div>
  )
}
