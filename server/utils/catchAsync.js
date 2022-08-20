module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/* fn => async(req,res, next) => { "code related to controller"} */
/* (req, res, next) => { 
  async(req,res, next) => { 
      "code related to controller"
      if(!hotel){
        return next(new Apperror()) // error
      }
  }
} */
// first class functions -> that get fn as argument as well as returns fn as output