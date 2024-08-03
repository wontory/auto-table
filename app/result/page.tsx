'use client'

import { useAtomValue } from 'jotai'

import { timetablesAtom } from '~/atoms/timetables'
import { Table } from '~/components/table'

export default function Result() {
  const timetables = useAtomValue(timetablesAtom)

  return timetables.length ? (
    <div className="grid gap-4 lg:grid-cols-2">
      {timetables
        .sort((a, b) => b.score - a.score)
        .map((timetable, index) => (
          <div key={`timetable-${timetable.index}`} className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">시간표 {index + 1}</h2>
              <Table timetable={timetable} />
            </div>
          </div>
        ))}
    </div>
  ) : (
    <>생성된 시간표가 없어요.</>
  )
}
