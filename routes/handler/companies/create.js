const {Company} = require('../../../models');

module.exports = async (req, res) => {

    const schema = {
        name : 'string|empty:false',
        location : 'string',
        website : 'string',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status : 'error',
            message : validate.map(v => {
                return {
                  message: v.message
                }
            })
        });
    }

    const { name, location, website } = req.body;

    const company = await Company.create({
        name,
        location,
        website,
      });

    return res.json({
        status : 'success',
        data : company,
    });
}