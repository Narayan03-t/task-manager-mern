import { Pencil, Trash2 } from "lucide-react";

import StatusBadge from "./StatusBadge";

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete, isBusy }) => (
  <article className="glass-panel p-5 transition duration-200 hover:-translate-y-1">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
          <StatusBadge status={task.status} />
        </div>
        <p className="text-sm leading-6 text-slate-500">
          {task.description || "No description added for this task yet."}
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Updated {new Date(task.updatedAt).toLocaleString()}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            onToggleComplete(
              task,
              task.status === "completed" ? "pending" : "completed"
            )
          }
          disabled={isBusy}
          className="btn-secondary px-4 py-2"
        >
          {task.status === "completed" ? "Mark Pending" : "Mark Complete"}
        </button>
        <button
          type="button"
          onClick={() => onEdit(task)}
          disabled={isBusy}
          className="btn-secondary gap-2 px-4 py-2"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          disabled={isBusy}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition duration-200 hover:border-rose-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  </article>
);

export default TaskCard;

