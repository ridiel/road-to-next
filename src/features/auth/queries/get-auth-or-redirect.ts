import { redirect } from 'next/navigation';

import { signInPath } from '@/paths';

import { getAuth } from './get-auth';

/**
 * The function `getAuthOrRedirect` checks if a user is authenticated and redirects to sign in if not.
 * @returns The `getAuthOrRedirect` function returns the `auth` object after checking if the user is
 * authenticated. If the user is not authenticated, it redirects to the sign-in path before returning
 * the `auth` object.
 */
export const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  return auth;
};
