import { Box, Flex, Paper, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import DataUsers from "./dataUsers";
import { Controller, useForm } from "react-hook-form";
import "./daftarKegiatan.css";
import { apiGetActivity, apiGetUserById } from "../../services/api";
import { FaEdit } from "react-icons/fa";
import { CgTrashEmpty } from "react-icons/cg";
import { formatDurasi } from "../../utils/formatDurasi";
import DataTable from "react-data-table-component";
import { IoFilter } from "react-icons/io5";
import FilterModal from "./FilterModal";
import DataProyek from "./dataProyek";
import { formatDate } from "../../utils/formatDate";
import { formatToRupiah } from "../../utils/formatToRupiah";

import AddKegiatan from "./AddKegiatan";
import AddProyek from "./AddProyek";
const DaftarKegiatan = () => {
	const { recordDataUsers } = DataUsers();
	const { recordDataProyek } = DataProyek();
	const [dataActivity, setDataActivity] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [dataUser, setDataUser] = useState([]);
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: "",
			name: "",
		},
	});

	const dataUserOptions = recordDataUsers.map((user) => ({
		id: user.id,
		label: user.Nama,
		value: user.id,
	}));
	const dataProyekOption = recordDataProyek.map((proyek) => ({
		id: proyek.id,
		label: proyek.nama_proyek,
		value: proyek.id,
	}));
	useEffect(() => {
		if (selectedUserId) {
			getKegiatanByUserId(selectedUserId, selectedOptions);
		} else {
			setDataActivity([]);
		}
	}, [selectedUserId, selectedOptions]);
	useEffect(() => {
		getUserById(selectedUserId);
	}, [selectedUserId]);
	const getKegiatanByUserId = async (selectedUserId, selectedOptions) => {
		try {
			const {
				data: { status, record },
			} = await apiGetActivity(selectedUserId, selectedOptions);
			if (status === 200) {
				setDataActivity(record);
			}
		} catch (error) {
			const {
				response: { data },
			} = error;
			if (data.status === 400) {
				setDataActivity([]);
			}
		}
	};

	const getUserById = async (selectedUserId) => {
		try {
			const {
				data: { status, record },
			} = await apiGetUserById(selectedUserId);
			if (status === 200) {
				setDataUser(record);
			}
		} catch (error) {
			console.log(error);
		}
	};

	console.log(dataUser, " ssss");
	const handleFilterChange = (value) => {
		setSelectedOptions(value);
		getKegiatanByUserId(selectedUserId, value);
	};
	const columns = [
		{
			name: "Judul Kegiatan",
			selector: (row) => row.judul_kegiatan,
		},
		{
			name: "Waktu mulai",
			selector: (row) =>
				row?.tanggal_mulai
					? formatDate(row?.tanggal_mulai)
					: row?.tanggal_mulai,
		},
		{
			name: "Waktu berakhir",
			selector: (row) =>
				row?.tanggal_berakhir
					? formatDate(row?.tanggal_berakhir)
					: row?.tanggal_berakhir,
		},
		{
			name: "Durasi",
			selector: (row) => (row?.durasi ? formatDurasi(row?.durasi) : ""),
		},

		{
			name: "Action",
			cell: (row) => (
				<div className="action">
					{dataActivity.length > 0 && ( // Periksa apakah ada data
						<>
							<button>
								<FaEdit color="red" />
							</button>{" "}
							<button>
								<CgTrashEmpty color="red" />
							</button>{" "}
						</>
					)}
				</div>
			),
		},
	];

	return (
		<Paper className="activity-wrapper">
			<Flex justify={"space-between"} p={10}>
				<Flex className="left-header">
					<Controller
						name="id"
						control={control}
						render={({ field }) => (
							<Select
								allowDeselect
								label="Masukan nama"
								w={200}
								placeholder="Pilih Menu"
								searchable
								nothingFound="Menu Tidak Ditemukan"
								// error={errors.id?.message}
								data={dataUserOptions}
								{...field}
								onChange={(value) => {
									field.onChange(value);
									setSelectedUserId(value); // Memperbarui state selectedUserId saat nilai berubah
								}}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: "Menu wajib diisi",
							},
						}}
					/>
					{selectedUserId && (
						<div>
							<h3 style={{ marginTop: "1rem" }}>Rate</h3>
							<p style={{ marginTop: "-21px" }}>
								{formatToRupiah(dataUser?.rate)}/jam
							</p>
						</div>
					)}
					{selectedUserId && <AddKegiatan dataUser={dataUser} />}
					<AddProyek />
				</Flex>
				<Box
					className="icon-filter"
					onClick={() => setIsModalOpen(true)}
				>
					<IoFilter color="red" />
				</Box>
			</Flex>

			<DataTable
				className="full-border-table"
				columns={columns}
				data={dataActivity.length > 0 ? dataActivity : [{}]}
				pagination
				paginationRowsPerPageOptions={[5, 10, 20, 30]}
				paginationComponentOptions={{
					rowsPerPageText: "Rows per page:",
					rangeSeparatorText: "of",
					noRowsPerPage: false,
					selectAllRowsItem: false,
					selectAllRowsItemText: "All",
				}}
				sortIcon
				// Tampilkan teks "Table Kosong" jika tidak ada data
			/>

			{selectedUserId && (
				<>
					<Flex justify={"space-between"}>
						<h3 style={{ color: "#2775EC", fontWeight: "normal" }}>
							Total durasi
						</h3>
						<h3 style={{ color: "#2775EC", fontWeight: "normal" }}>
							{formatDurasi(dataUser?.total_durasi)}
						</h3>
					</Flex>
					<Flex mt={-10} justify={"space-between"}>
						<h3 style={{ color: "#2775EC" }}>Total Pendapatan</h3>
						<h2 style={{ color: "#2775EC" }}>
							{formatToRupiah(dataUser?.total_pendapatan)}
						</h2>
					</Flex>
				</>
			)}

			<FilterModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				options={dataProyekOption}
				selectedOptions={selectedOptions}
				onChange={handleFilterChange}
			/>
		</Paper>
	);
};

export default DaftarKegiatan;
