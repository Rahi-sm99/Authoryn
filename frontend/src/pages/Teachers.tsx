import { useEffect, useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Table from '../components/common/Table';
import axiosInstance from '../api/axiosInstance';
import { Mail, GraduationCap, MapPin } from 'lucide-react';
import Input from '../components/common/Input';

interface TeacherData {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  university_name: string;
  gender: string;
  year_joined: number;
}

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get('/teachers');
        setTeachers(response.data);
      } catch (err) {
        console.error('Error fetching teachers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((t) => 
    t.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.university_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Teacher Records" 
      subtitle={`Comprehensive database of ${teachers.length} academic professionals.`}
    >
      <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
        <Input 
          label="Search Database" 
          placeholder="Filter by name or university..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table headers={['Academic Profile', 'Institution', 'Gender', 'Joined', 'Actions']} isLoading={loading}>
        {filteredTeachers.map((teacher) => (
          <tr key={teacher.id}>
            <td>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 600, fontSize: '1rem' }}>{teacher.first_name} {teacher.last_name}</span>
                <span style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Mail size={12} />
                  {teacher.email}
                </span>
              </div>
            </td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--muted-foreground)" />
                <span>{teacher.university_name}</span>
              </div>
            </td>
            <td>
              <span 
                className="premium-glass" 
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}
              >
                {teacher.gender}
              </span>
            </td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GraduationCap size={16} color="var(--muted-foreground)" />
                <span>{teacher.year_joined}</span>
              </div>
            </td>
            <td>
              <button className="btn btn-ghost btn-sm" style={{ padding: '0.25rem 0.5rem' }}>View Details</button>
            </td>
          </tr>
        ))}
      </Table>
    </DashboardLayout>
  );
};

export default TeachersPage;
