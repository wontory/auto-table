'use client'

import { CheckIcon, PaletteIcon } from 'lucide-react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

import { themes } from '~/constants/theme'

export function ToggleTheme() {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div title="Change Theme" className="dropdown dropdown-end z-50 hidden [@supports(color:oklch(0%_0_0))]:block">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-square">
        <PaletteIcon className="h-5 w-5 stroke-current" />
      </div>
      <div className="dropdown-content top-px mt-14 h-[28.6rem] max-h-[calc(100vh-10rem)] w-56 overflow-y-auto rounded-box border border-white/5 bg-base-200 text-base-content shadow-2xl outline outline-1 outline-black/5">
        <div className="grid grid-cols-1 gap-3 p-3">
          {themes.map((theme) => (
            <button
              key={theme}
              type="button"
              className="text-start outline-base-content outline-offset-4"
              data-set-theme={theme}
              data-act-class="[&_svg]:visible"
            >
              <span
                data-theme={theme}
                className="block w-full cursor-pointer rounded-btn bg-base-100 font-sans text-base-content"
              >
                <span className="grid grid-cols-5 grid-rows-3">
                  <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                    <CheckIcon className="invisible h-5 w-5 shrink-0" />
                    <span className="flex-grow text-sm">{theme}</span>
                    <span className="flex h-full shrink-0 flex-wrap gap-1">
                      <span className="w-2 rounded-badge bg-primary" />
                      <span className="w-2 rounded-badge bg-secondary" />
                      <span className="w-2 rounded-badge bg-accent" />
                      <span className="w-2 rounded-badge bg-neutral" />
                    </span>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
