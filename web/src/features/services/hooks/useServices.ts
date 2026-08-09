import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapService } from '@/services/api';
import type { Service } from '@/types/domain';

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await strapiApi.getServices();
      return response.data.map(mapService);
    },
  });
}
