
const request = require('supertest');
const app = require('../app');


// Je fais des test sur la reponse de ce que je recois de ma demande get
describe('Test the evenements API', () => {
    test('It should respond with 200 status code', async () => {
        const response = await request(app).get('/api/evenement');
        //console.log(response)
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.req.method).toBe('GET');
    });
    test('It should use GET method', async () => {
        const response = await request(app).post('/api/evenement');
        expect(response.statusCode).toBe(404); // Method Not Allowed
    });
});

