import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapHomepage } from '@/services/api';
import type { Homepage } from '@/types/domain';

export function useHomepage() {
  return useQuery<Homepage | null>({
    queryKey: ['homepage'],
    queryFn: async () => {
      const response = await strapiApi.getHomepage();
      if (!response.data) return null;
      return mapHomepage(response.data);
    },
  });
}
