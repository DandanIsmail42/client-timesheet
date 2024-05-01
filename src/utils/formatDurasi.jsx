export const formatDurasi = (hours) => {
	const jam = Math.floor(hours);
	const menit = Math.round((hours - jam) * 60);
	return hours !== null ? `${jam} jam ${menit} menit` : "Total durasi 0";
};
