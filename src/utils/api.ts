import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-45a44eb5`;

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('access_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : `Bearer ${publicAnonKey}`,
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API xətası baş verdi');
  }

  return data;
}

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  signup: async (email: string, password: string, name: string) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },
};

// ============================================
// BLOG API
// ============================================

export const blogAPI = {
  getPosts: async () => {
    return apiCall<{ posts: any[] }>('/blog/posts');
  },

  getPost: async (id: string) => {
    return apiCall<{ post: any }>(`/blog/posts/${id}`);
  },

  createPost: async (post: any) => {
    return apiCall('/blog/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  updatePost: async (id: string, updates: any) => {
    return apiCall(`/blog/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  deletePost: async (id: string) => {
    return apiCall(`/blog/posts/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================
// CONTACT API
// ============================================

export const contactAPI = {
  submit: async (submission: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => {
    return apiCall('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(submission),
    });
  },

  getSubmissions: async () => {
    return apiCall<{ submissions: any[] }>('/contact/submissions');
  },

  updateStatus: async (id: string, status: 'new' | 'read' | 'replied') => {
    return apiCall(`/contact/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  deleteSubmission: async (id: string) => {
    return apiCall(`/contact/submissions/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================
// NEWSLETTER API
// ============================================

export const newsletterAPI = {
  subscribe: async (email: string, name?: string) => {
    return apiCall('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  },

  getSubscribers: async () => {
    return apiCall<{ subscribers: any[]; count: number }>(
      '/newsletter/subscribers'
    );
  },

  unsubscribe: async (email: string) => {
    return apiCall('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// ============================================
// ANALYTICS API
// ============================================

export const analyticsAPI = {
  trackPageView: async (page: string) => {
    return apiCall('/analytics/pageview', {
      method: 'POST',
      body: JSON.stringify({
        page,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      }),
    });
  },

  getSummary: async () => {
    return apiCall<{
      totalPosts: number;
      totalContacts: number;
      newContacts: number;
      totalNewsletterSubscribers: number;
      totalPageviews: number;
      todayPageviews: number;
      todayContacts: number;
    }>('/analytics/summary');
  },
};

// ============================================
// STORAGE API
// ============================================

export const storageAPI = {
  uploadFile: async (file: File) => {
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/storage/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Fayl yüklənərkən xəta baş verdi');
    }

    return data as { success: boolean; filename: string; url: string };
  },

  getFileUrl: async (filename: string) => {
    return apiCall<{ success: boolean; url: string }>(
      `/storage/file/${filename}`
    );
  },

  deleteFile: async (filename: string) => {
    return apiCall(`/storage/file/${filename}`, {
      method: 'DELETE',
    });
  },
};

// ============================================
// BOOKING API (Google Sheets via Netlify Function)
// ============================================

export const bookingAPI = {
  submit: async (bookingData: {
    type: 'flight' | 'hotel' | 'insurance' | 'embassy' | 'contact';
    name: string;
    email: string;
    phone: string;
    [key: string]: any;
  }) => {
    const response = await fetch('/.netlify/functions/submit-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Məlumat göndərilərkən xəta baş verdi');
    }

    return data;
  },
};
