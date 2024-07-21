'use client'

import { useAtom } from 'jotai'
import { EditIcon, Trash2Icon } from 'lucide-react'

import { subjectListAtom } from '~/atoms/subject-list'
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
            <input type="radio" name="subject-accordion" defaultChecked />
            <div className="collapse-title flex items-center gap-4 font-medium text-xl">
              <div className="badge badge-primary badge-lg">{subject.credit}학점</div>
              <span>{subject.title}</span>
              <div className="join z-50">
                <button
                  type="button"
                  className="btn join-item btn-square btn-outline btn-sm btn-info"
                  onClick={() => handleEdit(subject)}
                >
                  <EditIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="btn join-item btn-square btn-outline btn-sm btn-error"
                  onClick={() => handleDelete(subject)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="collapse-content">
              {subject.lectures.map((lecture) => (
                <div key={`lecture-${lecture.day}-${lecture.time}`}>
                  {lecture.professor} {lecture.day} {lecture.time}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  )
}
