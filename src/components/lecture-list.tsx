import { LectureItem } from '~/components/lecture-item'
import { useLectureModal } from '~/contexts/lecture-modal'
import type { Subject } from '~/schemas/subject'

export function LectureList({ subject }: { subject: Subject }) {
  const { openLectureModal } = useLectureModal()

  const handleCreate = () => {
    openLectureModal(subject)
  }

  return (
    <>
      {subject.lectures.length > 0 && (
        <div className="mb-4 flex flex-col gap-2">
          {subject.lectures.map((lecture) => (
            <LectureItem key={`lecture-${subject.index}-${lecture.index}`} subject={subject} lecture={lecture} />
          ))}
        </div>
      )}
      <button type="button" className="btn btn-secondary w-full" onClick={handleCreate}>
        강의 추가
      </button>
    </>
  )
}
