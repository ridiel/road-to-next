import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { getAuth } from '../queries/get-auth';

// Define type for what Lucia actually returns
type AuthUser = {
  id: string;
  username: string;
  email: string;
};

/**
 * The `useAuth` function in TypeScript manages user authentication state and fetches user data based
 * on the current pathname.
 * @returns The `useAuth` custom hook is returning an object with two properties: `user` and
 * `isFetched`. The `user` property holds the authenticated user data (of type `AuthUser` or `null`),
 * and the `isFetched` property is a boolean flag indicating whether the user data has been fetched or
 * not.
 */
const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isFetched, setFetched] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setFetched(true);
    };

    fetchUser();
  }, [pathname]);

  return { user, isFetched };
};

export { useAuth };
