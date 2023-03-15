
const { user } = require('../../routes/handler/users');

const {
    PORT,
} = process.env

const response = {
    status: jest.fn((x) => ({ 
        json: jest.fn((x) => x)
    })),
    json: jest.fn((x) => x)
};

describe('Get Data User', () => {

    it('get data user', async () => {
        const request = {
            body: {
              email: 'success@gmail.com',
              password: '12345678',
              username : "user success"
            },
            user: {
                user: {
                    "id": 1,
                    "username": "admin",
                    "email": "admin@gmail.com",
                    "role": 'admin',
                },
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await user(request, response);
        expect(result.status).toEqual("success");
    });
});