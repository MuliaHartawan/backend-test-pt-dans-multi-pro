const {Company} = require('../../../models');

module.exports = async (req, res) => {

    const { page = 1, limit = 10, search = '' } = req.query;

    const offset = (page - 1) * limit;
    const options = {
      offset,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [{ model: Job, as: 'job' }],
    };

    // Search by Title and/or Description
    if (search) {
        options.where = {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
          ],
        };
      }

    const companies = await Company.findAndCountAll(options);

    return res.json({
        status : 'success',
        data : companies,
    });
}