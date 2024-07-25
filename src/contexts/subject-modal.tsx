'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAtomValue, useSetAtom } from 'jotai'
import { createContext, useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { createSubjectAtom, subjectListAtom, updateSubjectAtom } from '~/atoms/subject-list'
import { type Subject, subjectSchema } from '~/schemas/subject'
import { cn } from '~/utils/cn'

export const SubjectModalContext = createContext({ openSubjectModal(subject?: Subject) {} })

export function SubjectModalProvider({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [mode, setMode] = useState<'추가' | '수정'>('추가')
  const subjectList = useAtomValue(subjectListAtom)
  const createSubject = useSetAtom(createSubjectAtom)
  const updateSubject = useSetAtom(updateSubjectAtom)
  const {
    register,
    reset,
    handleSubmit,
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
        index: subjectList.length > 0 ? subjectList[subjectList.length - 1].index + 1 : 0,
        title: '',
        credit: 1,
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
          <p className="py-4">
            <label className={cn('form-control mb-4 w-full', errors.title && '*:input-error *:text-error')}>
              <span className="label label-text">과목명</span>
              <input
                type="text"
                placeholder="차세대프로그래밍언어"
                className="input input-bordered w-full"
                {...register('title')}
              />
              {errors.title && <span className="label label-text-alt">{errors.title.message}</span>}
            </label>
            <label className={cn('form-control w-full', errors.credit && '*:input-error *:text-error')}>
              <span className="label label-text">학점</span>
              <input
                type="number"
                placeholder="3"
                className="input input-bordered w-full"
                {...register('credit', { valueAsNumber: true })}
              />
              {errors.credit && <span className="label label-text-alt">{errors.credit.message}</span>}
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
    </SubjectModalContext.Provider>
  )
}

export const useSubjectModal = () => useContext(SubjectModalContext)
