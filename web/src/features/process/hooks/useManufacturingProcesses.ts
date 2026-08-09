import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapManufacturingProcess } from '@/services/api';
import type { ManufacturingProcess } from '@/types/domain';

export function useManufacturingProcesses() {
  return useQuery<ManufacturingProcess[]>({
    queryKey: ['manufacturing-processes'],
    queryFn: async () => {
      const response = await strapiApi.getManufacturingProcesses();
      return response.data.map(mapManufacturingProcess);
    },
  });
}
