'use client'

import { useSubjectModalContext } from '~/contexts/lecture-modal-context'

export function AddSubjectButton() {
  const { openSubjectModal } = useSubjectModalContext()

  return (
    <button type="button" className="btn btn-primary w-full" onClick={() => openSubjectModal()}>
      과목 추가
    </button>
  )
}
