import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
        });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = error.issues.map(err => ({
                field: err.path[err.path.length - 1],
                message: err.message
            }));

            return res.status(400).json({
                status: 'fail',
                errors: formattedErrors
            });
        }

        next(error);
    }
};

export default validate;