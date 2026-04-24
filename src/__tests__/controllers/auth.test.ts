import { register, login } from '../../controllers/auth';
import userQueries from '../../infrastructure/mongodb/queries/user';
import bcrypt from 'bcrypt';

jest.mock('../../infrastructure/mongodb/queries/user');
jest.mock('bcrypt');

const mockDependencies = {};

describe('register controller', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should throw if user already exists', async () => {
    (userQueries.findUserByEmail as jest.Mock).mockResolvedValue({ email: 'test@test.com' });
    await expect(register(mockDependencies)({ name: 'Test', email: 'test@test.com', password: 'password123' }))
      .rejects.toThrow('User already exists with this email');
  });

  it('should throw if name, email or password is missing', async () => {
    (userQueries.findUserByEmail as jest.Mock).mockResolvedValue(null);
    await expect(register(mockDependencies)({ name: '', email: 'test@test.com', password: 'password123' }))
      .rejects.toThrow('Name, email and password are required');
  });

  it('should throw if email format is invalid', async () => {
    (userQueries.findUserByEmail as jest.Mock).mockResolvedValue(null);
    await expect(register(mockDependencies)({ name: 'Test', email: 'invalidemail', password: 'password123' }))
      .rejects.toThrow('Invalid email format');
  });

  it('should throw if password is less than 6 characters', async () => {
    (userQueries.findUserByEmail as jest.Mock).mockResolvedValue(null);
    await expect(register(mockDependencies)({ name: 'Test', email: 'test@test.com', password: '123' }))
      .rejects.toThrow('Password must be at least 6 characters');
  });

  it('should register user successfully', async () => {
    (userQueries.findUserByEmail as jest.Mock).mockResolvedValue(null);
    (userQueries.registerUser as jest.Mock).mockResolvedValue({ _id: 'id-1', name: 'Test', email: 'test@test.com', role: 'user' });
    const result = await register(mockDependencies)({ name: 'Test', email: 'test@test.com', password: 'password123' });
    expect(result.email).toBe('test@test.com');
  });
});

describe('login controller', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should throw if email or password is missing', async () => {
    await expect(login(mockDependencies)({ email: '', password: '' }))
      .rejects.toThrow('Email and password are required');
  });

  it('should throw if user is not found', async () => {
    (userQueries.findUserByEmail as jest.Mock).mockResolvedValue(null);
    await expect(login(mockDependencies)({ email: 'test@test.com', password: 'password123' }))
      .rejects.toThrow('Invalid email or password');
  });

  it('should throw if password does not match', async () => {
    (userQueries.findUserByEmail as jest.Mock).mockResolvedValue({ email: 'test@test.com', password: 'hashed' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(login(mockDependencies)({ email: 'test@test.com', password: 'wrongpassword' }))
      .rejects.toThrow('Invalid email or password');
  });

  it('should return token on successful login', async () => {
    (userQueries.findUserByEmail as jest.Mock).mockResolvedValue({ _id: 'id-1', name: 'Test', email: 'test@test.com', role: 'admin', password: 'hashed' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const result = await login(mockDependencies)({ email: 'test@test.com', password: 'password123' });
    expect(result.token).toBeDefined();
    expect(result.user.email).toBe('test@test.com');
  });
});