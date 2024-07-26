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
          <div className="py-4">
            <div className={cn('form-control mb-4 w-full', errors.professor && '*:input-error *:text-error')}>
              <label htmlFor="professor" className="label label-text">
                담당교수
              </label>
              <input
                id="professor"
                type="text"
                placeholder="이은정"
                className="input input-bordered w-full"
                {...register('professor')}
              />
              {errors.professor && <span className="label label-text-alt">{errors.professor.message}</span>}
            </div>
            <div className={cn('form-control mb-4 w-full', errors.day && '*:input-error *:text-error')}>
              <label htmlFor="day" className="label label-text">
                요일
              </label>
              <div id="day" className="join">
                <input className="join-item btn w-1/5" type="radio" value="월" aria-label="월" {...register('day')} />
                <input className="join-item btn w-1/5" type="radio" value="화" aria-label="화" {...register('day')} />
                <input className="join-item btn w-1/5" type="radio" value="수" aria-label="수" {...register('day')} />
                <input className="join-item btn w-1/5" type="radio" value="목" aria-label="목" {...register('day')} />
                <input className="join-item btn w-1/5" type="radio" value="금" aria-label="금" {...register('day')} />
              </div>
              {errors.day && <span className="label label-text-alt">{errors.day.message}</span>}
            </div>
            <div className={cn('form-control w-full', errors.time && '*:input-error *:text-error')}>
              <label htmlFor="time" className="label label-text">
                교시
              </label>
              <input
                id="time"
                type="text"
                placeholder={'123'.slice(0, subject?.credit ?? 0)}
                maxLength={subject?.credit ?? 0}
                className="input input-bordered w-full"
                {...register('time')}
              />
              {errors.time && <span className="label label-text-alt">{errors.time.message}</span>}
            </div>
          </div>
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
