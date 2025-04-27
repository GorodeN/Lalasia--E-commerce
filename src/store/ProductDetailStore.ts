import { makeAutoObservable, runInAction } from 'mobx';
import { fetchProductById, fetchProducts } from 'services/productService';
import type { Product } from 'types/Product';
import axios from 'axios';
import { ILocalStore } from 'hooks/useLocalStore';

export class ProductDetailStore implements ILocalStore {
  product: Product | null = null;
  loading = false;
  error: string | null = null;
  statusCode: number | null = null;
  loaded = false;
  relatedProducts: Product[] = [];
  relatedLoading = false;
  relatedError: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadProductById(documentId: string): Promise<void> {
    this.loading = true;
    this.error = null;
    this.statusCode = null;
    this.loaded = false;

    try {
      const params = { populate: ['images', 'productCategory'] };
      const { data } = await fetchProductById(documentId, params);

      runInAction(() => {
        this.product = data;
        const category = data.productCategory?.title;
        const productId = data.id;
        if (category && productId) {
          this.loadRelatedProducts(category, productId);
        }
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
        this.loaded = true;
      });
    }
  }

  async loadRelatedProducts(categoryTitle: string, excludeId: number) {
    this.relatedLoading = true;
    this.relatedError = null;

    try {
      const params = {
        filters: {
          productCategory: { title: { $eq: categoryTitle } },
          id: { $ne: excludeId },
          isInStock: true,
        },
        populate: ['images', 'productCategory'],
        pagination: { page: 1, pageSize: 3 },
      };

      const response = await fetchProducts(params);

      runInAction(() => {
        this.relatedProducts = response.data;
      });
    } catch (error) {
      runInAction(() => {
        if (axios.isAxiosError(error)) {
          this.relatedError = error.message;
        } else {
          this.relatedError = 'Failed to load related products';
        }
      });
    } finally {
      runInAction(() => {
        this.relatedLoading = false;
      });
    }
  }

  destroy(): void {
    this.product = null;
    this.error = null;
    this.statusCode = null;
    this.loaded = false;
    this.loading = false;
    this.relatedProducts = [];
    this.relatedLoading = false;
    this.relatedError = null;
  }
}
