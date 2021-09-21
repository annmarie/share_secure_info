import axios, { AxiosRequestConfig } from 'axios';

/**
 * Wraps an API call with token based authentication
 * Most of the time the ideal way to call this is using the acquireAccessTokenAndCallApi function
 * @param accessToken the Msal access token
 * @param config  And Axios request configuration object
 * @returns   a promise
 */
export default function callProtectedApi(accessToken: string, config: AxiosRequestConfig): Promise<any> {
  config.headers = {
    ...(config.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  return axios.request(config);
}
