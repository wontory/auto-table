import { useSetAtom } from 'jotai'
import { EditIcon, Trash2Icon } from 'lucide-react'

import { subjectListAtom } from '~/atoms/subject-list'
import { useLectureModal } from '~/contexts/lecture-modal'
import type { Lecture } from '~/schemas/lecture'
import type { Subject } from '~/schemas/subject'

export function LectureItem({ subject, lecture }: { subject: Subject; lecture: Lecture }) {
  const { openLectureModal } = useLectureModal()
  const setSubjectList = useSetAtom(subjectListAtom)

  const handleUpdate = () => {
    openLectureModal(subject, lecture)
  }

  const handleDelete = () => {
    setSubjectList((prev) =>
      prev.map((s) =>
        s.index === subject.index ? { ...s, lectures: s.lectures.filter((l) => l.index !== lecture.index) } : s,
      ),
    )
  }

  return (
    <div className="alert flex justify-between bg-base-100">
      <div className="flex items-center gap-2">
        <div className="badge badge-neutral badge-lg line-clamp-1 text-neutral-content">{lecture.professor}</div>
        <div className="badge badge-accent badge-lg aspect-square text-accent-content">{lecture.day}</div>
        <div className="badge badge-info badge-lg text-info-content">{lecture.time}</div>
      </div>
      <div className="z-50 flex gap-2">
        <button
          type="button"
          className="btn btn-square btn-outline btn-sm btn-success bg-base-100"
          onClick={handleUpdate}
        >
          <EditIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="btn btn-square btn-outline btn-sm btn-error bg-base-100"
          onClick={handleDelete}
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
