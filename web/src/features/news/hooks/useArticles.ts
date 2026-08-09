import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapArticle } from '@/services/api';
import type { Article } from '@/types/domain';

export function useArticles(page = 1) {
  return useQuery<Article[]>({
    queryKey: ['articles', page],
    queryFn: async () => {
      const response = await strapiApi.getArticles(page);
      return response.data.map(mapArticle);
    },
  });
}
