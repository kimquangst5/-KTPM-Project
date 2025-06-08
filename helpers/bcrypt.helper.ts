import bcrypt from "bcrypt";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const bcrypt_hash = async (plain_text_password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(plain_text_password, salt);
};

const bcrypt_compare = async (
  plain_text_password: string,
  hashed_password: any
) => {
  return await bcrypt.compare(plain_text_password, hashed_password);
};


export { bcrypt_hash, bcrypt_compare };
