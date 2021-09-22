import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import passport from 'passport';
import nextConnect, { NextConnect } from 'next-connect';
import { BearerStrategy } from 'passport-azure-ad';

// Define API server authentication options
// See: https://github.com/AzureAD/passport-azure-ad#4112-options
const tenantID = process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID;
const clientID = process.env.AZURE_AD_SERVICE_CLIENT_ID;
const options = {
  identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
  clientID,
  issuer: `https://login.microsoftonline.com/${tenantID}/v2.0`,
  audience: clientID,
  validateIssuer: true,
  passReqToCallback: false,
  loggingLevel: 'warn',
  scope: ['access_api'],
};

// Set passport to use the above options.
passport.use(
  new BearerStrategy(options, (token, done) => {
    // Send user info using the second argument
    done(null, {}, token);
  })
);

/**
 * Authenticates user using passport.
 */
function authenticate(req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  return new Promise((resolve, reject) => {
    passport.authenticate('oauth-bearer', { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });
}

/**
 * Route handler function.
 */
interface HandlerFunc {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

/**
 * Adds passport middleware to NextJS API server pipeline.
 */
const applyAuthentication = () => nextConnect().use(passport.initialize());

/**
 * Authenticates user and returns 401 responses on authentication failure.
 * Executes the handler function after successful authentication.
 */
async function authenticateAndExecuteHandler(req: NextApiRequest, res: NextApiResponse, func: HandlerFunc) {
  try {
    await authenticate(req, res);
    return func(req, res);
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
}

/**
 * Authenticated route wrapper for GET requests.
 */
export function get(func: HandlerFunc): NextConnect<IncomingMessage, ServerResponse> {
  return applyAuthentication().get(async (req: NextApiRequest, res: NextApiResponse) =>
    authenticateAndExecuteHandler(req, res, func)
  );
}

/**
 * Authenticated route wrapper for any (all) requests.
 */
export function all(func: HandlerFunc): NextConnect<IncomingMessage, ServerResponse> {
  return applyAuthentication().all(async (req: NextApiRequest, res: NextApiResponse) =>
    authenticateAndExecuteHandler(req, res, func)
  );
}
