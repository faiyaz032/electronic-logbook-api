import { TypeOf, object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'first name must be required',
    }),
    lastName: string({
      required_error: 'last name must be required',
    }),
    email: string({
      required_error: 'email must be required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'password name must be required',
    }).min(6, 'Password is too short-should be 6 chars'),
    mobile: string({
      required_error: 'mobile must be required',
    }),
    role: string({
      required_error: 'role must be required',
    }),
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string({
      required_error: 'You must provide user id',
    }),
    verificationCode: string({
      required_error: 'You must provide verification code',
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
