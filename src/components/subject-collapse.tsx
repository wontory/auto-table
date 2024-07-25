import { useSetAtom } from 'jotai'

import { deleteSubjectAtom } from '~/atoms/subject-list'
import { ButtonControl } from '~/components/button-control'
import { LectureList } from '~/components/lecture-list'
import { useSubjectModal } from '~/contexts/subject-modal'
import type { Subject } from '~/schemas/subject'

export function SubjectCollapse({ subject }: { subject: Subject }) {
  const { openSubjectModal } = useSubjectModal()
  const deleteSubject = useSetAtom(deleteSubjectAtom)

  return (
    <details className="collapse-arrow collapse bg-base-200">
      <summary className="collapse-title">
        <div className="flex items-center justify-between gap-4 font-medium text-xl">
          <div className="flex items-center gap-4">
            <div className="badge badge-primary badge-lg aspect-square">{subject.credit}</div>
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
