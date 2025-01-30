'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAtomValue, useSetAtom } from 'jotai'
import { createContext, useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { createSubjectAtom, subjectsAtom, updateSubjectAtom } from '~/atoms/subjects'
import { selectColors } from '~/constants/select-colors'
import { type Subject, subjectSchema } from '~/schemas/subject'
import { cn } from '~/utils/cn'

export const SubjectModalContext = createContext({ openSubjectModal(subject?: Subject) {} })

export function SubjectModalProvider({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [mode, setMode] = useState<'추가' | '수정'>('추가')
  const subjects = useAtomValue(subjectsAtom)
  const createSubject = useSetAtom(createSubjectAtom)
  const updateSubject = useSetAtom(updateSubjectAtom)
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
  })

  const openSubjectModal = (subject?: Subject) => {
    if (subject) {
      reset(subject)
      setMode('수정')
    } else {
      reset({
        index: subjects.length > 0 ? subjects[subjects.length - 1].index + 1 : 0,
        title: '',
        credit: 3,
        color: 'primary',
        lectures: [],
      })
      setMode('추가')
    }
    modalRef.current?.showModal()
  }

  const onSubmit = (data: z.infer<typeof subjectSchema>) => {
    switch (mode) {
      case '추가':
        createSubject(data)
        break
      case '수정':
        updateSubject(data)
        break
    }
    modalRef.current?.close()
  }

  return (
    <SubjectModalContext.Provider value={{ openSubjectModal }}>
      {children}
      <dialog className="modal" ref={modalRef}>
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">과목 {mode}</h3>
          <div className="flex flex-col gap-4 py-4">
            <div className={cn('form-control w-full', errors.title && '*:input-error *:text-error')}>
              <label htmlFor="title" className="label label-text">
                과목명
              </label>
              <input
                id="title"
                type="text"
                placeholder="차세대프로그래밍언어"
                className="input input-bordered w-full"
                {...register('title')}
              />
              {errors.title && <span className="label label-text-alt">{errors.title.message}</span>}
            </div>
            <div className="form-control w-full">
              <label htmlFor="credit" className="label label-text">
                학점
              </label>
              <input
                id="credit"
                type="range"
                min={1}
                max={6}
                step={1}
                className="range range-primary"
                {...register('credit', { valueAsNumber: true })}
              />
              <div className="mt-2 flex w-full justify-between px-2 text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
              </div>
            </div>
          </div>
          <div className="form-control w-full">
            <label htmlFor="credit" className="label label-text">
              색
            </label>
            <select
              className={cn(
                selectColors.find((color) => color.includes(watch('color'))),
                'select w-full',
              )}
              {...register('color')}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="accent">Accent</option>
              <option value="neutral">Neutral</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
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
    </SubjectModalContext.Provider>
  )
}

export const useSubjectModal = () => useContext(SubjectModalContext)
