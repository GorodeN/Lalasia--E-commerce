import { useMemo } from 'react';
import { cartStore } from 'store/CartStore';

export const useCart = () => useMemo(() => cartStore, []);
