const AppError = require("../utils/appError");

//Handles casterror in DB
const handleCastDB = (err) => {
  message = `Invalid ${err.path} : ${err.value}!`;
  return new AppError(message, 400);
};

//Handles Duplicate fields error in DB
const handleDuplicateFields = (err) => {
  const key = Object.keys(err.keyValue);
  // email,contact (unique)
  // {email: "duplicate filed", contact: "duplicate"} [email, conatct]
  message = `Duplicate KEY:${key}. Please use different value.`;
  return new AppError(message, 400);
};

//Handles validation errors in DB
const handleValidationDB = (err) => {
  /* err {errors : { 
    email: {
      message: "please provide  a valid email"
    },
    name:{
      message: "Please provide name"
    }
   }} */
  message = {};
  for (const [key, value] of Object.entries(err.errors)) {
    if (key.includes(".")) {
      message[`${key.split(".")[1]}`] = value.message;
    } else {
      message[`${key}`] = value.message;
    }
  }
  // {"email": "please provide a valid email", "name": "msg"}
  // try{}catch(err){setErrors(err)}
  message = JSON.stringify(message);
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has been expired. Please log in again!", 401);

//1)SENDING ERRORS IN DEVELOPMENT ENV
const sendErrorDev = (err, res) => {
  // statCode (404) , status: fail
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

//1)SENDING ERRORS IN PRODUCTION ENV
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // from server side error happend, there is no mistake in the client
    res.status(500).json({
      status: "error",
      message: "something went really wrong!!!",
    });
  }
};

//GLOBAL ERROR HANDLING MIDDILEWARE
// if we err -> as a arguments to the function that will automatically as a error hanlder
module.exports = (err, req, res, next) => {
  // 404 -> bad , 500 -> internal server
  // err -> will be refering to the error that we created using apperror
  // err -> { status : "fail", statCode: 404, message: "no hotel found with that ID.", isOpertional: true}
  // while in developement we want to where the error actually happened (stack trace)
  // user need to know the stack trace(where actually happened) (proper error message)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.name = err.name;
    error.message = err.message;
    if (error.name === "CastError") error = handleCastDB(error);
    if (error.code === 11000) error = handleDuplicateFields(error); // duplicate fields (model if we specify particular as unique(email))
    if (error.name === "ValidationError") error = handleValidationDB(error); // schema validations ("required -> msg")
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
  next();
};
