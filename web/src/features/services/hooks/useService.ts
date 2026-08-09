import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapService } from '@/services/api';
import type { Service } from '@/types/domain';

export function useService(slug: string) {
  return useQuery<Service | null>({
    queryKey: ['service', slug],
    queryFn: async () => {
      const response = await strapiApi.getServiceBySlug(slug);
      const first = response.data[0];
      return first ? mapService(first) : null;
    },
    enabled: !!slug,
  });
}
