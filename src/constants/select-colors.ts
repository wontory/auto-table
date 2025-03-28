export const selectColors = [
  'border-slate-500',
  'border-gray-500',
  'border-zinc-500',
  'border-neutral-500',
  'border-stone-500',
  'border-red-500',
  'border-orange-500',
  'border-amber-500',
  'border-yellow-500',
  'border-lime-500',
  'border-green-500',
  'border-emerald-500',
  'border-teal-500',
  'border-cyan-500',
  'border-sky-500',
  'border-blue-500',
  'border-indigo-500',
  'border-violet-500',
  'border-purple-500',
  'border-fuchsia-500',
  'border-pink-500',
  'border-rose-500',
] as const

export const selectColorMap = selectColors.map((color) => color.match(/border-(.+)-500/)?.[1] ?? '')
