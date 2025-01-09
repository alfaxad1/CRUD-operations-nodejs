const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().min(3),
  age: Joi.number().required(),
});

const validate = (req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  next();
};

module.exports = validate;
