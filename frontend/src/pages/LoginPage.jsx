import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { token, login, authLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const result = await login(formData);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your tasks, review progress, and keep your work moving."
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-slate-900">
            Create one here
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="field-input"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="field-input"
            placeholder="Enter your password"
            required
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <button type="submit" disabled={authLoading} className="btn-primary w-full">
          {authLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthShell>
  );
};

export default LoginPage;

