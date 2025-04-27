import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { fetchCategories } from 'services/categoryService';
import type { Category } from 'types/Category';

class CategoryStore {
  categories: Category[] = [];
  loading = false;
  error: string | null = null;
  statusCode: number | null = null;
  currentPage = 1;
  totalPages: number = 1;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  async loadCategoriesBasic(): Promise<void> {
    this.loading = true;
    this.error = null;
    this.statusCode = null;

    try {
      const response = await fetchCategories();

      runInAction(() => {
        this.categories = response.data.map((cat: Category) => ({
          id: cat.id,
          documentId: cat.documentId,
          title: cat.title,
        }));
      });
    } catch (error) {
      this.handleError(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async loadCategoriesWithImages(params: { page?: number } = {}): Promise<void> {
    this.loading = true;
    this.error = null;
    this.statusCode = null;

    try {
      const response = await fetchCategories({
        pagination: {
          page: params.page || this.currentPage,
          pageSize: 8,
        },
        populate: ['image'],
      });

      runInAction(() => {
        this.categories = response.data.map((cat: Category) => ({
          id: cat.id,
          documentId: cat.documentId,
          title: cat.title,
          image: {
            url: cat.image?.url,
          },
        }));
        this.totalPages = response.meta.pagination.pageCount || 1;
      });
    } catch (error) {
      this.handleError(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  private handleError(error: unknown) {
    runInAction(() => {
      if (axios.isAxiosError(error)) {
        this.error = error.response?.data?.error?.message || error.message;
        this.statusCode = error.response?.status || 500;
      } else {
        this.error = 'Unknown error occurred';
        this.statusCode = 500;
      }
    });
  }
}

export const categoryStore = new CategoryStore();
