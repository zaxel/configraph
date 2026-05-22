import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
    jwksUri: `https://${process.env.CLERK_DOMAIN}/.well-known/jwks.json`,
    cache: true,        // cache signing keys
    rateLimit: true,
});

export async function verifyClerkToken(token: string): Promise<string> {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded?.header.kid) throw new Error('Invalid token');

    const key = await client.getSigningKey(decoded.header.kid);
    const verified = jwt.verify(token, key.getPublicKey()) as { sub: string };
    return verified.sub;
}