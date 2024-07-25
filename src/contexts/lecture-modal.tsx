'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { createContext, useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { createLectureAtom, updateLectureAtom } from '~/atoms/wish-list'
import { type Lecture, lectureSchema } from '~/schemas/lecture'
import type { Subject } from '~/schemas/subject'
import { cn } from '~/utils/cn'

export const LectureModalContext = createContext({ openLectureModal(subject: Subject, lecture?: Lecture) {} })

export function LectureModalProvider({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [subject, setSubject] = useState<Subject>()
  const [mode, setMode] = useState<'추가' | '수정'>('추가')
  const createLecture = useSetAtom(createLectureAtom)
  const updateLecture = useSetAtom(updateLectureAtom)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof lectureSchema>>({
    resolver: zodResolver(lectureSchema),
  })

  const openLectureModal = (subject: Subject, lecture?: Lecture) => {
    setSubject(subject)
    if (lecture) {
      reset(lecture)
      setMode('수정')
    } else {
      reset({
        index: subject.lectures.length > 0 ? subject.lectures[subject.lectures.length - 1].index + 1 : 0,
        professor: '',
        day: '월',
        time: '',
      })
      setMode('추가')
    }
    modalRef.current?.showModal()
  }

  const onSubmit = (data: z.infer<typeof lectureSchema>) => {
    if (subject) {
      switch (mode) {
        case '추가':
          createLecture(subject, data)
          break
        case '수정':
          updateLecture(subject, data)
          break
      }
    } else {
      console.error('Subject is undefined')
    }

    modalRef.current?.close()
  }

  return (
    <LectureModalContext.Provider value={{ openLectureModal }}>
      {children}
      <dialog className="modal" ref={modalRef}>
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">강의 {mode}</h3>
          <p className="py-4">
            <label className={cn('form-control mb-4 w-full', errors.professor && '*:input-error *:text-error')}>
              <span className="label label-text">담당교수</span>
              <input
                type="text"
                placeholder="이은정"
                className="input input-bordered w-full"
                {...register('professor')}
              />
              {errors.professor && <span className="label label-text-alt">{errors.professor.message}</span>}
            </label>
            <label className={cn('form-control w-full', errors.day && '*:input-error *:text-error')}>
              <span className="label label-text">요일</span>
              <input type="string" placeholder="월" className="input input-bordered w-full" {...register('day')} />
              {errors.day && <span className="label label-text-alt">{errors.day.message}</span>}
            </label>
            <label className={cn('form-control w-full', errors.time && '*:input-error *:text-error')}>
              <span className="label label-text">교시</span>
              <input type="string" placeholder="123" className="input input-bordered w-full" {...register('time')} />
              {errors.time && <span className="label label-text-alt">{errors.time.message}</span>}
            </label>
          </p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => modalRef.current?.close()}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              {mode}
            </button>
          </div>
        </form>
      </dialog>
    </LectureModalContext.Provider>
  )
}

export const useLectureModal = () => useContext(LectureModalContext)
