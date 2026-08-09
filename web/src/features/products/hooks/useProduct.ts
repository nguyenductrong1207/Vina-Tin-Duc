import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapProduct } from '@/services/api';
import type { Product } from '@/types/domain';

export function useProduct(slug: string) {
  return useQuery<Product | null>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await strapiApi.getProductBySlug(slug);
      const first = response.data[0];
      return first ? mapProduct(first) : null;
    },
    enabled: !!slug,
  });
}
