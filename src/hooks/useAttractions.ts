import { useQuery } from 'react-query';

export type COUNTRY_CODE = 'de' | 'kr';
export type COUNTRY_CODE_FILTER = 'all' | COUNTRY_CODE;

const useAttractions = ({
  country,
  keyword,
}: {
  country: COUNTRY_CODE_FILTER;
  keyword: string;
}) => {
  return useQuery<
    {
      id: number;
      country: string;
      title: string;
      url: string;
    }[]
  >({
    queryKey: ['useAttractions', country, keyword],
    queryFn: async () => {
      const params: {
        title_like: string;
        country?: COUNTRY_CODE;
      } = {
        title_like: keyword,
      };
      if (country !== 'all') params.country = country;

      const res = await fetch(
        `http://localhost:3000/attractions?${new URLSearchParams(params)}`
      );
      return res.json();
    },
    useErrorBoundary: true,
  });
};

export default useAttractions;
