import { ClipboardList, ListTodo, LoaderCircle, LogOut, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import api, { withAuthConfig } from "../api/axios";
import PageLoader from "../components/PageLoader";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks", withAuthConfig(token));
      setTasks(data);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to fetch tasks",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // The token is stable for the current session and is required for API access.
  }, [token]);

  const handleSubmitTask = async (formData) => {
    setFeedback({ type: "", message: "" });
    setSubmitting(true);

    try {
      if (editingTask) {
        const { data } = await api.put(
          `/tasks/${editingTask._id}`,
          formData,
          withAuthConfig(token)
        );
        setTasks((current) => current.map((task) => (task._id === data._id ? data : task)));
        setEditingTask(null);
      } else {
        const { data } = await api.post("/tasks", formData, withAuthConfig(token));
        setTasks((current) => [data, ...current]);
      }

      setFeedback({
        type: "success",
        message: editingTask ? "Task updated successfully" : "Task created successfully",
      });
      return { success: true };
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to save task",
      });
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setSubmitting(true);
      setFeedback({ type: "", message: "" });
      await api.delete(`/tasks/${taskId}`, withAuthConfig(token));
      setTasks((current) => current.filter((task) => task._id !== taskId));
      if (editingTask?._id === taskId) {
        setEditingTask(null);
      }
      setFeedback({ type: "success", message: "Task deleted successfully" });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to delete task",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (task, status) => {
    try {
      setSubmitting(true);
      const { data } = await api.put(
        `/tasks/${task._id}`,
        {
          title: task.title,
          description: task.description,
          status,
        },
        withAuthConfig(token)
      );
      setTasks((current) => current.map((item) => (item._id === data._id ? data : item)));
      setFeedback({ type: "success", message: `Task marked as ${status}` });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to update task status",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const taskSummary = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "completed").length,
    active: tasks.filter((task) => task.status !== "completed").length,
  };

  if (loading) {
    return <PageLoader label="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="glass-panel overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                <Sparkles size={14} />
                Productivity Hub
              </div>
              <div className="space-y-3">
                <h1 className="font-display text-3xl leading-tight text-slate-950 sm:text-4xl">
                  Welcome back, {user?.name?.split(" ")[0] || "there"}.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                  Track every task in one secure workspace, move priorities forward, and keep
                  your day structured without losing context (INT332 ).
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5 rounded-[2rem] bg-slate-950 p-6 text-white">
              <div className="space-y-3">
                <p className="text-sm text-slate-300">Signed in as</p>
                <div>
                  <p className="text-lg font-semibold">{user?.name}</p>
                  <p className="text-sm text-slate-300">{user?.email}</p>
                </div>
              </div>
              <button type="button" onClick={logout} className="btn-secondary gap-2 self-start">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="glass-panel p-5">
            <div className="mb-3 flex items-center gap-3 text-slate-500">
              <ListTodo size={20} />
              <span className="text-sm font-medium">Total tasks</span>
            </div>
            <p className="font-display text-4xl text-slate-950">{taskSummary.total}</p>
          </div>
          <div className="glass-panel p-5">
            <div className="mb-3 flex items-center gap-3 text-slate-500">
              <ClipboardList size={20} />
              <span className="text-sm font-medium">Active items</span>
            </div>
            <p className="font-display text-4xl text-slate-950">{taskSummary.active}</p>
          </div>
          <div className="glass-panel p-5">
            <div className="mb-3 flex items-center gap-3 text-slate-500">
              <LoaderCircle size={20} />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <p className="font-display text-4xl text-slate-950">{taskSummary.completed}</p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <TaskForm
            onSubmit={handleSubmitTask}
            isSubmitting={submitting}
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />

          <div className="space-y-4">
            {feedback.message ? (
              <div
                className={`rounded-3xl border px-4 py-3 text-sm ${
                  feedback.type === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {feedback.message}
              </div>
            ) : null}

            {tasks.length === 0 ? (
              <div className="glass-panel flex min-h-[320px] items-center justify-center p-8 text-center">
                <div className="space-y-3">
                  <h2 className="font-display text-2xl text-slate-950">No tasks yet</h2>
                  <p className="max-w-md text-sm leading-6 text-slate-500">
                    Create your first task from the panel on the left to start managing your
                    workflow.
                  </p>
                </div>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                  isBusy={submitting}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
