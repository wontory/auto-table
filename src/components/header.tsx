'use client'

import { Undo2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { ToggleTheme } from '~/components/toggle-theme'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="bg-base-100">
      <div className="navbar mx-auto max-w-screen-lg">
        <div className="navbar-start">
          {pathname !== '/' && (
            <button
              type="button"
              className="btn btn-ghost btn-square"
              onClick={() => {
                router.back()
              }}
            >
              <Undo2Icon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost text-xl">
            Auto Table
          </Link>
        </div>
        <div className="navbar-end">
          <ToggleTheme />
        </div>
      </div>
    </div>
  )
}
