import { AddSubjectButton } from '~/components/add-subject-button'
import { SubjectList } from '~/components/subject-list'

export default function Home() {
  return (
    <>
      <SubjectList className="mb-4" />
      <AddSubjectButton />
    </>
  )
}
