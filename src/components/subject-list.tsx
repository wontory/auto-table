'use client'

import { useAtomValue } from 'jotai'

import { subjectListAtom } from '~/atoms/subject-list'
import { SubjectCollapse } from '~/components/subject-collapse'
import { useSubjectModal } from '~/contexts/subject-modal'

export function SubjectList() {
  const { openSubjectModal } = useSubjectModal()
  const subjectList = useAtomValue(subjectListAtom)

  const handleCreate = () => {
    openSubjectModal()
  }

  return (
    <>
      {subjectList.length > 0 && (
        <div className="mb-4 flex flex-col gap-4">
          {subjectList.map((subject) => (
            <SubjectCollapse key={subject.index} subject={subject} />
          ))}
        </div>
      )}
      <button type="button" className="btn btn-primary w-full" onClick={handleCreate}>
        과목 추가
      </button>
    </>
  )
}
