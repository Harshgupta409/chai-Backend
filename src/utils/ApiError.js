class apiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        error= [],
        stack=""
    ){
        super(message) //overwrite
        thus.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}
export {ApiError}

