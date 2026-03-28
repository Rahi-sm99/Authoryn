import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../api/axiosInstance';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import './Auth.css';

const Login = () => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('Testuser');
  const [password, setPassword] = useState('test123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const loginStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/login', { email, password });
      const { user, token } = response.data;
      loginStore(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.messages?.error || 'Invalid credentials or connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="auth-page" style={{ perspective: '1000px' }}>
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="auth-card premium-glass"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <header className="auth-header">
          <div className="auth-brand">Authoryn</div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Login to access your dashboard</p>
        </header>

        <form onSubmit={handleLogin} className="auth-form">
          <Input 
            label="Email Address / ID" 
            type="text" 
            placeholder="Testuser" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={error}
          />
          <Button fullWidth size="lg" isLoading={isLoading} type="submit">
            Sign In
          </Button>
        </form>

        <footer className="auth-footer">
          Don't have an account? 
          <Link to="/register" className="auth-link">Create one now</Link>
        </footer>
      </motion.div>
    </div>
  );
};

export default Login;
