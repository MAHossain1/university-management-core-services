import { z } from 'zod';

export const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required.',
    }),
  }),
});
export const update = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const BuildingValidation = {
  create,
  update,
};
