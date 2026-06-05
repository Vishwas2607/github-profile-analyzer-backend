import {isDev} from "../utils/constants.js";

const errorHandler = (err,req,res,next)=> {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if(isDev){
        console.error(err.stack); 
    }else {
        console.error("[Error]: ", err.message);
    };

    res.status(statusCode).json({message: message, ...(isDev && {stack: err.stack})});

};

export default errorHandler