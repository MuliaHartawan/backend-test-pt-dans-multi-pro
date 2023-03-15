const {Job} = require('../../../models');

module.exports = async (req, res) => {

    const { page = 1, limit = 10, search = '' } = req.query;

    const offset = (page - 1) * limit;
    const options = {
      offset,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [{ model: Company, as: 'company' }],
    };

    // Search by Title and/or Description
    if (search) {
      options.where = {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const jobs = await Job.findAndCountAll(options);

    return res.json({
        status : 'success',
        data : jobs,
    });
}