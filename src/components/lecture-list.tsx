import { LectureItem } from '~/components/lecture-item'
import { useLectureModal } from '~/contexts/lecture-modal'
import type { Subject } from '~/schemas/subject'

export function LectureList({ subject }: { subject: Subject }) {
  const { openLectureModal } = useLectureModal()

  return (
    <>
      {subject.lectures.length > 0 && (
        <div className="mb-4 flex flex-col gap-2">
          {subject.lectures.map((lecture) => (
            <LectureItem key={`lecture-${subject.index}-${lecture.index}`} subject={subject} lecture={lecture} />
          ))}
        </div>
      )}
      <button type="button" className="btn btn-secondary btn-block" onClick={() => openLectureModal(subject)}>
        강의 추가
      </button>
    </>
  )
}
