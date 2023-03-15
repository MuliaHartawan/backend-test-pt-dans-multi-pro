
const { update } = require('../../routes/handler/users');
const User = require('../../models/users');

const {
    PORT,
} = process.env


jest.mock('../../models', () => ({
    User: {
        findByPk : jest.fn((params) => {
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
            const user = users.find(it => it.id === params);
            return user;
        }),
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
        update: jest.fn(() => {
            const users = [{
                "id": 2,
                "username" : "adminganteng",
                "email" : "coba@gmail.com",
                "role" : "recruiter"
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

describe('Updated Data User', () => {
    it('error validate form is required', async () => {
        
        const request = {
            body: {
              email: 'fake_email',
              password: 'fake_password',
            },
        };

        const result = await update(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
        expect(result.status).toEqual("error")
    });

    it('error user not found', async () => {
        const request = {
            body: {
              email: 'admin@gmail.com',
              password: 'password',
              name : 'adminganteng'
            },
            user: {
                id: 2,
            }
        };
        const result = await update(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(result.status).toEqual("error");
    });
    
    it('error email user already exist', async () => {
        const request = {
            body: {
              email: 'admin@gmail.com',
              password: 'password',
              username : 'adminganteng'
            },
            user: {
                id: 1,
            }
        };
        const result = await update(request, response);
        expect(response.status).toHaveBeenCalledWith(409);
        expect(result.status).toEqual("error");
    });

    it('updated user successfully', async () => {
        const request = {
            body: {
              email: 'success@gmail.com',
              password: '12345678',
              name : "user success"
            },
            user: {
                id: 1,
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await update(request, response);
        expect(result.status).toEqual("success");
    });
});