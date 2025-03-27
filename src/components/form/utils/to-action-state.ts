import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionState<T = any> = {
  status?: 'SUCCESS' | 'ERROR';
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
  data?: T;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    // if validation error with Zod, return first error message
    return {
      status: 'ERROR',
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  }

  // if another error instance, return error message
  // e.g. database error
  if (error instanceof Error) {
    return {
      status: 'ERROR',
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }

  // if not an error instance but something else crashed
  // return generic error message
  return {
    status: 'ERROR',
    message: 'Unknown error occurred',
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
  };
};

export const toActionState = (
  status: ActionState['status'],
  message: string,
  formData?: FormData,
  data?: unknown,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    data,
    timestamp: Date.now(),
  };
};
