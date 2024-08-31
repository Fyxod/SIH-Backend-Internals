import { getUser } from '../utils/jwtfuncs.js';

export async function checkAuth(req, res, next) {

  const token = req.cookies?.token;
  if (!token) {
    req.user = null;
    return next();
  }

  const user = getUser(token);
  if (!user) {
    res.clearCookie('token');
  }
  req.user = user;
  return next();
}