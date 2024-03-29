const API_PREFIX = "api/v1";

exports.routes = [
  {
    url: `/${API_PREFIX}/auth`,
    proxy: {
      target: "http://[::1]:3001/auth",
      changeOrigin: true,
      pathRewrite: {
        [`^/${API_PREFIX}/auth`]: "",
      },
    },
  },
  {
    url: `/${API_PREFIX}/refresh`,
    authenticationRequired: true,
    applyBodyParser: true,
    rateLimit: {
      windowsMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://[::1]:3001/refresh",
      changeOrigin: true,
      timeout: 3000,
      pathRewrite: {
        [`^/${API_PREFIX}/refresh`]: "",
      },
    },
  },
  {
    url: `/${API_PREFIX}/admin`,
    proxy: {
      target: "http://[::1]:3001/admin",
      changeOrigin: true,
      pathRewrite: {
        [`^/${API_PREFIX}/admin`]: "",
      },
    },
  },
  {
    url: `/${API_PREFIX}/users`,
    authenticationRequired: true, // if a user needs to be authenticationRequiredenticated for accessing this endpoint
    proxy: {
      // contains information about the target to which the request should be redirected
      target: "http://[::1]:3001/users",
      changeOrigin: true,
      pathRewrite: {
        [`^/${API_PREFIX}/users`]: "",
      },
    },
  },
  {
    url: `/${API_PREFIX}/departement`,
    authenticationRequired: true, // if a user needs to be authenticationRequiredenticated for accessing this endpoint
    proxy: {
      // contains information about the target to which the request should be redirected
      target: "http://[::1]:3001/departement",
      changeOrigin: true,
      pathRewrite: {
        [`^/${API_PREFIX}/departement`]: "",
      },
    },
  },
  {
    url: `/${API_PREFIX}/flow`,
    authenticationRequired: true, // if a user needs to be authenticated for accessing this endpoint
    proxy: {
      // contains information about the target to which the request should be redirected
      target: "http://[::1]:8000/flow",
      changeOrigin: true,
      pathRewrite: {
        [`^/${API_PREFIX}/flow`]: "",
      },
    },
  },
  {
    url: `/${API_PREFIX}/devices`,
    authenticationRequired: true, // if a user needs to be authenticated for accessing this endpoint
    proxy: {
      // contains information about the target to which the request should be redirected
      target: "http://[::1]:3006/devices",
      changeOrigin: true,
      pathRewrite: {
        [`^/${API_PREFIX}/devices`]: "",
      },
    },
  },
  // {
  //     url:`/${API_PREFIX}/flows`,
  //     authenticationRequired:true, // if a user needs to be authenticated for accessing this endpoint
  //     proxy: {
  //         // contains information about the target to which the request should be redirected
  //         target:"http://[::1]:8000/flows",
  //         changeOrigin : true,
  //         pathRewrite: {
  //             [`^/${API_PREFIX}/flows`]: '',
  //         },
  //     }
  // },
];
