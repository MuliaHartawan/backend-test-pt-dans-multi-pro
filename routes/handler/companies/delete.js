const {Company} = require('../../../models');

module.exports = async (req, res) => {

    const companyId = req.params.id;

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    await company.destroy();

    return res.json({
        status : 'success',
        data : company,
    });
}