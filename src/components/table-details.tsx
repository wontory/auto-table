import type { Timetable } from '~/schemas/timetable'

export function TableDetails({ combination }: { combination: Timetable['combination'] }) {
  console.log(combination)

  return (
    <table className="table bg-base-100 text-center">
      <thead>
        <tr>
          <th />
          <th>과목명</th>
          <th>학점</th>
          <th>담당교수</th>
          <th>교시</th>
        </tr>
      </thead>
      <tbody>
        {combination.map((subject, index) => (
          <tr key={`subject-details-${subject.index}`}>
            <th>{index + 1}</th>
            <td>{subject.title}</td>
            <td>{subject.credit}</td>
            <td>{subject.lectures[0].professor}</td>
            <td>
              {subject.lectures[0].day} {subject.lectures[0].time}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
