const {Job} = require('../../../models');

module.exports = async (req, res) => {

    const { id } = req.params;

    const job = await Job.findOne({
      where: { id },
      include: [{ model: Company, as: 'company' }],
    });

    if (!job) {
      return res.status(404).json({
        status : "error", 
        message: 'Job not found',
      });
    }

    return res.json({
        status : 'success',
        data : job,
    });
}