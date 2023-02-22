import { Request, NextFunction } from 'express';
import { Res } from '../types/types.type';
const Cat = require('../models/cat');
const asyncHandler = require('../middleware/async');

// @desc Get all cats
// @route GET /api/v1/cats
// @access PUBLIC
exports.getCats = asyncHandler(
  async (req: Request, res: Res, next: NextFunction) => {
    res.status(200).json(res.filteredResults);
  }
);
