import { AxiosRequestConfig } from 'axios';
import { InteractionRequiredAuthError, InteractionStatus } from '@azure/msal-browser';
import { IMsalContext } from '@azure/msal-react';
import callProtectedApi from './callProtectedApi';

/**
 * Extracts a security token from the MSal context and makes the secure call
 * @param context  the Msal security context object (imported from '@azure/msal-react')
 * @param config The Axios request object, for example: { url: '/api/experiments', method: "POST", data: experiment }
 * @returns a promise
 *
 * Example call: await aquireAccessTokenAndCallApi(msal, { url: '/api/experiments', method: "POST", data: experiment })
 */
export default function aquireAccessTokenAndCallApi(context: IMsalContext, config: AxiosRequestConfig): Promise<any> {
  const { inProgress, instance, accounts } = context;
  if (inProgress === InteractionStatus.None) {
    const accessTokenRequest = {
      scopes: ['api://d86df0c4-0467-47f0-b53f-d27923048b1a/access_api'],
      account: accounts[0],
    };

    return instance
      .acquireTokenSilent(accessTokenRequest)
      .then((accessTokenResponse) => callProtectedApi(accessTokenResponse.accessToken, config))
      .catch((error) => {
        if (error instanceof InteractionRequiredAuthError) {
          return instance
            .acquireTokenPopup(accessTokenRequest)
            .then((accessTokenResponse) => callProtectedApi(accessTokenResponse.accessToken, config))
            .catch((error) => {
              // At this point both silent and interactive have failed
              throw error;
            });
        }

        // Some error occurred unrelated to user interaction required
        throw error;
      });
  }
}
