import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const { token, signup, authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const result = await signup(formData);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Set up secure access to your task dashboard in just a minute."
      footer={
        <p>
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-slate-900">
            Sign in instead
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Full Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="field-input"
            placeholder="Alex Johnson"
            required
          />
        </label>

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
            placeholder="Choose a secure password"
            required
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <button type="submit" disabled={authLoading} className="btn-primary w-full">
          {authLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthShell>
  );
};

export default SignupPage;

