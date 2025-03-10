import { useSetAtom } from 'jotai'

import { deleteSubjectAtom } from '~/atoms/subjects'
import { ButtonControl } from '~/components/button-control'
import { LectureList } from '~/components/lecture-list'
import { badgeColors } from '~/constants/badge-colors'
import { useSubjectModal } from '~/contexts/subject-modal'
import type { Subject } from '~/schemas/subject'
import { cn } from '~/utils/cn'

export function SubjectCollapse({ subject }: { subject: Subject }) {
  const { openSubjectModal } = useSubjectModal()
  const deleteSubject = useSetAtom(deleteSubjectAtom)

  return (
    <details className="collapse-arrow collapse bg-base-200">
      <summary className="collapse-title">
        <div className="flex items-center justify-between gap-4 font-medium text-xl">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                badgeColors.find((color) => color.includes(subject.color)),
                'badge badge-lg aspect-square text-black',
              )}
            >
              {subject.credit}
            </div>
            <span className="line-clamp-1">{subject.title}</span>
          </div>
          <ButtonControl onClickUpdate={() => openSubjectModal(subject)} onClickDelete={() => deleteSubject(subject)} />
        </div>
      </summary>
      <div className="collapse-content">
        <LectureList subject={subject} />
      </div>
    </details>
  )
}
