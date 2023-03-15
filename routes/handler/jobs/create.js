const {Job} = require('../../../models');
const {Company} = require('../../../models');

module.exports = async (req, res) => {

    const schema = {
        title : 'string|empty:false',
        description : 'string|empty:false',
        location : 'string|empty:false',
        full_time : 'boolean|empty:false',
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
    
    const { title, description, location, full_time,userId, companyId } = req.body;

    const company = await Company.findByPk(companyId);
    if (!company) {
        return res.status(404).json({ 
            status : "error", 
            message: 'Company not found' 
        });
    }
    
    const job = await Job.create({
      title,
      description,
      location,
      full_time,
      userId,
      companyId,
    });

    return res.json({
        status : 'success',
        data : job,
    });
}