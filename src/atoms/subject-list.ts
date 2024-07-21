import { atom } from 'jotai'

import type { Subject } from '~/schemas/subject'

export const subjectListAtom = atom<Subject[]>([])
