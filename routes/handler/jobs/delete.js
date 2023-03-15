const {Job} = require('../../../models');

module.exports = async (req, res) => {

    const jobId = req.params.id;

    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        status : "error", 
        message: 'Job not found',
      });
    }

    await job.destroy()

    return res.json({
        status : 'success',
        data : job,
    });
}