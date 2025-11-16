// A general function
// which validates all schemas 
export const validate = (schema) => async (req, res, next) => {
  try {
  
  // async as it might take time
    await schema.parseAsync({

      // check all request types
      body: req.body,
      query: req.query,
      params: req.params
    });
    
    // move ahead
    next();
    
    // if error, both schema and user would know
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.errors
    });
  }
};