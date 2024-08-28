import { z } from 'zod';

// export const adminSchema = z.object({
//     username: z.string().min(3, { message: 'Username must be at least 3 characters long.' }).max(50, { message: 'Username must be at most 50 characters long.' }),
//     password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
// });

export const registerSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password should be atleast 6 characters long" }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password is atleast 6 characters long" }),
});