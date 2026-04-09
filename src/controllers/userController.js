import * as userService from '../services/userService.js';
import * as csv from 'fast-csv';
import redisClient from "../config/redis.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const exportUsers = async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=users_export.csv');

        const csvStreams = csv.format({headers: true});
        csvStreams.pipe(res);

        const allUsers = await userService.findAllUsers();

        allUsers.forEach(user => {
            csvStreams.write({
                ID: user.id,
                Name: user.name,
                Email: user.email,
                Role: user.role,
                CreatedAt: user.createdAt.toISOString(),
            });
        });

        csvStreams.end();
    } catch (error) {
        next(error);
    }
};

export const exportUsersUsingBatch = async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=users_export.csv');

        const csvStreams = csv.format({headers: true});
        csvStreams.pipe(res);

        let lastId = null;
        let batchSize = 10;

        while (true) {
            const users = await userService.getUsersBatch(batchSize, lastId);

            if (users.length === 0) break;

            users.forEach((user) => {
                csvStreams.write({
                    ID: user.id,
                    Name: user.name,
                    Email: user.email,
                    Role: user.role,
                    CreatedAt: user.createdAt.toISOString(),
                });
                lastId = user.id;
            });
        }

        csvStreams.end();
    } catch (error) {
        next(error);
    }
};

export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cacheKey = `user:${userId}`;

        const cachedUser = await redisClient.get(cacheKey);

        if (cachedUser) {
            console.log('Returning from cache...');
            return res.status(200).json({
                success: true,
                data: JSON.parse(cachedUser),
                source: 'cache'
            });
        }

        const user = await userService.getUserById(userId);

        await redisClient.setEx(cacheKey, 3600, JSON.stringify(user));

        console.log('Returning from DB...');
        res.status(200).json({
            success: true,
            data: user,
            source: 'database'
        });
    } catch (error) {
        console.log('error in getUserProfile:', error)
        next(error);
    }
};