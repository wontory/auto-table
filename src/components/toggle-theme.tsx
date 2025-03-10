'use client'

import { CheckIcon, PaletteIcon } from 'lucide-react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

import { themes } from '~/constants/themes'

export function ToggleTheme() {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div title="Change Theme" className="dropdown dropdown-end block">
      <button type="button" className="btn btn-square btn-ghost">
        <PaletteIcon className="h-5 w-5 stroke-current" />
      </button>
      <div className="dropdown-content top-px mt-12 h-[30.5rem] max-h-[calc(100vh-8.6rem)] overflow-y-auto rounded-box border border-white/5 bg-base-200 text-base-content shadow-2xl outline-1 outline-black/5">
        <ul className="menu w-56">
          {themes.map((theme) => (
            <li key={theme}>
              <button type="button" className="gap-3 px-2" data-set-theme={theme} data-act-class="[&_svg]:visible">
                <div
                  data-theme={theme}
                  className="grid shrink-0 grid-cols-2 gap-0.5 rounded-md bg-base-100 p-1 shadow-sm"
                >
                  <div className="size-1 rounded-full bg-base-content" />
                  <div className="size-1 rounded-full bg-primary" />
                  <div className="size-1 rounded-full bg-secondary" />
                  <div className="size-1 rounded-full bg-accent" />
                </div>
                <div className="w-32 truncate capitalize">{theme}</div>
                <CheckIcon className="invisible h-5 w-5 shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
