import { verify } from "jsonwebtoken";

const secret = process.env.NEXT_PUBLIC_AUTH_SK;

export function requireAuthentication(gssp) {
  return async (ctx) => {
    const { req } = ctx;

    const jwt = req.cookies.AELJWT;
    const url = req.url;
    if (url == "/") {
      if (jwt) {
        try {
          const decoded = verify(jwt, secret);
          if (decoded.courses.includes("ADM")) {
            return {
              redirect: {
                permanent: false,
                destination: "/user/admin/gqladmin",
              },
            };
          } else {
            verify(jwt, secret);
            return {
              redirect: {
                permanent: false,
                destination: "/user/dashboard",
              },
            };
          }
        } catch (err) {}
      }
    }

    if (url.includes("/user")) {
      if (jwt === undefined) {
        return {
          redirect: {
            permanent: false,
            destination: process.env.NEXT_PUBLIC_PATH_ROOT,
          },
        };
      }

      try {
        verify(jwt, secret);
      } catch (err) {
        return {
          redirect: {
            permanent: false,
            destination: process.env.NEXT_PUBLIC_PATH_ROOT,
          },
        };
      }
    }

    if (url.includes("/admin")) {
      const decoded = verify(jwt, secret);
      if (!decoded.courses.includes("ADM")) {
        return {
          redirect: {
            permanent: false,
            destination: process.env.NEXT_PUBLIC_PATH_ROOT,
          },
        };
      }
    }
    return await gssp(ctx);
  };
}
