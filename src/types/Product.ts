export type Product = {
  id: number;
  documentId?: string;
  title?: string;
  description?: string;
  price?: number;
  isInStock?: boolean;
  images?: Array<{ url?: string }>;
  productCategory?: {
    title?: string;
    documentId?: string;
  };
};
