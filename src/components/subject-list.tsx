'use client'

import { useAtomValue } from 'jotai'

import { wishListAtom } from '~/atoms/wish-list'
import { SubjectCollapse } from '~/components/subject-collapse'
import { useSubjectModal } from '~/contexts/subject-modal'

export function SubjectList() {
  const { openSubjectModal } = useSubjectModal()
  const wishList = useAtomValue(wishListAtom)

  return (
    <>
      {wishList.length > 0 && (
        <div className="mb-4 flex flex-col gap-4">
          {wishList.map((subject) => (
            <SubjectCollapse key={subject.index} subject={subject} />
          ))}
        </div>
      )}
      <button type="button" className="btn btn-primary w-full" onClick={() => openSubjectModal()}>
        과목 추가
      </button>
    </>
  )
}
