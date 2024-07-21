import type { Metadata } from 'next'
import '~/styles/globals.css'

import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { JotaiProvider } from '~/components/jotai-provider'
import { SubjectModalProvider } from '~/contexts/lecture-modal-context'

export const metadata: Metadata = {
  title: 'Auto Table',
  description: 'Auto Table로 최고의 대학 시간표를 찾아보세요!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="relative flex min-h-screen flex-col">
        <JotaiProvider>
          <SubjectModalProvider>
            <Header />
            <main className="mx-auto w-full max-w-screen-lg flex-1 p-4">{children}</main>
            <Footer />
          </SubjectModalProvider>
        </JotaiProvider>
      </body>
    </html>
  )
}
