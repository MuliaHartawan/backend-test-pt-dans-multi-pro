const {Job} = require('../../../models');

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
    
    const { title, description, location, full_time, companyId } = req.body;

    const company = await Company.findByPk(companyId);
    if (!company) {
        return res.status(404).json({ 
            status : "error", 
            message: 'Company not found' 
        });
    }

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({
        status : "error", 
        message: 'Job not found'
        });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.full_time = full_time || job.full_time;
    job.userId = userId || job.userId;
    job.companyId = companyId || job.companyId,
    await job.save();

    return res.json({
        status : 'success',
        data : job,
    });

}