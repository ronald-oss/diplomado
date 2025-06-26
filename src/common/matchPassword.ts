import * as bcrypt from 'bcryptjs';

export const matchPassword = async (password: string, hash: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
