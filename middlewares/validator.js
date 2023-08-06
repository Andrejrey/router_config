import { body, validationResult } from "express-validator";

export const inputValidationRules = () => {
  return [
    body("first_name").isLength({ min: 2 }),
    body("last_name").isLength({ min: 2 }),
  ];
};

export const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  error.array().map((err) => extractedErrors.push({ [err.msg]: err.value }));
  return res.status(422).json({ errors: extractedErrors });
};
