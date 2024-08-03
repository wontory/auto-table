'use client'

import { useAtomValue } from 'jotai'

import { subjectsAtom } from '~/atoms/subjects'
import { SubjectCollapse } from '~/components/subject-collapse'
import { useSubjectModal } from '~/contexts/subject-modal'

export function SubjectList() {
  const { openSubjectModal } = useSubjectModal()
  const subjects = useAtomValue(subjectsAtom)

  return (
    <>
      {subjects.length > 0 && (
        <div className="mb-4 flex flex-col gap-4">
          {subjects.map((subject) => (
            <SubjectCollapse key={`subject-${subject.index}`} subject={subject} />
          ))}
        </div>
      )}
      <button type="button" className="btn btn-primary btn-block" onClick={() => openSubjectModal()}>
        과목 추가
      </button>
    </>
  )
}
