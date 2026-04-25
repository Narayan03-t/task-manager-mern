import { useEffect, useState } from "react";

const initialFormState = {
  title: "",
  description: "",
  status: "pending",
};

const TaskForm = ({ onSubmit, isSubmitting, editingTask, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
      return;
    }

    setFormData(initialFormState);
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await onSubmit(formData);

    if (result?.success) {
      setFormData(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-5 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-slate-950">
            {editingTask ? "Edit task" : "Create a new task"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep your work organized with clear details and status tracking.
          </p>
        </div>
        {editingTask ? (
          <button type="button" onClick={onCancel} className="btn-secondary px-4 py-2">
            Cancel
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="field-input"
            placeholder="Prepare sprint summary"
            required
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="field-input resize-none"
            placeholder="Add supporting details, links, or reminders..."
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="field-input"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
        {isSubmitting ? "Saving..." : editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;

