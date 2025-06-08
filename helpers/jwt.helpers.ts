import jwt, { SignOptions, VerifyOptions, JwtPayload } from "jsonwebtoken";

export const jwt_create = async (
  payload: string | Buffer | object,
  options: SignOptions = {}
): Promise<string> => await jwt.sign(payload, process.env.JWT_SECRET, options);

export const jwt_verify = async (
  token: string,
  options: VerifyOptions = {}
): Promise<JwtPayload | string> => {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET, options);
    }
    catch (error) {
        return null;
        throw new Error("Invalid token");
    }
};
