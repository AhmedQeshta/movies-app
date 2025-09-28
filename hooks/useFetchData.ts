import { IFetchDataHookProps } from '@/types/data';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const useFetchData = <T>({
  queryFn,
  queryKey,
  staleTime,
}: IFetchDataHookProps<T>): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: staleTime || 30 * 60 * 1000, // 30 minutes
  });
};

export default useFetchData;
