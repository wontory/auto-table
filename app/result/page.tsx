'use client'

import { useAtomValue } from 'jotai'
import { Undo2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { timetablesAtom } from '~/atoms/timetables'
import { Table } from '~/components/table'

export default function Result() {
  const router = useRouter()

  const timetables = useAtomValue(timetablesAtom)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <button
          type="button"
          className="btn"
          onClick={() => {
            router.back()
          }}
        >
          <Undo2Icon className="h-6 w-6" />
          뒤로가기
        </button>
      </div>
      {timetables.length ? (
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
      )}
    </div>
  )
}
