import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string()
        .min(2, "Имя должно содержать минимум 2 символа")
        .max(20, "Слишком длинное имя"),
    age: z.number({
            error: (iss) => {
                if (iss.code === "invalid_type") {
                    return "Заполните поле";
                }
                return "Неверный формат";
            }
        })
        .min(0, "Возраст не может быть отрицательным"),
    mood: z.enum(['good-good', 'good-neutral', 'good-chaotic', 'evil-good', 'evil-neutral', 'evil-chaotic']),
    element: z.enum(['fire', 'earth', 'water', 'air']),
    extra: z.array(z.enum(['blacksmith', 'alchemy', 'stealth'])),
    info: z.string()
        .max(10000, "Не стоит превращать примечания в летопись"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;