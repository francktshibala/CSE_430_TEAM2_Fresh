'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  name: string;
  accountType: string;
  about_me?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else if (response.status === 401) {
          router.push('/login');
        } else {
          setError('Failed to load profile');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [router]);


  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch {
      console.error('Logout error');
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ color: '#c33', marginBottom: '20px' }}>
            {error}
          </div>
          <button
            onClick={() => router.push('/login')}
            style={{
              backgroundColor: '#8B4513',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              color: '#8B4513',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 0 10px 0'
            }}>
              Welcome, {user?.name}! ({user?.accountType})
            </h1>
            <p style={{
              color: '#666',
              margin: 0
            }}>
              Handcrafted Haven Dashboard
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#8B4513',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a0522d'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8B4513'}
          >
            Sign Out
          </button>
        </div>

        {/* Profile Information */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{
            color: '#8B4513',
            fontSize: '22px',
            fontWeight: 'bold',
            marginBottom: '20px',
            borderBottom: '2px solid #8B4513',
            paddingBottom: '10px'
          }}>
            Profile Information
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: '500'
              }}>
                Full Name
              </label>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #e9ecef',
                color: '#333',
                fontWeight: '500'
              }}>
                {user?.name}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: '500'
              }}>
                Email Address
              </label>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #e9ecef',
                color: '#333',
                fontWeight: '500'
              }}>
                {user?.email}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: '500'
              }}>
                Account Type
              </label>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #e9ecef'
              }}>
                <span style={{
                  backgroundColor: user?.accountType === 'SELLER' ? '#8B4513' : user?.accountType === 'ADMIN' ? '#dc3545' : '#6c757d',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {user?.accountType}
                </span>
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontWeight: '500'
              }}>
                Member Since
              </label>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #e9ecef',
                color: '#333',
                fontWeight: '500'
              }}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            color: '#8B4513',
            fontSize: '22px',
            fontWeight: 'bold',
            marginBottom: '20px',
            borderBottom: '2px solid #8B4513',
            paddingBottom: '10px'
          }}>
            Quick Actions
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <button
              style={{
                backgroundColor: '#8B4513',
                color: 'white',
                padding: '15px 20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a0522d'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8B4513'}
            >
              Browse Products
            </button>

            {user?.accountType === 'SELLER' && (
              <button
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  padding: '15px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
              >
                Manage Products
              </button>
            )}

            <button
              style={{
                backgroundColor: '#8B4513',
                color: 'white',
                padding: '15px 20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a0522d'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8B4513'}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}