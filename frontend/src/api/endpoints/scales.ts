import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { createRequest } from 'api/createRequest';
import { ScalesDto, scalesDto } from 'api/types/scales';
import { OmitTyped } from 'shared/types';

type UseScalesOptions = OmitTyped<
  UseQueryOptions<ScalesDto, unknown, ScalesDto, string[]>,
  'queryKey' | 'queryFn'
>;

export const scalesQueryKey = {
  root: ['scales'],
};

export const useScales = (
  url: string,
  options?: UseScalesOptions,
): UseQueryResult<ScalesDto, unknown> =>
  useQuery({
    queryKey: scalesQueryKey.root,
    queryFn: () =>
      createRequest({
        options: {
          baseURL: url,
          method: 'GET',
        },
        schema: scalesDto,
      }),

    ...options,
  });
