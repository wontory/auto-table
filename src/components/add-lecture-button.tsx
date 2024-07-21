import { useLectureModalContext } from '~/contexts/lecture-modal-context'
import type { Subject } from '~/schemas/subject'

export function AddLectureButton({ subject }: { subject: Subject }) {
  const { openLectureModal } = useLectureModalContext()

  return (
    <button type="button" className="btn btn-secondary w-full" onClick={() => openLectureModal(subject)}>
      강의 추가
    </button>
  )
}
