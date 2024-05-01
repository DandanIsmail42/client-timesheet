import { useEffect, useState } from "react";
import { Modal, Button, Box, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { apiEditUser } from "../../services/api";
import Swal from "sweetalert2";

function EditUser({ isOpen, onClose, onConfirm, defaultValue, getUsers }) {
	const dataValue = defaultValue;
	console.log("def", dataValue);
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue("Nama", dataValue?.Nama);
		setValue("rate", dataValue?.rate);
	}, [dataValue?.Nama, dataValue?.rate, getUsers, setValue]);
	const updateUser = async (value) => {
		try {
			const id = dataValue?.id;
			const params = { ...value };
			const { data } = await apiEditUser(id, params);
			if (data.status === 200) {
				onClose();
				reset();
				Swal.fire({
					title: "Data berhasil diubah",
					text: "You clicked the button!",
					icon: "success",
				});
			}
			getUsers();
		} catch (error) {
			const {
				response: { data },
			} = error;
			if (data.code === 400) {
				setError("Nama", {
					type: "manual",
					message: data.errors?.[0]?.Nama,
				});
				setError("rate", {
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
		<Modal opened={isOpen} onClose={onClose} title="Konfirmasi Hapus">
			<form onSubmit={handleSubmit(updateUser)}>
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
						onClick={onClose}
					>
						Batalkan
					</Button>
					<Button type="submit" className="button-save">
						Ubah
					</Button>
				</Box>
			</form>
		</Modal>
	);
}

export default EditUser;
