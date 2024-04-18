//maing an higher order function which returns a function
//used for consistent route eror handling its just a wraper function 

const requestHandler = (requestFunction) => {
    return async (req, res, next) => {
        try {
            await requestFunction(req, res, next);
        } catch (error) {
            res.status(error.code || 500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export { requestHandler }