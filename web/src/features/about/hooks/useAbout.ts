import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapAbout } from '@/services/api';
import type { About } from '@/types/domain';

export function useAbout() {
  return useQuery<About>({
    queryKey: ['about'],
    queryFn: async () => {
      const response = await strapiApi.getAbout();
      return mapAbout(response.data);
    },
  });
}
