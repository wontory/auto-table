import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '~/styles/globals.css'

import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { cn } from '~/utils/cn'
import { Providers } from './providers'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

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
    <html lang="ko" className={cn(pretendard.variable, 'font-pretendard')}>
      <body className="relative flex min-h-dvh flex-col">
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-screen-lg flex-1 p-4 pb-24">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
