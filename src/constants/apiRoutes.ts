/**
 * API route constants.
 */
export const apiRoutes = {
  v1: {
    products: {
      root: "/api/products",
      product: "/api/products/{id}",
    },
    members: {
      root: "/api/members",
      signup: "/api/members/signup",
      login: "/api/members/login",
      logout: "/api/members/logout",
      me: "/api/members/me",
    },
  },
};
