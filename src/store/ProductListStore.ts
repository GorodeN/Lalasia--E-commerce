import { makeAutoObservable, runInAction } from 'mobx';
import { fetchProducts } from 'services/productService';
import axios from 'axios';
import type { Product } from 'types/Product';
import { ILocalStore } from 'hooks/useLocalStore';

export class ProductListStore implements ILocalStore {
  products: Product[] = [];
  loading = false;
  searchQuery = '';
  sortOrder: 'asc' | 'desc' | null = null;
  selectedFilters: string[] = [];
  currentPage = 1;
  totalPages = 0;
  totalProducts = 0;
  error: string | null = null;
  statusCode: number | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
  }

  setSortOrder(order: 'asc' | 'desc' | null, fromUser = true) {
    this.sortOrder = order;
    if (fromUser) {
      this.currentPage = 1;
    }
  }

  setSelectedFilters(filters: string[]) {
    this.selectedFilters = filters;
    this.currentPage = 1;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  async loadProducts() {
    this.loading = true;
    this.error = null;
    this.statusCode = null;

    try {
      const filters: Record<string, unknown> = {};

      filters.isInStock = { $eq: true };

      if (this.searchQuery) {
        filters.title = { $containsi: this.searchQuery };
        filters.isInStock = {};
      }

      if (this.selectedFilters.length > 0) {
        filters.productCategory = {
          title: { $in: this.selectedFilters },
        };
      }

      const params: {
        filters: Record<string, unknown>;
        populate: string[];
        pagination: { page: number; pageSize: number };
        sort?: string;
      } = {
        filters,
        populate: ['images', 'productCategory'],
        pagination: {
          page: this.currentPage,
          pageSize: 9,
        },
      };

      if (this.sortOrder === 'asc') {
        params.sort = 'price:asc';
      } else if (this.sortOrder === 'desc') {
        params.sort = 'price:desc';
      }

      const response = await fetchProducts(params);

      runInAction(() => {
        this.products = response.data;
        this.totalPages = response.meta.pagination.pageCount;
        this.totalProducts = response.meta.pagination.total;
      });
    } catch (error) {
      runInAction(() => {
        if (axios.isAxiosError(error)) {
          this.error = error.response?.data?.error?.message || error.message;
          this.statusCode = error.response?.status || 500;
        } else {
          this.error = 'Unknown error occurred';
          this.statusCode = 500;
        }
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  destroy(): void {
    this.products = [];
    this.loading = false;
    this.searchQuery = '';
    this.sortOrder = null;
    this.selectedFilters = [];
    this.currentPage = 1;
    this.totalPages = 0;
    this.totalProducts = 0;
    this.error = null;
    this.statusCode = null;
  }
}
