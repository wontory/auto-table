'use client'

import { useSubjectModal } from '~/contexts/subject-modal'

export function AddSubjectButton() {
  const { openSubjectModal } = useSubjectModal()

  return (
    <button type="button" className="btn btn-primary w-full" onClick={() => openSubjectModal()}>
      과목 추가
    </button>
  )
}
