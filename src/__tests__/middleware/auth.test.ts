import { authenticateToken, adminOnly } from '../../middleware/auth';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authenticateToken', () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return 401 if no token is provided', () => {
    authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
  });

  it('should return 401 if token is invalid', () => {
    req.headers['authorization'] = 'Bearer invalidtoken';
    (jwt.verify as jest.Mock).mockImplementation((_t, _s, cb) => cb(new Error('invalid'), null));
    authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token invalid' });
  });

  it('should call next if token is valid', () => {
    req.headers['authorization'] = 'Bearer validtoken';
    (jwt.verify as jest.Mock).mockImplementation((_t, _s, cb) => cb(null, { id: 'user-1', role: 'admin' }));
    authenticateToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 'user-1', role: 'admin' });
  });
});

describe('adminOnly', () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next if user is admin', () => {
    req.user = { role: 'admin' };
    adminOnly(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user is not admin', () => {
    req.user = { role: 'guest' };
    adminOnly(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied, admins only' });
  });
});