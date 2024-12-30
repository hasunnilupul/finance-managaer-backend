import * as bcrypt from 'bcrypt';

/**
 * @description encrypts a password using bcrypt
 * @param password string
 * @param saltRounds number
 * @returns
 */
export const hashPassword = (
  password: string,
  saltRounds: number = 10,
): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

/**
 * @description compares a password with a bcrypt hashed string
 * @param password string
 * @param passwordHash string
 * @returns
 */
export const comparePasswords = (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
