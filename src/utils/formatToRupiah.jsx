export const formatToRupiah = (value) => {
	const formatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});
	return formatter.format(value);
};
