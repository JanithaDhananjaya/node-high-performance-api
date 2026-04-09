import prisma from "../config/db.js";

export const create = async (postData) => {
    const {title, content, authorId, categoryNames} = postData;
    return await prisma.post.create({
        data: {
            title,
            content,
            authorId,
            categories: {
                connectOrCreate: categoryNames.map(name => ({
                    where: {name},
                    create: {name}
                }))
            }
        },
        include: {
            categories: true,
            author: {
                select: {name: true, email: true}
            }
        }
    });
};

export const findAll = async () => {
    return await prisma.post.findMany({
        include: {
            author: {select: {name: true, email: true}},
            categories: true
        },
        orderBy: {createdAt: 'desc'}
    });
};
