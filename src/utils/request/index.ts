// import { responseErrorInterceptor, responseInterceptor } from './interceptor';
import { Request } from './request';

const prefix = 'http://localhost:3000/api';

export const $request = new Request(
  {
    baseURL: `${prefix}`,
  },
  // {
  //   responseInterceptor,
  //   responseErrorInterceptor
  // }
);
