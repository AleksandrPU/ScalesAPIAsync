import { z } from 'zod';

export const scalesDto = z.object({
  weight: z.union([z.string(), z.number()]).nullable(),
  status: z.enum(['stable', 'unstable', 'overload']),
});

export type ScalesDto = z.infer<typeof scalesDto>;
