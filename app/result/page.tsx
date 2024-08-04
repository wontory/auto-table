'use client'

import { useAtomValue } from 'jotai'
import { Undo2Icon, ZoomInIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { timetablesAtom } from '~/atoms/timetables'
import { Table } from '~/components/table'
import { badges } from '~/constants/badges'
import { useTimetableModal } from '~/contexts/timetable-modal'
import { cn } from '~/utils/cn'

export default function Result() {
  const router = useRouter()
  const { openTimetableModal } = useTimetableModal()

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
        <>생성된 시간표가 없어요.</>
      )}
    </div>
  )
}
