const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('vintie_token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  },

  auth: {
    login: (email, password) => api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    signup: (email, password, fullName) => api.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    }),
    me: () => api.request('/auth/me'),
  },

  products: {
    getAll: () => api.request('/products'),
    getOne: (id) => api.request(`/products/${id}`),
    create: (product) => api.request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
    update: (id, product) => api.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
    delete: (id) => api.request(`/products/${id}`, {
      method: 'DELETE',
    }),
  },

  categories: {
    getAll: () => api.request('/categories'),
    create: (category) => api.request('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    }),
    update: (id, category) => api.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    }),
    delete: (id) => api.request(`/categories/${id}`, {
      method: 'DELETE',
    }),
  },

  testimonials: {
    getAll: () => api.request('/testimonials'),
    create: (testimonial) => api.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial),
    }),
    update: (id, testimonial) => api.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonial),
    }),
    delete: (id) => api.request(`/testimonials/${id}`, {
      method: 'DELETE',
    }),
  },

  blog: {
    getAll: () => api.request('/blog_posts'),
    create: (post) => api.request('/blog_posts', {
      method: 'POST',
      body: JSON.stringify(post),
    }),
    update: (id, post) => api.request(`/blog_posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    }),
    delete: (id) => api.request(`/blog_posts/${id}`, {
      method: 'DELETE',
    }),
  },

  orders: {
    getAll: () => api.request('/orders'),
    getByUser: () => api.request('/orders/user'),
    create: (order) => api.request('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),
  },

  customers: {
    getAll: () => api.request('/customers'),
  }
};

export default api;
