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

function validateDeposits(req, res, next) {
    const schema = Joi.string()
        .allow("") // allow empty string
        .pattern(/^\d+$/) // must be digits only, no spaces or decimals
        .custom((value) => {
            if (value === "") return value; // empty is fine

            const num = Number(value);
            if (num <= 0 || num >= 1000000000) {
                throw new Error("Invalid deposit amount");
            }
            return value;
        });

    const { deposits } = req.body;
    const { error, value } = schema.validate(deposits);

    if (value === "") {
        return next();
    }

    if (error) {
        return res.status(400).json({
            success: false,
            message:
                "The deposit amount can be empty, or between 1 and 1,000,000,000",
        });
    }

    next();
}

function validateChoice(req, res, next) {
    const { choice } = req.body;

    const schema = Joi.string().valid("year", "month").required();

    const { error } = schema.validate(choice);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid choice. Must be 'year' or 'month'.",
        });
    }

    next();
}

module.exports = {
    validatePrincipal,
    validateRate,
    validateTime,
    validateDeposits,
    validateChoice,
};
