'use client'

import { Provider as JotaiProvider } from 'jotai'

import { LectureModalProvider } from '~/contexts/lecture-modal'
import { SubjectModalProvider } from '~/contexts/subject-modal'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <SubjectModalProvider>
        <LectureModalProvider>{children}</LectureModalProvider>
      </SubjectModalProvider>
    </JotaiProvider>
  )
}
