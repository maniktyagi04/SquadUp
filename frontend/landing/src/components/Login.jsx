import { useState } from 'react';

const Login = ({ onViewChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    onViewChange('select-game');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Gmail ID</label>
            <input
              type="email"
              className="form-input"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-auth-submit">
            Sign In
          </button>
        </form>
        <div className="auth-footer">
          Don't have an account?
          <span className="auth-link" onClick={() => onViewChange('signup')}>
            Sign Up
          </span>
        </div>
        <span className="btn-back-home" onClick={() => onViewChange('landing')}>
          Back to Home
        </span>
      </div>
    </div>
  );
};

export default Login;
