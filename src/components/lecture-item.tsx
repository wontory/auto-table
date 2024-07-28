import { useSetAtom } from 'jotai'

import { deleteLectureAtom } from '~/atoms/subjects'
import { ButtonControl } from '~/components/button-control'
import { useLectureModal } from '~/contexts/lecture-modal'
import type { Lecture } from '~/schemas/lecture'
import type { Subject } from '~/schemas/subject'

export function LectureItem({ subject, lecture }: { subject: Subject; lecture: Lecture }) {
  const { openLectureModal } = useLectureModal()
  const deleteLecture = useSetAtom(deleteLectureAtom)

  return (
    <div className="alert flex justify-between bg-base-100">
      <div className="flex items-center gap-2">
        <div className="badge badge-neutral badge-lg line-clamp-1 text-neutral-content">{lecture.professor}</div>
        <div className="badge badge-accent badge-lg aspect-square text-accent-content">{lecture.day}</div>
        <div className="badge badge-info badge-lg text-info-content">{lecture.time}</div>
      </div>
      <ButtonControl
        onClickUpdate={() => openLectureModal(subject, lecture)}
        onClickDelete={() => deleteLecture(subject, lecture)}
      />
    </div>
  )
}
