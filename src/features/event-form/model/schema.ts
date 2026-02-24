// import { z } from 'zod';

// export const eventSchema = z.object({
//   title: z.string().min(3, 'Минимум 3 символа'),
//   description: z.string().optional(),
//   eventType: z.enum(['online', 'offline', 'hybrid']),
//   priority: z.enum(['low', 'medium', 'high']),

//   // Условная валидация будет в форме
//   location: z.string().optional(),
//   meetingLink: z.string().url('Неверный URL').optional(),
//   maxAttendees: z.number().min(1).optional(),
//   requiresApproval: z.boolean().default(false),

//   startDate: z.date(),
//   endDate: z.date(),
//   tags: z.array(z.string()).default([]),
// });

// export type EventFormSchema = z.infer<typeof eventSchema>;
export type EventFormSchema = any;
