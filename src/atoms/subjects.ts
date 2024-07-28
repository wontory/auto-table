import { atom } from 'jotai'

import type { Lecture } from '~/schemas/lecture'
import type { Subject } from '~/schemas/subject'

export const subjectsAtom = atom<Subject[]>([])

// Subject
export const createSubjectAtom = atom(null, (get, set, subject: Subject) => {
  set(subjectsAtom, [...get(subjectsAtom), subject])
})

export const updateSubjectAtom = atom(null, (get, set, subject: Subject) => {
  set(
    subjectsAtom,
    get(subjectsAtom).map((s) => (s.index === subject.index ? subject : s)),
  )
})

export const deleteSubjectAtom = atom(null, (get, set, subject: Subject) => {
  set(
    subjectsAtom,
    get(subjectsAtom).filter((s) => s.index !== subject.index),
  )
})

// Lecture
export const createLectureAtom = atom(null, (get, set, subject: Subject, lecture: Lecture) => {
  set(
    subjectsAtom,
    get(subjectsAtom).map((s) => (s.index === subject.index ? { ...s, lectures: [...s.lectures, lecture] } : s)),
  )
})

export const updateLectureAtom = atom(null, (get, set, subject: Subject, lecture: Lecture) => {
  set(
    subjectsAtom,
    get(subjectsAtom).map((s) =>
      s.index === subject.index
        ? { ...s, lectures: s.lectures.map((l) => (l.index === lecture.index ? lecture : l)) }
        : s,
    ),
  )
})

export const deleteLectureAtom = atom(null, (get, set, subject: Subject, lecture: Lecture) => {
  set(
    subjectsAtom,
    get(subjectsAtom).map((s) =>
      s.index === subject.index ? { ...s, lectures: s.lectures.filter((l) => l.index !== lecture.index) } : s,
    ),
  )
})
