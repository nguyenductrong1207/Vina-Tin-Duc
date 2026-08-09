import { useQuery } from '@tanstack/react-query';
import { strapiApi, mapArticle } from '@/services/api';
import type { Article } from '@/types/domain';

export function useArticle(slug: string) {
  return useQuery<Article | null>({
    queryKey: ['article', slug],
    queryFn: async () => {
      const response = await strapiApi.getArticleBySlug(slug);
      const first = response.data[0];
      return first ? mapArticle(first) : null;
    },
    enabled: !!slug,
  });
}
