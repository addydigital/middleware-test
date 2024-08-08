import { handlers, signIn, signOut, auth } from '../../../auth'
import { getToken } from 'next-auth/jwt';


export const { GET, POST } = handlers;
export default async function handler(req, res) {
    console.log("Secret =", process.env.AUTH_SECRET);
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
      // Use the token in your API route logic
    // ...
  
    res.status(200).json({ message: 'Success' });
  }
  