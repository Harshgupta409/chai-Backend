class apiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        error= [],
        statck=""
    ){
        super(message) //overwrite
        thus.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors
        if(statck){
            this.stack=statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}
export {ApiError}

