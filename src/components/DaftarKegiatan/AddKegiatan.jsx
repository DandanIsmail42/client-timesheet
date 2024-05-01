import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Box, Select } from "@mantine/core";
import "./addKegiatan.css";
import { Controller, useForm } from "react-hook-form";
import { apiInsertActivity, apiInsertUser } from "../../services/api";
import Swal from "sweetalert2";
import DataProyek from "./dataProyek";
import { useNavigate } from "react-router-dom";

const AddKegiatan = ({ dataUser }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const { recordDataProyek } = DataProyek();
	const navigate = useNavigate();
	const user = dataUser;
	console.log(user, "userr");
	const {
		register,
		handleSubmit,
		setError,
		reset,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			judul_kegiatan: "",
			tanggal_mulai: "",
			tanggal_berakhir: "",
			UserId: user?.id,
			ProyekId: "",
		},
	});

	const handleClose = () => {
		reset();
		close();
	};

	const insertActivity = async (value) => {
		const params = { ...value, UserId: user.id };

		try {
			const { data } = await apiInsertActivity(JSON.stringify(params));
			if (data.status === 201) {
				close();
				reset();
				Swal.fire({
					title: data.message,
					text: "You clicked the button!",
					icon: "success",
				});
			}
			navigate("/");
		} catch (error) {
			return error;
			// const {
			// 	response: { data },
			// } = error;
			// if (data.status === 400) {
			// 	setError("Nama", {
			// 		type: "manual",
			// 		message: data.errors?.[0]?.Nama,
			// 	});
			// 	setError("Rate", {
			// 		type: "manual",
			// 		message: data.errors?.[0]?.rate,
			// 	});
			// }
			// if (data.status === 500) {
			// 	console.log(error);
			// }
		}
	};
	const dataProyekOption = recordDataProyek.map((proyek) => ({
		id: proyek.id,
		label: proyek.nama_proyek,
		value: proyek.id,
	}));
	return (
		<>
			<Modal
				opened={opened}
				onClose={handleClose}
				title="Tambah Pengguna"
			>
				<form onSubmit={handleSubmit(insertActivity)}>
					<TextInput
						{...register("judul_kegiatan", {
							required: {
								value: true,
								message: "Nama wajib diisi",
							},
						})}
						label="Judul kegiatan"
						placeholder="Masukan nama kegiatan"
					/>
					{errors?.Nama?.message && (
						<p className="error-message">{errors?.Nama?.message}</p>
					)}
					<TextInput
						{...register("tanggal_mulai", {
							required: {
								value: true,
								message: "Tanggal mulai wajib diisi",
							},
						})}
						type="datetime-local" // Tambahkan properti type
						label="Tanggal Mulai"
						placeholder="Masukkan tanggal mulai"
					/>

					<TextInput
						{...register("tanggal_berakhir", {
							required: {
								value: true,
								message: "Tanggal berakhir wajib diisi",
							},
						})}
						type="datetime-local" // Tambahkan properti type
						label="Tanggal Berakhir"
						placeholder="Masukkan tanggal berakhir"
					/>

					<Controller
						name="ProyekId"
						control={control}
						render={({ field }) => (
							<Select
								allowDeselect
								label="Masukan proyek"
								w={200}
								placeholder="Pilih Menu"
								searchable
								nothingFound="Proyek Tidak Ditemukan"
								// error={errors.id?.message}
								data={dataProyekOption}
								{...field}
								// onChange={(value) => {
								// 	field.onChange(value);
								// 	setSelectedProyek(value); // Memperbarui state selectedUserId saat nilai berubah
								// }}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: "Menu wajib diisi",
							},
						}}
					/>
					<Box className="footer">
						<Button
							variant="default"
							className="button-cancel"
							onClick={handleClose}
						>
							Batalkan
						</Button>
						<Button type="submit" className="button-save">
							Simpan
						</Button>
					</Box>
				</form>
			</Modal>

			<button
				style={{
					marginTop: "23px",
					backgroundColor: "white",
					border: "1px solid #2775EC",
					color: "#2775EC",
					width: "100px",
					height: "40px",
					borderRadius: "10px",
				}}
				onClick={open}
			>
				Tambah
			</button>
		</>
	);
};

export default AddKegiatan;
