import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Box, Select } from "@mantine/core";
import "./addKegiatan.css";
import { useForm } from "react-hook-form";
import { apiInsertProyek } from "../../services/api";
import Swal from "sweetalert2";

const AddKegiatan = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nama_proyek: "",
		},
	});

	const handleClose = () => {
		reset();
		close();
	};

	const insertProyek = async (value) => {
		const params = { ...value };

		try {
			const { data } = await apiInsertProyek(JSON.stringify(params));
			if (data.status === 201) {
				close();
				reset();
				Swal.fire({
					title: data.message,
					text: "You clicked the button!",
					icon: "success",
				});
			}
			// getUsers();
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

	return (
		<>
			<Modal opened={opened} onClose={handleClose} title="Tambah Proyek">
				<form onSubmit={handleSubmit(insertProyek)}>
					<TextInput
						{...register("nama_proyek", {
							required: {
								value: true,
								message: "Proyek wajib diisi",
							},
						})}
						label="Nama Proyek"
						placeholder="Masukan nama judul proyek"
					/>
					{errors?.Nama?.message && (
						<p className="error-message">
							{errors?.judul_kegiatan?.message}
						</p>
					)}
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
					width: "150px",
					height: "40px",
					borderRadius: "10px",
				}}
				onClick={open}
			>
				Tambah Proyek
			</button>
		</>
	);
};

export default AddKegiatan;
