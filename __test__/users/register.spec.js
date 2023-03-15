
const { register } = require('../../routes/handler/users');
const User = require('../../models/users');


jest.mock('../../models', () => ({
    User: {
        findOne: jest.fn((params) => {

            const bcrypt = require('bcrypt');
            
            const users = [{
                "id": 1,
                "username": "admin",
                "email": "admin@gmail.com",
                "password" : bcrypt.hashSync("12345678", 3),
                "role" : "admin",
                "created_at" : new Date(),
                "updated_at" : new Date(),
            }];
            const user = users.find((it) => (
                it.email === params.where.email
                ));
            return user;
        }),
        create: jest.fn(() => {
            const users = [{
                "id": 1,
            }];

            return users
        }) 
    }
}));

const response = {
    status: jest.fn((x) => ({ 
        json: jest.fn((x) => x)
    })),
    json: jest.fn((x) => x)
};

describe('Registration New User', () => {
    it('error validate form is required', async () => {
        
        const request = {
            body: {
              email: 'fake_email',
              password: 'fake_password',
            },
        };

        const result = await register(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
        expect(result.status).toEqual("error")
    });

    it('error email user already exist', async () => {
        const request = {
            body: {
              email: 'admin@gmail.com',
              password: 'password',
              name : 'adminganteng'
            },
        };
        const result = await register(request, response);
        expect(response.status).toHaveBeenCalledWith(409);
        expect(result.status).toEqual("error");
    });

    it('registration user successfully', async () => {
        const request = {
            body: {
              email: 'success@gmail.com',
              password: '12345678',
              name : "user success"
            },
        };
        const result = await register(request, response);
        expect(result.status).toEqual("success");
    });
});