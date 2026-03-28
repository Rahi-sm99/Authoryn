import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: 'spandanmondal15@gmail.com',
    first_name: 'Anurag',
    last_name: 'Mondal',
    password: 'Password123!',
    university_name: 'University Name',
    gender: 'Male',
    year_joined: new Date().getFullYear().toString(),
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axiosInstance.post('/register', formData);
      navigate('/login');
    } catch (err: any) {
      const messages = err.response?.data?.messages;
      if (messages) {
        if (typeof messages === 'string') setError(messages);
        else if (typeof messages === 'object') {
          // Flatten first error found if multiple
          const firstKey = Object.keys(messages)[0];
          setError(`${firstKey}: ${messages[firstKey]}`);
        }
      } else {
        setError('Registration failed. Please check your data or connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="auth-card premium-glass"
        style={{ maxWidth: '480px' }}
      >
        <header className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join our modern teacher platform</p>
        </header>

        <form onSubmit={handleRegister} className="auth-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input 
              label="First Name" 
              name="first_name"
              placeholder="First Name" 
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <Input 
              label="Last Name" 
              name="last_name"
              placeholder="Last Name" 
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <Input 
            label="Email Address" 
            type="email" 
            name="email"
            placeholder="email@example.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            name="password"
            placeholder="••••••••" 
            value={formData.password}
            onChange={handleChange}
            required
          />
          <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '-0.5rem' }}>TEACHER DETAILS</p>
          <Input 
            label="University Name" 
            name="university_name"
            placeholder="University Name" 
            value={formData.university_name}
            onChange={handleChange}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="field">
              <label className="label">Gender</label>
              <select 
                name="gender" 
                className="input" 
                value={formData.gender} 
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input 
              label="Year Joined" 
              type="number" 
              name="year_joined"
              placeholder="2024" 
              value={formData.year_joined}
              onChange={handleChange}
              required
            />
          </div>
          
          {error && <p className="error-msg">{error}</p>}
          
          <Button fullWidth size="lg" isLoading={isLoading} type="submit" style={{ marginTop: '1rem' }}>
            Create Account
          </Button>
        </form>

        <footer className="auth-footer">
          Already have an account? 
          <Link to="/login" className="auth-link">Sign in</Link>
        </footer>
      </motion.div>
    </div>
  );
};

export default Register;
