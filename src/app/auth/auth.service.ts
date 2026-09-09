import { signal, Service } from '@angular/core';

export type UserRole = 'admin' | 'user';

export interface AuthUser {
  username: string;
  password: string;
  role: UserRole;
}

const AUTH_USERS_KEY = 'shopkart_auth_users';
const AUTH_CURRENT_USER_KEY = 'shopkart_current_user';
const AUTH_TOKEN_KEY = 'shopkart_jwt_token';

type AuthSessionUser = Omit<AuthUser, 'password'>;

@Service()
export class AuthService {
  private defaultUsers: AuthUser[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' },
  ];

  currentUser = signal<AuthSessionUser | null>(null);
  token = signal<string | null>(null);

  constructor() {
    this.checkUsersExist();
    this.restoreSession();
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const matchedUser = users.find(
      (user) => user.username === username.trim() && user.password === password
    );

    if (!matchedUser) {
      return false;
    }

    const safeUser: AuthSessionUser = { username: matchedUser.username, role: matchedUser.role };
    const fakeJwtToken = this.createFakeJwtToken(safeUser.username, safeUser.role);

    this.currentUser.set(safeUser);
    this.token.set(fakeJwtToken);

    localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(safeUser));
    localStorage.setItem(AUTH_TOKEN_KEY, fakeJwtToken);
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    this.token.set(null);
    localStorage.removeItem(AUTH_CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  getToken(): string | null {
    return this.token();
  }

  private checkUsersExist(): void {
    const existingUsers = localStorage.getItem(AUTH_USERS_KEY);

    if (!existingUsers) {
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(this.defaultUsers));
    }
  }

  private getUsers(): AuthUser[] {
    const rawUsers = localStorage.getItem(AUTH_USERS_KEY);

    if (!rawUsers) {
      return this.defaultUsers;
    }

    try {
      return JSON.parse(rawUsers) as AuthUser[];
    } catch {
      return this.defaultUsers;
    }
  }

  private restoreSession(): void {
    const rawCurrentUser = localStorage.getItem(AUTH_CURRENT_USER_KEY);
    const rawToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!rawCurrentUser) {
      this.token.set(null);
      return;
    }

    try {
      this.currentUser.set(JSON.parse(rawCurrentUser) as AuthSessionUser);
      this.token.set(rawToken ?? null);
    } catch {
      this.currentUser.set(null);
      this.token.set(null);
      localStorage.removeItem(AUTH_CURRENT_USER_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }

  private createFakeJwtToken(username: string, role: UserRole): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ sub: username, role, iat: Date.now() }));
    const signature = 'demo-signature';
    return `${header}.${payload}.${signature}`;
  }
}
