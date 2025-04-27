import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { notifyError, notifySuccess, notifyInfo } from 'utils/notify';
import { fetchProducts } from 'services/productService';
import axios from 'axios';
import type { Product } from 'types/Product';

export type CartItem = {
  productId: number;
  quantity: number;
};

class CartStore {
  items: CartItem[] = [];
  cartProducts: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('cart');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        runInAction(() => {
          this.items = parsed;
        });
      } catch {
        runInAction(() => {
          this.items = [];
        });
      }
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  addToCart(productId: number, productTitle: string) {
    try {
      runInAction(() => {
        const existing = this.items.find((item) => item.productId === productId);
        if (existing) {
          existing.quantity += 1;
        } else {
          this.items.push({ productId, quantity: 1 });
        }
        this.saveToLocalStorage();
      });
      notifySuccess(`${productTitle} added to cart`);
    } catch {
      notifyError(`Failed to add product to cart`);
    }
  }

  async loadCartProducts() {
    this.loading = true;
    this.error = null;

    try {
      const ids = this.items.map((item) => item.productId);

      runInAction(() => {
        if (ids.length === 0) {
          this.cartProducts = [];
        }
      });

      if (ids.length === 0) return;

      const response = await fetchProducts({
        filters: { id: { $in: ids } },
        populate: ['images', 'productCategory'],
      });

      const fetchedProducts: Product[] = response.data;
      const fetchedIds = new Set(fetchedProducts.map((p) => p.id));

      runInAction(() => {
        const missingIds = ids.filter((id) => !fetchedIds.has(id));
        if (missingIds.length > 0) {
          this.items = this.items.filter((item) => !missingIds.includes(item.productId));
          this.saveToLocalStorage();
        }
        this.cartProducts = fetchedProducts;
      });
    } catch (error) {
      runInAction(() => {
        if (axios.isAxiosError(error)) {
          this.error = error.response?.data?.error?.message || error.message;
        } else {
          this.error = 'Failed to load cart products';
        }
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  getMergedCartItems() {
    return toJS(this.items)
      .map((item) => ({
        ...item,
        product: this.cartProducts.find((p) => p.id === item.productId),
      }))
      .filter((item): item is CartItem & { product: Product } => !!item.product);
  }

  removeFromCart(productId: number) {
    try {
      runInAction(() => {
        this.items = this.items.filter((item) => item.productId !== productId);
        this.saveToLocalStorage();
      });
      notifyInfo(`Product removed from cart`);
    } catch {
      notifyError(`Failed to remove product from cart`);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.items.find((item) => item.productId === productId);
    if (item) {
      try {
        runInAction(() => {
          item.quantity = quantity;
          if (item.quantity <= 0) {
            this.removeFromCart(productId);
          } else {
            this.saveToLocalStorage();
          }
        });
      } catch {
        notifyError(`Failed to update quantity`);
      }
    }
  }

  clearCart() {
    try {
      runInAction(() => {
        this.items = [];
        localStorage.removeItem('cart');
      });
      notifyInfo('Cart cleared');
    } catch {
      notifyError('Failed to clear cart');
    }
  }

  get totalItems() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  isInCart(productId: number) {
    return this.items.some((item) => item.productId === productId);
  }
}

export const cartStore = new CartStore();
