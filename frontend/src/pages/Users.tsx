import { useEffect, useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Table from '../components/common/Table';
import axiosInstance from '../api/axiosInstance';
import { Mail } from 'lucide-react';
import Input from '../components/common/Input';

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => 
    u.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="User Management" 
      subtitle={`View and manage ${users.length} registered users on the platform.`}
    >
      <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
        <Input 
          label="Search Users" 
          placeholder="Search by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table headers={['#', 'Name', 'Email Address', 'Date Joined', 'Actions']} isLoading={loading}>
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td><code style={{ color: 'var(--muted-foreground)' }}>#{user.id}</code></td>
            <td style={{ fontWeight: 600 }}>{user.first_name} {user.last_name}</td>
            <td>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)' }}>
                 <Mail size={14} />
                 {user.email}
               </div>
            </td>
            <td>{new Date(user.created_at).toLocaleDateString()}</td>
            <td>
              <button className="btn btn-ghost btn-sm" style={{ padding: '0.25rem 0.5rem' }}>View Profile</button>
            </td>
          </tr>
        ))}
      </Table>
    </DashboardLayout>
  );
};

export default UsersPage;
