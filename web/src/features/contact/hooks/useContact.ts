import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapContact } from '@/services/api';
import type { Contact } from '@/types/domain';

export function useContact() {
  return useQuery<Contact>({
    queryKey: ['contact'],
    queryFn: async () => {
      const response = await strapiApi.getContact();
      return mapContact(response.data);
    },
  });
}
