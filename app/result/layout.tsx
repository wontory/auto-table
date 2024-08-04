import { TimetableModalProvider } from '~/contexts/timetable-modal'

export default function ResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <TimetableModalProvider>{children}</TimetableModalProvider>
}
