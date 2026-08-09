import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapProduct } from '@/services/api';
import type { Product } from '@/types/domain';

export function useProducts(page = 1) {
  return useQuery<Product[]>({
    queryKey: ['products', page],
    queryFn: async () => {
      const response = await strapiApi.getProducts(page);
      return response.data.map(mapProduct);
    },
  });
}
