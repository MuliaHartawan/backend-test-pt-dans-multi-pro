const {Company} = require('../../../models');

module.exports = async (req, res) => {

    const companies = await Company.findAll();

    return res.json({
        status : 'success',
        data : companies,
    });
}