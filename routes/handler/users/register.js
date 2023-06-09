const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = async (req, res) => {

    const schema = {
        username : 'string|empty:false',
        email : 'email|empty:false',
        password : 'string|min:6|empty:false',
        role : { 
            type : "enum",
            values : ["admin","recruiter", "jobseeker"]
        }
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status : 'error',
            message : validate
        });
    }

    const user = await User.findOne({
        where : { email : req.body.email }
    });

    if(user) {
        return res.status(409).json({
            status : 'error',
            message : 'email already exist'
        });
    }

    const password = await bcrypt.hash(req.body.password, 10)

    const data = {
        username : req.body.username,
        password,
        email : req.body.email,
        role : req.body.role,
    }

    const createUser = await User.create(data);

    return res.json({
        status : 'success',
        data: {
            id : createUser.id
        }
    })
}