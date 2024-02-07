const convertNic = require("../utils/nic");

const nicController = {
	convertNic: (req, res) => {
		try {
			const details = convertNic(req.body.nic);

			res.status(200).json({
				success: true,
				data: details,
				message: "NIC converted successfully",
			});
		} catch (error) {
			res.status(400).json({
				success: false,
				message: error.message,
			});
		}
	},
};

module.exports = nicController;
