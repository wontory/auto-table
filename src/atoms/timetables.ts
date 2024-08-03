import { atom } from 'jotai'

import type { Timetable } from '~/schemas/timetable'

export const timetablesAtom = atom<Timetable[]>([])
