const PageLoader = ({ label = "Loading..." }) => (
  <div className="flex min-h-[240px] items-center justify-center">
    <div className="glass-panel flex items-center gap-3 px-5 py-4 text-sm font-medium text-slate-600">
      <span className="h-3 w-3 animate-pulse rounded-full bg-rose-400" />
      {label}
    </div>
  </div>
);

export default PageLoader;

