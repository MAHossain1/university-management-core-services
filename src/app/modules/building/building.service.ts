import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { buildingSearchableFields } from './building.constant';
import { IBuildingFilterRequest } from './building.interface';

const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  const { searchTerm } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: buildingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.building.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.building.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Building>
): Promise<Building> => {
  const result = await prisma.building.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Building> => {
  const result = await prisma.building.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BuildingService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
