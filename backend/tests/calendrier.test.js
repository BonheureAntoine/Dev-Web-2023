const cl_evenement = require("../controllers/cl_abonnement")
const r_evenement = require("../routes/r_evenement")

const fileapp = require("../app")
const request = require("supertest");

const app = require('../app')





describe("evenements", () => {
    it('test', () => {
        const rep = r_evenement.get('/')
        expect(rep.status).toBe(200)


    });
})


/*
describe("Calculator tests", () => {
    test('adding 1 + 2 should return 3', () => {
        // arrange and act
        var result = mathOperations.sum(1,2)

        // assert
        expect(result).toBe(3);
    });
})


 */