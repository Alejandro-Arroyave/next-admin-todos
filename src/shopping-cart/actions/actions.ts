// 'use client'

// cookie: cart
// {
//   'uui-123-1': 1,
//   'uui-123-2': 3,
//   'uui-123-3': 2,
// }

import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const deleteProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    delete cookieCart[id];
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const deleteOneProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  console.log(cookieCart[id] > 0);
  console.log(cookieCart[id]);

  if (cookieCart[id] && cookieCart[id] > 1) {
    cookieCart[id] -= 1;
  } else {
    delete cookieCart[id];
  }

  setCookie("cart", JSON.stringify(cookieCart));
};
