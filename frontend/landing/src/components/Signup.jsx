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

// Favorite game field removed — game selection happens in dedicated SelectGame page
const validateField = (name, value, form) => {
  switch (name) {
    case 'username':
      if (!value.trim()) return 'Username is required.';
      if (value.trim().length < 3) return 'Username must be at least 3 characters.';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
      return '';
    case 'password':
      if (!value) return 'Password is required.';
      if (value.length < 6) return 'Password must be at least 6 characters.';
      return '';
    case 'confirmPassword':
      if (!value) return 'Please confirm your password.';
      if (value !== form.password) return 'Passwords do not match.';
      return '';
    case 'acceptTerms':
      if (!value) return 'You must accept the Terms & Conditions.';
      return '';
    default:
      return '';
  }
};

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Weak', color: '#ef4444' },
    { label: 'Fair', color: '#f97316' },
    { label: 'Good', color: '#eab308' },
    { label: 'Strong', color: '#22c55e' },
    { label: 'Very Strong', color: '#8B5CF6' },
  ];
  const level = levels[Math.min(score - 1, 4)] || levels[0];

  return (
    <div className="password-strength">
      <div className="password-strength-bars">
        {levels.map((l, i) => (
          <div
            key={l.label}
            className="strength-bar"
            style={{ backgroundColor: i < score ? level.color : 'var(--bg-tertiary)' }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: level.color }}>
        {level.label}
      </span>
    </div>
  );
};

const Signup = ({ onViewChange }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    const newForm = { ...form, [name]: newVal };
    setForm(newForm);

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, newVal, newForm) }));
    }
    // Re-validate confirm password when password changes
    if (name === 'password' && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', newForm.confirmPassword, newForm),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, val, form) }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
      setTouched(allTouched);

      const newErrors = {};
      Object.keys(form).forEach((key) => {
        const err = validateField(key, form[key], form);
        if (err) newErrors[key] = err;
      });
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        // New user — goes to profile setup first, then game selection
        onViewChange('profile-setup', true);
      }, 1400);
    },
    [form, onViewChange]
  );

  const getFieldState = (name) => {
    if (errors[name] && touched[name]) return 'error';
    if (!errors[name] && touched[name] && form[name]) return 'success';
    return '';
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-bg-orb auth-orb-1" />
      <div className="auth-bg-orb auth-orb-2" />

      <div className="auth-card auth-card-animated auth-card-signup">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <span className="auth-logo-icon">🎮</span>
          </div>
          <h1 className="auth-title">Join the Squad</h1>
          <p className="auth-subtitle">Create your SquadUP account and find your team</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-username">Username</label>
            <div className={`input-wrapper ${getFieldState('username') === 'error' ? 'input-error' : getFieldState('username') === 'success' ? 'input-success' : ''}`}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="signup-username"
                type="text"
                name="username"
                className="form-input form-input-icon"
                placeholder="squad_master99"
                value={form.username}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="username"
              />
              {getFieldState('username') === 'success' && <span className="input-checkmark">✓</span>}
            </div>
            {errors.username && touched.username && (
              <p className="form-error-msg"><span className="error-dot" />{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">Email Address</label>
            <div className={`input-wrapper ${getFieldState('email') === 'error' ? 'input-error' : getFieldState('email') === 'success' ? 'input-success' : ''}`}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                id="signup-email"
                type="email"
                name="email"
                className="form-input form-input-icon"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
              {getFieldState('email') === 'success' && <span className="input-checkmark">✓</span>}
            </div>
            {errors.email && touched.email && (
              <p className="form-error-msg"><span className="error-dot" />{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <div className={`input-wrapper ${getFieldState('password') === 'error' ? 'input-error' : getFieldState('password') === 'success' ? 'input-success' : ''}`}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input form-input-icon form-input-padded-right"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
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
              <p className="form-error-msg"><span className="error-dot" />{errors.password}</p>
            )}
            <PasswordStrength password={form.password} />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
            <div className={`input-wrapper ${getFieldState('confirmPassword') === 'error' ? 'input-error' : getFieldState('confirmPassword') === 'success' ? 'input-success' : ''}`}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <input
                id="signup-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-input form-input-icon form-input-padded-right"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="form-error-msg"><span className="error-dot" />{errors.confirmPassword}</p>
            )}
          </div>

          {/* Accept Terms */}
          <div className="form-group">
            <label className={`custom-checkbox-label ${errors.acceptTerms && touched.acceptTerms ? 'checkbox-error' : ''}`} htmlFor="accept-terms">
              <input
                id="accept-terms"
                type="checkbox"
                name="acceptTerms"
                checked={form.acceptTerms}
                onChange={handleChange}
                onBlur={handleBlur}
                className="custom-checkbox-input"
              />
              <span className="custom-checkbox-box" aria-hidden="true" />
              <span className="custom-checkbox-text">
                I accept the{' '}
                <button type="button" className="inline-link">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="inline-link">Privacy Policy</button>
              </span>
            </label>
            {errors.acceptTerms && touched.acceptTerms && (
              <p className="form-error-msg" style={{ marginTop: '8px' }}>
                <span className="error-dot" />{errors.acceptTerms}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="signup-submit-btn"
            className={`btn btn-auth-primary ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="btn-spinner-group">
                <span className="btn-spinner" />
                Creating Account…
              </span>
            ) : (
              <>
                Create Account
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span className="auth-divider-line" />
          <span className="auth-divider-text">Already a member?</span>
          <span className="auth-divider-line" />
        </div>

        <div className="auth-footer">
          <span>Have an account?</span>
          <button
            type="button"
            className="auth-link-btn"
            onClick={() => onViewChange('login')}
            id="go-to-login"
          >
            Sign In
          </button>
        </div>

        <button
          type="button"
          className="btn-back-home"
          onClick={() => onViewChange('landing')}
          id="signup-back-home"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Signup;
