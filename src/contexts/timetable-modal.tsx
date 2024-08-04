'use client'

import { createContext, useContext, useRef, useState } from 'react'
import { Table } from '~/components/table'
import { TableDetails } from '~/components/table-details'
import type { Timetable } from '~/schemas/timetable'

export const TimetableModalContext = createContext({ openTimetableModal(timetable: Timetable) {} })

export function TimetableModalProvider({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [timetable, setTimetable] = useState<Timetable | null>(null)

  const openTimetableModal = (timetable: Timetable) => {
    setTimetable(timetable)
    modalRef.current?.showModal()
  }

  return (
    <TimetableModalContext.Provider value={{ openTimetableModal }}>
      {children}
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          {timetable && (
            <div className="flex flex-col gap-4 overflow-scroll">
              <Table timetable={timetable} />
              <TableDetails combination={timetable.combination} />
            </div>
          )}
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => modalRef.current?.close()}>
              닫기
            </button>
          </div>
        </div>
      </dialog>
    </TimetableModalContext.Provider>
  )
}

export const useTimetableModal = () => useContext(TimetableModalContext)
