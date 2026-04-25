const statusStyles = {
  pending: "bg-amber-100 text-amber-800",
  "in-progress": "bg-sky-100 text-sky-800",
  completed: "bg-emerald-100 text-emerald-800",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
      statusStyles[status] || "bg-slate-100 text-slate-700"
    }`}
  >
    {status.replace("-", " ")}
  </span>
);

export default StatusBadge;

