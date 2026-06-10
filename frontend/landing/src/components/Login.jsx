import { useState, useCallback } from 'react';

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const validate = (email, password) => {
  const errs = {};
  if (!email.trim()) errs.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.';
  if (!password) errs.password = 'Password is required.';
  else if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
  return errs;
};

const Login = ({ onViewChange }) => {
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (touched[name]) {
      const updated = { ...form, [name]: type === 'checkbox' ? checked : value };
      const errs = validate(updated.email, updated.password);
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(form.email, form.password);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setTouched({ email: true, password: true });
      const errs = validate(form.email, form.password);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        // Returning user — false = show "Previously Visited" tag in SelectGame
        onViewChange('select-game', false);
      }, 1200);
    },
    [form, onViewChange]
  );

  return (
    <div className="auth-wrapper">
      <div className="auth-bg-orb auth-orb-1" />
      <div className="auth-bg-orb auth-orb-2" />

      <div className="auth-card auth-card-animated">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <span className="auth-logo-icon">🎮</span>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your SquadUP account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <div className={`input-wrapper ${errors.email && touched.email ? 'input-error' : touched.email && !errors.email ? 'input-success' : ''}`}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                id="login-email"
                type="email"
                name="email"
                className="form-input form-input-icon"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
            </div>
            {errors.email && touched.email && (
              <p className="form-error-msg">
                <span className="error-dot" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label" htmlFor="login-password">Password</label>
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => onViewChange('landing')}
                aria-label="Forgot password"
              >
                Forgot Password?
              </button>
            </div>
            <div className={`input-wrapper ${errors.password && touched.password ? 'input-error' : touched.password && !errors.password ? 'input-success' : ''}`}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input form-input-icon form-input-padded-right"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="form-error-msg">
                <span className="error-dot" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="form-group form-group-inline">
            <label className="custom-checkbox-label" htmlFor="remember-me">
              <input
                id="remember-me"
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
                className="custom-checkbox-input"
              />
              <span className="custom-checkbox-box" aria-hidden="true" />
              <span className="custom-checkbox-text">Remember me</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit-btn"
            className={`btn btn-auth-primary ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="btn-spinner-group">
                <span className="btn-spinner" />
                Signing In…
              </span>
            ) : (
              <>
                Sign In
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span className="auth-divider-line" />
          <span className="auth-divider-text">New to SquadUP?</span>
          <span className="auth-divider-line" />
        </div>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="auth-link-btn"
            onClick={() => onViewChange('signup')}
            id="go-to-signup"
          >
            Create Account
          </button>
        </div>

        <button
          type="button"
          className="btn-back-home"
          onClick={() => onViewChange('landing')}
          id="login-back-home"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
