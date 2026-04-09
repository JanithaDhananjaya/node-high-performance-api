import prisma from "../config/db.js";

export const findByEmail = async (email) => {
    return await prisma.user.findUnique({where: {email}});
};

export const findById = async (id) => {
    return await prisma.user.findUnique({where: {id}});
};

export const create = async (data) => {
    return await prisma.user.create({data});
};

export const findAll = async () => {
    return await prisma.user.findMany();
};

export const findUsersBatch = async (batchSize, lastId = null) => {
    return await prisma.user.findMany({
        take: batchSize,
        skip: lastId ? 1 : 0,
        cursor: lastId ? {id: lastId} : undefined,
        orderBy: {id: 'asc'}
    });
};