"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed. Please try again.");
        return;
      }

      // Hard redirect so the browser sends the fresh cookie on the /admin request
      window.location.href = "/admin";
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* ---------- global reset for this page ---------- */
        html, body { margin: 0; padding: 0; }

        /* ---------- background grid ---------- */
        .login-bg {
          min-height: 100dvh;
          min-height: 100vh;
          background-color: #08090a;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        /* ---------- glow orbs ---------- */
        .orb {
          pointer-events: none;
          position: absolute;
          border-radius: 50%;
        }
        .orb-tl {
          width: clamp(240px, 45vw, 520px);
          height: clamp(240px, 45vw, 520px);
          top: -20%;
          left: -15%;
          background: radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%);
        }
        .orb-br {
          width: clamp(200px, 35vw, 420px);
          height: clamp(200px, 35vw, 420px);
          bottom: -15%;
          right: -10%;
          background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
        }

        /* ---------- card wrapper ---------- */
        .login-card-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 400px;
          animation: fadeSlideIn 0.45s ease both;
        }

        /* ---------- logo block ---------- */
        .login-brand {
          text-align: center;
          margin-bottom: 1.75rem;
        }
        .login-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, rgba(99,102,241,0.28), rgba(139,92,246,0.28));
          border: 1px solid rgba(99,102,241,0.45);
          box-shadow: 0 0 24px rgba(99,102,241,0.18);
        }
        .login-title {
          margin: 0 0 0.25rem;
          font-size: clamp(1.05rem, 2.5vw, 1.25rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .login-subtitle {
          margin: 0;
          font-size: 0.8125rem;
          color: #6b7280;
        }

        /* ---------- glass card ---------- */
        .login-card {
          background: rgba(255,255,255,0.038);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 20px;
          padding: clamp(1.25rem, 5vw, 1.875rem);
          box-shadow: 0 4px 40px rgba(0,0,0,0.38),
                      inset 0 1px 0 rgba(255,255,255,0.055);
        }

        /* ---------- error banner ---------- */
        .login-error {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 12px;
          padding: 0.7rem 0.875rem;
          margin-bottom: 1.125rem;
          font-size: 0.8125rem;
          color: #fca5a5;
          line-height: 1.4;
        }
        .login-error svg { flex-shrink: 0; margin-top: 1px; }

        /* ---------- form fields ---------- */
        .field + .field { margin-top: 1rem; }
        .field label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: #9ca3af;
          margin-bottom: 0.4rem;
        }
        .input-wrap { position: relative; }
        .field input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #fff;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
          -webkit-appearance: none;
        }
        .field input::placeholder { color: #4b5563; }
        .field input:focus {
          border-color: rgba(99,102,241,0.65);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .field input.has-toggle { padding-right: 2.5rem; }
        .toggle-btn {
          position: absolute;
          right: 0.625rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          color: #4b5563;
          transition: color 0.15s;
          display: flex;
          align-items: center;
        }
        .toggle-btn:hover { color: #d1d5db; }

        /* ---------- submit button ---------- */
        .login-btn {
          margin-top: 1.25rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border: none;
          border-radius: 12px;
          padding: 0.7rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          box-shadow: 0 0 22px rgba(99,102,241,0.32);
          transition: box-shadow 0.18s, opacity 0.18s;
        }
        .login-btn:hover:not(:disabled) {
          box-shadow: 0 0 32px rgba(99,102,241,0.5);
        }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
        }

        .login-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.7rem;
          color: #374151;
        }

        /* ---------- animations ---------- */
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.75s linear infinite; }

        /* ---------- responsive tweaks ---------- */
        @media (max-width: 480px) {
          .login-bg { padding: 0.75rem; align-items: flex-start; padding-top: 10vh; }
          .login-card-wrap { max-width: 100%; }
        }
      `}</style>

      <div className="login-bg">
        <div aria-hidden className="orb orb-tl" />
        <div aria-hidden className="orb orb-br" />

        <div className="login-card-wrap">
          {/* Brand */}
          <div className="login-brand">
            <div className="login-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="rgb(165,180,252)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="login-title">Catalyst Admin</h1>
            <p className="login-subtitle">Sign in to manage your dashboard</p>
          </div>

          {/* Card */}
          <div className="login-card">
            {error && (
              <div className="login-error" role="alert">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#f87171" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="input-wrap">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="has-toggle"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="toggle-btn"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="login-btn"
              >
                {loading && (
                  <svg className="spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
                    <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>

          <p className="login-footer">Restricted access · Catalyst Dashboard</p>
        </div>
      </div>
    </>
  );
}
