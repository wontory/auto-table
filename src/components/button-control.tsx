import { EditIcon, Trash2Icon } from 'lucide-react'

export function ButtonControl({
  onClickUpdate,
  onClickDelete,
}: { onClickUpdate: () => void; onClickDelete: () => void }) {
  return (
    <div className="z-10 flex gap-2">
      <button
        type="button"
        className="btn btn-square btn-outline btn-sm btn-success bg-base-100"
        onClick={onClickUpdate}
      >
        <EditIcon className="h-4 w-4" />
      </button>
      <button type="button" className="btn btn-square btn-outline btn-sm btn-error bg-base-100" onClick={onClickDelete}>
        <Trash2Icon className="h-4 w-4" />
      </button>
    </div>
  )
}
