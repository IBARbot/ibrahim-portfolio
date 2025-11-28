import { useState, useEffect } from "react";
import { AdminLogin } from "../components/AdminLogin";
import { AdminDashboard } from "../components/AdminDashboard";
import { BlogPostData } from "../components/BlogEditor";
import { supabase } from "../utils/supabase/client";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { blogAPI, contactAPI, newsletterAPI, analyticsAPI, storageAPI } from "../utils/api";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-45a44eb5`;

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}

interface NewsletterSubscriber {
  email: string;
  name?: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

interface AnalyticsSummary {
  totalPosts: number;
  totalContacts: number;
  newContacts: number;
  totalNewsletterSubscribers: number;
  totalPageviews: number;
  todayPageviews: number;
  todayContacts: number;
}

interface BookingSubmission {
  id: string;
  type: 'flight' | 'hotel' | 'insurance' | 'embassy';
  name: string;
  email: string;
  phone: string;
  created_at: string;
  status: 'new' | 'contacted' | 'completed';
  [key: string]: any;
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if user has active session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (!error && session?.access_token) {
        setAccessToken(session.access_token);
        setIsAuthenticated(true);
        await loadPosts(session.access_token);
        await loadContacts(session.access_token);
        await loadSubscribers(session.access_token);
        await loadAnalytics(session.access_token);
        await loadBookings(session.access_token);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPosts = async (token: string) => {
    // First try localStorage for instant load
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error('Error parsing localStorage posts:', e);
      }
    }

    // Then try backend
    try {
      const response = await fetch(`${API_URL}/blog/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.posts) {
          setPosts(data.posts);
          localStorage.setItem("blogPosts", JSON.stringify(data.posts));
        }
      }
    } catch (error) {
      // Silently fail - we already have localStorage data
      // Backend is optional - no logs needed
    }
  };

  const loadContacts = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/contact/submissions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.submissions || []);
      }
    } catch (error) {
      // Silently fail for contacts - backend is optional
    }
  };

  const loadSubscribers = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/newsletter/subscribers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (error) {
      // Silently fail for subscribers - backend is optional
    }
  };

  const loadAnalytics = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/analytics/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      // Silently fail for analytics - backend is optional
    }
  };

  const loadBookings = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/booking/submissions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.submissions || []);
      }
    } catch (error) {
      // Silently fail for bookings - backend is optional
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.session?.access_token) {
        throw new Error('Giriş uğursuz oldu');
      }

      setAccessToken(data.session.access_token);
      setIsAuthenticated(true);
      await loadPosts(data.session.access_token);
      await loadContacts(data.session.access_token);
      await loadSubscribers(data.session.access_token);
      await loadAnalytics(data.session.access_token);
      await loadBookings(data.session.access_token);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Email və ya şifrə yanlışdır');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setAccessToken(null);
      setPosts([]);
      setContacts([]);
      setSubscribers([]);
      setAnalytics(null);
      setBookings([]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCreatePost = async (post: BlogPostData) => {
    if (!accessToken) {
      throw new Error('İcazə verilmədi');
    }

    // First, save to localStorage immediately
    const newPost = { ...post, id: post.id || Date.now().toString() };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

    // Then try to sync to backend
    try {
      const response = await fetch(`${API_URL}/blog/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const data = await response.json();
        // Update with server response if successful
        const serverPosts = posts.map(p => p.id === newPost.id ? data.post : p);
        setPosts(serverPosts);
        localStorage.setItem("blogPosts", JSON.stringify(serverPosts));
      }
    } catch (error: any) {
      // Already saved to localStorage, so we can continue
      // Silently proceed without backend
    }
  };

  const handleUpdatePost = async (post: BlogPostData) => {
    if (!accessToken) {
      throw new Error('İcazə verilmədi');
    }

    // First, update localStorage immediately
    const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
    setPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

    // Then try to sync to backend
    try {
      const response = await fetch(`${API_URL}/blog/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        const data = await response.json();
        // Update with server response if successful
        const serverPosts = posts.map((p) => (p.id === post.id ? data.post : p));
        setPosts(serverPosts);
        localStorage.setItem("blogPosts", JSON.stringify(serverPosts));
      }
    } catch (error: any) {
      // Already saved to localStorage, so we can continue
      // Silently proceed without backend
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!accessToken) {
      throw new Error('İcazə verilmədi');
    }

    // First, delete from localStorage immediately
    const updatedPosts = posts.filter((p) => p.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

    // Then try to sync to backend
    try {
      const response = await fetch(`${API_URL}/blog/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Success or fail, we already deleted from localStorage
    } catch (error: any) {
      // Already deleted from localStorage, so we can continue
      // Silently proceed without backend
    }
  };

  const handleUpdateContactStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    if (!accessToken) {
      throw new Error('İcazə verilmədi');
    }

    try {
      const response = await fetch(`${API_URL}/contact/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Status yenilənərkən xəta baş verdi');
      }

      // Update local state
      const updatedContacts = contacts.map((c) => 
        c.id === id ? { ...c, status } : c
      );
      setContacts(updatedContacts);
    } catch (error: any) {
      console.error('Update contact status error:', error);
      throw new Error(error.message || 'Status yenilənərkən xəta baş verdi');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!accessToken) {
      throw new Error('İcazə verilmədi');
    }

    try {
      const response = await fetch(`${API_URL}/contact/submissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Mesaj silinərkən xəta baş verdi');
      }

      // Update local state
      const updatedContacts = contacts.filter((c) => c.id !== id);
      setContacts(updatedContacts);
    } catch (error: any) {
      console.error('Delete contact error:', error);
      throw new Error(error.message || 'Mesaj silinərkən xəta baş verdi');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminDashboard
      posts={posts}
      onCreatePost={handleCreatePost}
      onUpdatePost={handleUpdatePost}
      onDeletePost={handleDeletePost}
      onLogout={handleLogout}
      contacts={contacts}
      subscribers={subscribers}
      analytics={analytics}
      onUpdateContactStatus={handleUpdateContactStatus}
      onDeleteContact={handleDeleteContact}
      bookings={bookings}
    />
  );
}