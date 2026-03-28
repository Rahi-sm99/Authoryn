import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, LogOut, Code2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import './Sidebar.css';

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/users', icon: <Users size={20} /> },
    { name: 'Teachers', path: '/teachers', icon: <GraduationCap size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div style={{ background: 'white', borderRadius: '4px', padding: '4px' }}>
          <Code2 size={24} color="black" />
        </div>
        <span>Authoryn</span>
      </div>

      <nav className="nav">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => 
              isActive ? 'nav-item nav-item-active' : 'nav-item'
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="logout-container">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
