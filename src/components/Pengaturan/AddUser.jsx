import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Box } from "@mantine/core";
import "./addUser.css";
import { useForm } from "react-hook-form";
import { apiInsertUser } from "../../services/api";
import Swal from "sweetalert2";

const AddUser = ({ getUsers }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			Nama: "",
			rate: 0,
		},
	});

	const handleClose = () => {
		reset();
		close();
	};

	const insertUser = async (value) => {
		const params = { ...value };
		try {
			const { data } = await apiInsertUser(JSON.stringify(params));
			if (data.status === 201) {
				close();
				reset();
				Swal.fire({
					title: data.message,
					text: "You clicked the button!",
					icon: "success",
				});
			}
			getUsers();
		} catch (error) {
			const {
				response: { data },
			} = error;
			if (data.status === 400) {
				setError("Nama", {
					type: "manual",
					message: data.errors?.[0]?.Nama,
				});
				setError("Rate", {
					type: "manual",
					message: data.errors?.[0]?.rate,
				});
			}
			if (data.status === 500) {
				console.log(error);
			}
		}
	};

	return (
		<>
			<Modal
				opened={opened}
				onClose={handleClose}
				title="Tambah Pengguna"
			>
				<form onSubmit={handleSubmit(insertUser)}>
					<TextInput
						{...register("Nama", {
							required: {
								value: true,
								message: "Nama wajib diisi",
							},
						})}
						label="Nama Karyawan"
						placeholder="Masukan nama"
					/>
					{errors?.Nama?.message && (
						<p className="error-message">{errors?.Nama?.message}</p>
					)}
					<TextInput
						{...register("rate")}
						type="number"
						data-autofocus
						label="Rate"
						placeholder="Masukan angka"
						mt="md"
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
					backgroundColor: "white",
					border: "1px solid #2775EC",
					color: "#2775EC",
					width: "100px",
					borderRadius: "10px",
					padding: "5px",
				}}
				onClick={open}
			>
				Tambah
			</button>
		</>
	);
};

export default AddUser;
