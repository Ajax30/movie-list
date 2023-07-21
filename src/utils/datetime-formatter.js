import moment from "moment";

const dateTimeFormatter = {
	formatDateLong: (value) => {
		return moment(value).format("MMMM DD, YYYY");
	},

	formatDateShort: (value) => {
		return moment(value).format("MMM DD, YYYY");
	},

	yearsAgo: (value) => {
		return moment(value, "YYYYMMDD").fromNow(true);
	},
};

export default dateTimeFormatter;