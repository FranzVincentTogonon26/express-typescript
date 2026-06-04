import type {Request, Response, NextFunction} from 'express'

export const validateNumericId = (
  req:Request<{ id: string }>, 
  res:Response<{ message: string }>, 
  next:NextFunction
) : void => {
  const {id} = req.params
  if (!/^\d+$/.test(id)) {
    res.status(400).json({message: "Pet ID must be a number"})
  } else {
    next()
  }
}

export const authMiddleware = ( 
    req: Request< {}, unknown, {}, { password: string }>, 
    res: Response<{ message: string }>, 
    next: NextFunction
) => {
    const { password } = req.query
    if(password === 'please'){
        next()
    } else {
        res.status(401).json({message: "Unathorized Error"})
    }
}