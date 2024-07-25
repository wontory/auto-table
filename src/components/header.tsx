import Link from 'next/link'

import { ToggleTheme } from '~/components/toggle-theme'

export function Header() {
  return (
    <div className="bg-base-100">
      <div className="navbar mx-auto max-w-screen-lg">
        <div className="navbar-start" />
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
