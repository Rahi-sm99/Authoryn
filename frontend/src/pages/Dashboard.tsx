import DashboardLayout from '../components/Layout/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { Users, GraduationCap, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
    className="premium-glass" 
    style={{ padding: '2rem', flex: 1, minWidth: '240px' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
      <div style={{ background: color, padding: '0.75rem', borderRadius: '12px', display: 'flex' }}>
        {icon}
      </div>
      <ArrowUpRight size={20} color="var(--muted-foreground)" />
    </div>
    <h3 style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ fontSize: '2rem', fontWeight: 700 }}>{value}</p>
  </motion.div>
);

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <DashboardLayout 
      title={`Welcome, ${user?.first_name || 'User'}`} 
      subtitle="Here's what's happening on your platform today."
    >
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <StatCard title="Total Users" value="1,248" icon={<Users size={24} color="white" />} color="#6366f1" />
        <StatCard title="Total Teachers" value="482" icon={<GraduationCap size={24} color="white" />} color="#10b981" />
        <StatCard title="Active Sessions" value="124" icon={<Activity size={24} color="white" />} color="#f59e0b" />
      </div>

      <div className="premium-glass" style={{ padding: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Get Started</h2>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', maxWidth: '600px' }}>
          Explore the user and teacher databases to manage your institution's data with ease and precision. Our platform provides modern tools for relational data management.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary btn-md">Explore Users</button>
          <button className="btn btn-secondary btn-md">Help Center</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
