'use server';
import { cookies } from 'next/headers';

/**
 * The function `getCookieByKey` retrieves a cookie value by its key asynchronously.
 * @param {string} key - The `key` parameter in the `getCookieByKey` function is a string that
 * represents the name of the cookie you want to retrieve from the cookie store.
 * @returns The function `getCookieByKey` is returning the value of the cookie with the specified key.
 * If the cookie is not found, it returns `null`.
 */
export const getCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);

  if (!cookie) return null;

  return cookie.value;
};

/**
 * The function `setCookieByKey` asynchronously sets a cookie with a specified key and value.
 * @param {string} key - The `key` parameter is a string that represents the name of the cookie you
 * want to set.
 * @param {string} value - The `value` parameter in the `setCookieByKey` function represents the value
 * that you want to set for the cookie associated with the specified `key`. This value can be a string
 * containing any data that you want to store in the cookie.
 */
export const setCookieByKey = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
};

/**
 * The function `deleteCookieByKey` deletes a cookie by its key.
 * @param {string} key - The `key` parameter in the `deleteCookieByKey` function is a string that
 * represents the name of the cookie that you want to delete from the cookie store.
 */
export const deleteCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
