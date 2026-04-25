import { CheckCircle2 } from "lucide-react";

const AuthShell = ({ title, subtitle, footer, children }) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
    <div className="absolute inset-0">
      <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-rose-300/40 blur-3xl" />
      <div className="absolute right-[-8%] top-[15%] h-72 w-72 rounded-full bg-sky-300/40 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[25%] h-72 w-72 rounded-full bg-amber-200/50 blur-3xl" />
    </div>

    <div className="relative grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="hidden flex-col justify-between rounded-[2rem] bg-slate-950 p-10 text-white lg:flex">
        <div className="space-y-5">
          <span className="inline-flex w-fit rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            TaskFlow
          </span>
          <div className="space-y-4">
            <h1 className="font-display text-4xl leading-tight">
              Organize work with a calm, focused task space.
            </h1>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              Built for teams and individuals who need secure authentication, smooth task
              tracking, and a dashboard that feels effortless on every screen.
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          {[
            "JWT-protected task management",
            "Fast create, update, delete flows",
            "Responsive UI with meaningful states",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-slate-200">
              <CheckCircle2 size={18} className="text-emerald-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 lg:p-10">
        <div className="mb-8 space-y-2">
          <h2 className="font-display text-3xl text-slate-950">{title}</h2>
          <p className="text-sm leading-6 text-slate-500">{subtitle}</p>
        </div>
        {children}
        <div className="mt-8 border-t border-slate-200/80 pt-6 text-sm text-slate-500">{footer}</div>
      </div>
    </div>
  </div>
);

export default AuthShell;

