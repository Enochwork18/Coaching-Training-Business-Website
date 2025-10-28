/**
 * Authentication Utilities
 * Client-side auth management with localStorage
 * TODO: Replace with httpOnly cookies in production
 */

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  phone?: string
}

const AUTH_TOKEN_KEY = 'auth_token'
const USER_DATA_KEY = 'user_data'

/**
 * Save authentication data to localStorage
 */
export function saveAuth(token: string, user: User): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
}

/**
 * Get authentication token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

/**
 * Get current user data
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  const userData = localStorage.getItem(USER_DATA_KEY)
  if (!userData) return null
  
  try {
    return JSON.parse(userData)
  } catch {
    return null
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

/**
 * Check if current user is admin
 */
export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === 'admin'
}

/**
 * Clear authentication data (logout)
 */
export function clearAuth(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(USER_DATA_KEY)
}

/**
 * Logout and redirect
 */
export function logout(): void {
  clearAuth()
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

/**
 * Redirect to login if not authenticated
 */
export function requireAuth(): void {
  if (typeof window === 'undefined') return
  
  if (!isAuthenticated()) {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
  }
}

/**
 * Redirect to admin login if not admin
 */
export function requireAdmin(): void {
  if (typeof window === 'undefined') return
  
  const user = getCurrentUser()
  
  if (!user || user.role !== 'admin') {
    window.location.href = '/admin/login'
  }
}
