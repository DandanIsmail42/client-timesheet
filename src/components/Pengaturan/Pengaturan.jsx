import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { apiDeleteUser, apiGetAllUser } from "../../services/api";
import { useEffect, useState } from "react";
import { Paper } from "@mantine/core";
import { CgTrashEmpty } from "react-icons/cg";
import "./pengaturan.css";
import AddUser from "./AddUser";
import DeleteConfirmationModal from "./DeleteConfirm";
import { formatToRupiah } from "../../utils/formatToRupiah";
import { formatDurasi } from "../../utils/formatDurasi";
import Swal from "sweetalert2";
import EditUser from "./EditUser";

function Pengaturan() {
	const [data, setData] = useState([]);
	const [selectedRow, setSelectedRow] = useState(null); // State untuk menyimpan data baris yang dipilih
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);

	const confirmDelete = async () => {
		try {
			await apiDeleteUser(selectedRow.id);
			const index = data.findIndex((item) => item.id === selectedRow.id);
			if (index !== -1) {
				const newData = [...data];
				newData.splice(index, 1);
				setData(newData);
			}
			Swal.fire({
				icon: "success",
				title: "Success",
				text: "Data berhasil di hapus",
			});
		} catch (error) {
			console.log(error);
		}
		setDeleteModalOpen(false); // Tutup modal konfirmasi setelah penghapusan selesai
	};
	const columns = [
		{
			name: "Nama",
			selector: (row) => row.Nama,
		},
		{
			name: "Rate",
			selector: (row) => formatToRupiah(row.rate),
		},
		{
			name: "Total Durasi",
			selector: (row) => formatDurasi(row.total_durasi),
		},
		{
			name: "Total Pendapatan",
			selector: (row) => formatToRupiah(row.total_pendapatan),
		},
		{
			name: "Action",
			cell: (row) => (
				<div className="action">
					<button onClick={() => handleEdit(row)}>
						<FaEdit color="red" />
					</button>{" "}
					<button onClick={() => handleDelete(row)}>
						<CgTrashEmpty color="red" />
					</button>{" "}
				</div>
			),
		},
	];

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const {
				data: { status, record },
			} = await apiGetAllUser();
			if (status === 200) {
				setData(record);
			}
		} catch (error) {
			console.log(error);
		}
	};
	console.log(data);

	const handleDelete = (row) => {
		setSelectedRow(row);
		setDeleteModalOpen(true);
	};
	const handleEdit = (row) => {
		console.log("edit", row);
		setSelectedRow(row);
		setEditModalOpen(true);
	};

	return (
		<Paper className="table-wrapper">
			<AddUser getUsers={getUsers} className="button-add" />
			<DataTable
				className="full-border-table"
				columns={columns}
				data={data}
				pagination
				sho
				paginationRowsPerPageOptions={[5, 10, 20, 30]}
				paginationComponentOptions={{
					rowsPerPageText: "Rows per page:",
					rangeSeparatorText: "of",
					noRowsPerPage: false,
					selectAllRowsItem: false,
					selectAllRowsItemText: "All",
				}}
				sortIcon
			/>
			<EditUser
				isOpen={editModalOpen}
				onClose={() => setEditModalOpen(false)}
				onConfirm={confirmDelete}
				defaultValue={selectedRow}
				getUsers={getUsers}
			/>
			<DeleteConfirmationModal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onConfirm={confirmDelete}
				itemName={selectedRow?.Nama}
			/>
		</Paper>
	);
}

export default Pengaturan;
