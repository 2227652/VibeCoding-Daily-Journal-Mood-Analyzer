import { z } from 'zod';

export const entrySchema = z.object({
  title: z.string({ error: 'Title is required' }).min(1, 'Title is required').max(120, 'Title too long'),
  content: z.string({ error: 'Content is required' }).min(1, 'Write something...').max(10000, 'Too long'),
  mood: z.enum(['amazing', 'happy', 'okay', 'sad', 'awful'], { error: 'Pick a mood' }),
  tags: z.array(z.string()).default([] as string[]),
});

export type EntryFormData = z.infer<typeof entrySchema>;
