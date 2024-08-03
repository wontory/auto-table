'use client'

import { useAtomValue } from 'jotai'

import { timetablesAtom } from '~/atoms/timetables'
import { Table } from '~/components/table'

export default function Result() {
  const timetables = useAtomValue(timetablesAtom)

  return timetables.length ? (
    <div className="grid gap-4 lg:grid-cols-2">
      {timetables.map((timetable) => (
        <div key={`timetable-${timetable.index}`} className="card bg-base-200">
          <div className="card-body">
            <Table timetable={timetable} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <>생성된 시간표가 없어요.</>
  )
}
