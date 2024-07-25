import { useSetAtom } from 'jotai'
import { EditIcon, Trash2Icon } from 'lucide-react'

import { subjectListAtom } from '~/atoms/subject-list'
import { LectureList } from '~/components/lecture-list'
import { useSubjectModal } from '~/contexts/subject-modal'
import type { Subject } from '~/schemas/subject'

export function SubjectCollapse({ subject }: { subject: Subject }) {
  const { openSubjectModal } = useSubjectModal()
  const setSubjectList = useSetAtom(subjectListAtom)

  const handleUpdate = () => {
    openSubjectModal(subject)
  }

  const handleDelete = () => {
    setSubjectList((prev) => prev.filter((s) => s.index !== subject.index))
  }

  return (
    <details className="collapse-arrow collapse bg-base-200">
      <summary className="collapse-title">
        <div className="flex items-center justify-between gap-4 font-medium text-xl">
          <div className="flex items-center gap-4">
            <div className="badge badge-primary badge-lg aspect-square">{subject.credit}</div>
            <span className="line-clamp-1">{subject.title}</span>
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
      </summary>
      <div className="collapse-content">
        <LectureList subject={subject} />
      </div>
    </details>
  )
}
