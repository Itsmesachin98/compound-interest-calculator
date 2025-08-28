const Joi = require("joi");

function validatePrincipal(req, res, next) {
    const schema = Joi.number().integer().min(1).max(1000000000).required();
    const { principal } = req.body;
    const { error } = schema.validate(principal);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid amount" });
    }

    next();
}

function validateRate(req, res, next) {
    const schema = Joi.number().integer().min(1).max(100).required();
    const { rate } = req.body;
    const { error } = schema.validate(rate);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid rate" });
    }

    next();
}

function validateTime(req, res, next) {
    const schema = Joi.number().integer().min(1).max(100).required();
    const { time } = req.body;
    const { error } = schema.validate(time);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid time" });
    }

    next();
}

module.exports = { validatePrincipal, validateRate, validateTime };
