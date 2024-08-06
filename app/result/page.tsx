'use client'

import { useAtomValue } from 'jotai'
import { CircleXIcon, ZoomInIcon } from 'lucide-react'

import { timetablesAtom } from '~/atoms/timetables'
import { Table } from '~/components/table'
import { badges } from '~/constants/badges'
import { useTimetableModal } from '~/contexts/timetable-modal'
import { cn } from '~/utils/cn'

export default function Result() {
  const { openTimetableModal } = useTimetableModal()

  const timetables = useAtomValue(timetablesAtom)

  return (
    <div className="flex flex-col gap-4">
      {timetables.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {timetables
            .sort((a, b) => b.score - a.score)
            .map((timetable, index) => (
              <div key={`timetable-${timetable.index}`} className="card bg-base-200">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <h2 className="card-title">시간표 {index + 1}</h2>
                    <div className="flex gap-2">
                      {timetable.tags.map((tag) => (
                        <div key={`tag-${index}-${tag}`} className={cn('badge badge-lg', badges[tag])}>
                          {tag}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm btn-square ml-auto"
                      onClick={() => openTimetableModal(timetable)}
                    >
                      <ZoomInIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="aspect-square w-full">
                    <Table timetable={timetable} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div role="alert" className="alert alert-error">
          <CircleXIcon className="h-6 w-6 shrink-0 stroke-current" />
          <span>가능한 조합이 없어요. 강의 정보를 수정해주세요.</span>
        </div>
      )}
    </div>
  )
}
