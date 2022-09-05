import { Request, Response, NextFunction } from "express";
import Writer from "../models/Writers";
import { IWriter } from "../Types/IWriter";
import {
  WriterValidation,
  WriterIdValidation,
} from "../Validations/WriterValidation";
  import createError from "http-errors";




/**
 * add new writer
 * @param writerModelValidation
 */
 const addWriter = async (writerModelValidation: IWriter) => {
  try {
    const writer = new Writer({
      email: writerModelValidation.email,
      username: writerModelValidation.username,
      password: writerModelValidation.password,
    
    });
    const savedWriter = await writer.save();

    return savedWriter;
  } catch (error) {
   console.log(error);
  }
};

/**
 * Create new user
 * @param req
 * @param res
 * @param next
 */
export const createWriter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const writerModelValidation: IWriter = await WriterValidation.validateAsync(
      req.body
    );

    if (!writerModelValidation) {
      return next(
        new createError.BadRequest(
          "Operation failed, invalid details provided."
        )
      );
    } else {
      const isUsernameAvailable = await Writer.findOne({
        username: writerModelValidation.username,
      });
      if (isUsernameAvailable) {
        res.status(404).json({
          message: `Username ${writerModelValidation.username} not available`,
        });
      } else {
        const newWriter = await addWriter(writerModelValidation);
        if (newWriter) {
          res.status(201).json({
            newWriter,
          });
        } else {
          return next(
            res.status(400).json({
              message: "Invalid details provided.",
            })
          );
        }
      }
    }
  } catch (error) {
    
    next(error);
  }
};
/**
 * Update writer
 * @param writerId
 * @param writerModelValidation
 */
const processUpdateWriter = async (
  writerId: String,
  writerModelValidation: IWriter
) => {
  try {
    const updateWriter = await Writer.updateOne(
      {
        _id: writerId,
      },
      {
        $set: {
          username: writerModelValidation.username,
          password: writerModelValidation.password,
          
        },
      }
    );
    return updateWriter;
  } catch (error) {
    console.log(error);
  }
};


/**
 * Upadet writer
 * @param req
 * @param res
 * @param next
 */
export const updateWriter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const writerModelValidation: IWriter = await WriterValidation.validateAsync(
      req.body
    );

    if (!writerModelValidation) {
      return next(
        res.status(404).json
      );
    } else {
      const isUsernameValid = await Writer.findOne({
        username: writerModelValidation.username,
      });
      if (!isUsernameValid) {
        res.status(404).json({
          message: `Username ${writerModelValidation.username} not valid`,
        });
      } else {
        const updatedWriter = await processUpdateWriter(
          isUsernameValid._id,
          writerModelValidation
        );
        if (updatedWriter) {
          res.status(201).json({
            updatedWriter,
          });
        } else {
          return next(
            res.status(400).json({
              message: "Invalid details provided.",
            })
          );
        }
      }
    }
  } catch (error) {
    res.status(404).json
    next(error);
  }
};


//get writer by id

export const getWriter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const writerIdValidation = await WriterIdValidation.validateAsync(
      req.params.writerId
    );

    if (!writerIdValidation) {
      return next(
        res.status(404).json
      );
    } else {
      const writerDetails = await Writer.findById(writerIdValidation);
      if (!writerDetails) {
        res.status(404).json({
          message: `writer id not available`,
        });
      } else {
        res.status(200).json({
          writerDetails,
        });
      }
    }
  } catch (error) {
    res.status(404).json
    next(error);
  }
};

/**
 * Get all writers
 * @param req
 * @param res
 * @param next
 */
 export const getAllWriters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getWriters = await Writer.find()
      .populate("writer", "username email");

    if (getWriters) {
      res.status(200).json(getWriters);
    } else {
      return next(
        res.status(404).json({
          message: "Not found.",
        })
      );
    }
  } catch (err) {
    res.status(404).json
    next(Error);
  }
};

/**
 * delete writer
 * @param req
 * @param res
 * @param next
 */
 export const deteleWriter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const writerIdValidation = await WriterIdValidation.validateAsync(
      req.params.writerId
    );

    if (!writerIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deleteWriters = await Writer.findByIdAndDelete(writerIdValidation);

      if (deleteWriters) {
        res.status(200).json({
          message:"writer deleted succesfully",
        });
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    res.status(404).json
    next(error);
  }
};
