import { makeAutoObservable, runInAction } from 'mobx';
import { login, register } from 'services/authService';
import type { User } from 'types/User';
import { notifyError, notifySuccess, notifyInfo } from 'utils/notify';
import axios from 'axios';

class AuthStore {
  user: User | null = null;
  jwt: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadFromStorage();
  }

  get isAuthenticated() {
    return !!this.jwt;
  }

  loadFromStorage() {
    const jwt = localStorage.getItem('jwt');
    const user = localStorage.getItem('user');

    if (jwt && user) {
      this.jwt = jwt;
      this.user = JSON.parse(user);
    }
  }

  saveToStorage() {
    if (this.jwt && this.user) {
      localStorage.setItem('jwt', this.jwt);
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  clearStorage() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }

  logout() {
    this.jwt = null;
    this.user = null;
    this.clearStorage();
    notifyInfo('Logged out');
  }

  async login(data: { identifier: string; password: string }) {
    try {
      const response = await login(data);
      runInAction(() => {
        this.jwt = response.jwt;
        this.user = response.user;
        this.saveToStorage();
      });
      notifySuccess('Login successful');
      return true;
    } catch (error: unknown) {
      const msg = axios.isAxiosError(error) ? error.response?.data?.error?.message || error.message : 'Login failed';
      notifyError(msg);
      return false;
    }
  }

  async register(data: { username: string; email: string; password: string }) {
    try {
      const response = await register(data);
      runInAction(() => {
        this.jwt = response.jwt;
        this.user = response.user;
        this.saveToStorage();
        return true;
      });
      notifySuccess('Registration successful');
    } catch (error: unknown) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.error?.message || error.message
        : 'Registration failed';
      notifyError(msg);
      return false;
    }
  }
}

export const authStore = new AuthStore();
