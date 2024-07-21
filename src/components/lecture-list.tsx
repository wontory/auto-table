import { useSetAtom } from 'jotai'
import { EditIcon, Trash2Icon } from 'lucide-react'

import { subjectListAtom } from '~/atoms/subject-list'
import { useLectureModal } from '~/contexts/lecture-modal'
import type { Lecture } from '~/schemas/lecture'
import type { Subject } from '~/schemas/subject'
import { cn } from '~/utils/cn'

export function LectureList({ className, subject }: { className?: string; subject: Subject }) {
  const { openLectureModal } = useLectureModal()
  const setSubjectList = useSetAtom(subjectListAtom)

  const handleEdit = (lecture: Lecture) => {
    openLectureModal(subject, lecture)
  }

  const handleDelete = (lecture: Lecture) => {
    setSubjectList((prev) =>
      prev.map((s) =>
        s.index === subject.index ? { ...s, lectures: s.lectures.filter((l) => l.index !== lecture.index) } : s,
      ),
    )
  }

  return (
    subject.lectures.length > 0 && (
      <div className={cn('flex flex-col gap-2', className)}>
        {subject.lectures.map((lecture) => (
          <div key={`lecture-${subject.index}-${lecture.index}`} className="alert flex justify-between bg-base-100">
            <span>
              {lecture.professor} / {lecture.day} {lecture.time}
            </span>
            <div className="z-50 flex gap-2">
              <button
                type="button"
                className="btn btn-square btn-outline btn-sm btn-success bg-base-100"
                onClick={() => handleEdit(lecture)}
              >
                <EditIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="btn btn-square btn-outline btn-sm btn-error bg-base-100"
                onClick={() => handleDelete(lecture)}
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  )
}
