import { Request, Response, NextFunction } from "express";
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import Writer from '../models/Writers';
import signJWT from '../functions/sign';

const NAMPESPACE = 'Writer';


export const validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    logging.info(NAMPESPACE, "Token validated, writer authorized");

    return res.status(200).json({
        message:"Authorized",
    })
  };

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    
  let { email, username, password} = req.body;

   bcryptjs.hash(password, 10, (hashError, hash) =>
   {
if (hashError)
 {
    return res.status(500).json ({
        message: hashError.message,
        error: hashError ,
    });
    }

const _writer = new Writer ({
    _id: new mongoose.Types.ObjectId(),
    email,
    username,
    password: hash
});

return _writer
    .save()
    .then((writer) => {
        return res.status(201).json({
            writer
        });
    })
    .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
};


export const login = (req: Request, res: Response, next: NextFunction) => {
  let IsAuthenticated= false;
  let {  email, password } = req.body;

  Writer.find({ email })
      .exec()
      .then((writers) => {
          if (writers.length !== 1) {
              return res.status(401).json({
                  message: 'not found'
              });
          }

          bcryptjs.compare(password, writers[0].password, (error, result) => {
              if (error) {
                  return res.status(401).json({
                      message: 'Password Mismatch'
                  });
              } else if (result) {
                  signJWT(writers[0], (_error, token) => {
                      if (_error) {
                          return res.status(500).json({
                              message: _error.message,
                              error: _error
                          });
                      } else if (token) {
                          return res.status(200).json({
                              message: 'Auth successful',
                              token: token,
                              writer: writers[0],
                              IsAuthenticated:true,
                             
                          });
                      }
                  });
              }
          });
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
};





export default {validateToken, register, login};