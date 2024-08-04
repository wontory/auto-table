export const badges = {
  공강: 'badge-accent',
  오후: 'badge-info',
} as const

export type Tag = keyof typeof badges
