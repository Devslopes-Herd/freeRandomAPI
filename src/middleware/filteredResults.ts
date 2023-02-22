import { NextFunction } from 'express';
import { Model } from 'mongoose';
import { Req, Res, Pagination, Pet, Museum } from '../types/types.type';

const filteredResults =
  (model: Model<Pet | Museum>) =>
  async (req: Req, res: Res, next: NextFunction) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(
      (param) => delete reqQuery[param as keyof typeof reqQuery]
    );

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    query = model.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query.sort('-createdAt');
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.find(JSON.parse(queryStr)).countDocuments();

    query = query.skip(startIndex).limit(limit);

    const pagination: Pagination = {
      total,
      totalPages: Math.ceil(total / limit),
    };

    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    const results = await query;

    res.filteredResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };
    next();
  };

module.exports = filteredResults;
