'use client'

import { useAtomValue } from 'jotai'

import { subjectListAtom } from '~/atoms/subject-list'
import { SubjectAccordion } from '~/components/subject-accordion'
import { cn } from '~/utils/cn'

export function SubjectList({ className }: { className?: string }) {
  const subjectList = useAtomValue(subjectListAtom)

  return (
    subjectList.length > 0 && (
      <div className={cn('flex flex-col gap-4', className)}>
        {subjectList.map((subject) => (
          <SubjectAccordion key={subject.index} subject={subject} />
        ))}
      </div>
    )
  )
}
