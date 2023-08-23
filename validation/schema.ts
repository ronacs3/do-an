import { z } from 'zod';

const SignUpSchema = z
    .object({
        username: z
            .string()
            .toLowerCase()
            .min(3, { message: 'Username must be at least 3 characters' })
            .max(20, { message: 'Username must be less than 20 characters' })
            .trim(),
        email: z.string().toLowerCase().email({ message: 'Must be email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    });
const SignInSchema = z.object({
    username: z
        .string()
        .toLowerCase()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(20, { message: 'Username must be less than 20 characters' })
        .trim(),
    password: z
        .string()
        .min(6, { message: 'Username must be at least 6 characters' })
        .max(20, { message: 'Username must be less than 20 characters' }),
});
const ChangePassword = z
    .object({
        oldPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        newPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmNewPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Password do not match',
        path: ['confirmNewPassword'],
    });
const ChangeProfile = z.object({
    email: z.string().toLowerCase().email({ message: 'Must be email address' }),
    fName: z.string().max(20, { message: 'First name must be less than 20 characters' }),
    lName: z.string().max(20, { message: 'Last name must be less than 20 characters' }),
});
export { SignUpSchema, SignInSchema, ChangePassword, ChangeProfile };
