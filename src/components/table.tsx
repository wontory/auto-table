import { backgroundColors } from '~/constants/background-colors'
import { days } from '~/constants/days'
import type { Timetable } from '~/schemas/timetable'
import { cn } from '~/utils/cn'

export function Table({ timetable }: { timetable: Timetable }) {
  return (
    <table className="table-md table table-fixed bg-base-100 text-center">
      <thead>
        <tr>
          <th />
          {days.map((day, i) => (
            <th key={`th-${timetable.index}-${i}`}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timetable.timetable.map((row, i) => (
          <tr key={`tr-${timetable.index}-${i}`}>
            <th>{i + 1}</th>
            {row.map((subject, j) =>
              subject !== null &&
              (i > 0 ? JSON.stringify(timetable.timetable[i - 1][j]) !== JSON.stringify(subject) : true) ? (
                <td
                  key={`td-${timetable.index}-${i}-${j}`}
                  rowSpan={subject.credit}
                  className={cn(
                    backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
                    'text-white text-xs',
                  )}
                >
                  {subject.title}
                </td>
              ) : (
                <td key={`td-${timetable.index}-${i}-${j}`} />
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
