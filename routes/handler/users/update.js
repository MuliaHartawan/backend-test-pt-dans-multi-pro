const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator;
const fs = require('fs');

module.exports = async (req, res) => {

    const schema = {
        username : 'string|optional',
        email : 'email|optional',
        password : 'string|min:6|optional',
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

    const { id } = req.user;
    const user = await User.findByPk(id);
    if(!user){
        return res.status(404).json({
            status : 'error',
            message : 'user not found'
        });
    }
    
    const email = req.body.email;
    if(email){
        const checkEmail = await User.findOne({
            where : {email: req.body.email}
        });

        if (checkEmail && email === user.email){
            return res.status(409).json({
                status : 'error',
                message : 'Email already exist'
            });
        }
    }

    const password = await bcrypt.hash(req.body.password, 10);

    data =  {
        username : req.body.username, 
        email : req.body.email,
        password : password,
        role : req.body.role
    }

    await User.update(data, {where : { id }});

    return res.json({
        status : 'success',
        data : {
            id : user.id,
            username : data.username,
            email : data.email,
            role : data.role
        }
    });
}