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

    const companyId = req.params.id;

    let company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({
            status : 'error',
            message: 'Company not found' 
        });
    }

    const { name, location, website } = req.body;

    company.name = name;
    company.location = location;
    company.website = website;
    await company.save();

    return res.json({
        status : 'success',
        data : company,
    });

}