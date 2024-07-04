import { Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const validateInputs = (
  req: Request,
  res: Response,
  next: Function
): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const isDate = (validationObject: ValidationChain): ValidationChain => {
  return validationObject.custom((value) => !isNaN(Date.parse(value)));
};

export const nonEmptyString = (
  validationObject: ValidationChain
): ValidationChain => {
  return validationObject.isString().not().isEmpty();
};
