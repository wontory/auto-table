'use client'

import { useAtom } from 'jotai'
import { EditIcon, Trash2Icon } from 'lucide-react'

import { subjectListAtom } from '~/atoms/subject-list'
import { AddLectureButton } from '~/components/add-lecture-button'
import { LectureList } from '~/components/lecture-list'
import { useSubjectModalContext } from '~/contexts/subject-modal-context'
import type { Subject } from '~/schemas/subject'
import { cn } from '~/utils/cn'

export function SubjectList({ className }: { className?: string }) {
  const { openSubjectModal } = useSubjectModalContext()
  const [subjectList, setSubjectList] = useAtom(subjectListAtom)

  const handleEdit = (subject: Subject) => {
    openSubjectModal(subject)
  }

  const handleDelete = (subject: Subject) => {
    setSubjectList((prev) => prev.filter((s) => s.title !== subject.title))
  }

  return (
    subjectList.length > 0 && (
      <div className={cn('flex flex-col gap-4', className)}>
        {subjectList.map((subject) => (
          <div key={subject.index} className="collapse-arrow collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title flex items-center gap-4 font-medium text-xl">
              <div className="badge badge-primary badge-lg">{subject.credit}</div>
              <span>{subject.title}</span>
              <div className="z-50 flex gap-2">
                <button
                  type="button"
                  className="btn btn-square btn-outline btn-sm btn-success bg-base-100"
                  onClick={() => handleEdit(subject)}
                >
                  <EditIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="btn btn-square btn-outline btn-sm btn-error bg-base-100"
                  onClick={() => handleDelete(subject)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="collapse-content">
              <LectureList subject={subject} className="mb-4" />
              <AddLectureButton subject={subject} />
            </div>
          </div>
        ))}
      </div>
    )
  )
}
