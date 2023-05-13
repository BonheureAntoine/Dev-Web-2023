const mariadb = require('mariadb');
const pool = require('../db');

describe('MariaDB Connection', () => {
    it('should connect to the database', async () => {
        const connection = await mariadb.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: 3306,
            connectionLimit: 5
        });

        try {
            await connection.ping();
        } catch (error) {
            throw new Error(`Could not connect to the database: ${error.message}`);
        } finally {
            await connection.end();
        }
    });
});
