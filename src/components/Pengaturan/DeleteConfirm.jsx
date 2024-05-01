import { useState } from "react";
import { Modal, Button, Box } from "@mantine/core";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }) {
	return (
		<Modal opened={isOpen} onClose={onClose} title="Konfirmasi Hapus">
			<p>
				Apakah Anda yakin ingin menghapus{" "}
				<span style={{ fontWeight: "bold" }}>{itemName}</span>?
			</p>
			<Box style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={onClose} style={{ marginRight: 10 }}>
					Batal
				</Button>
				<Button onClick={onConfirm} variant="outline" color="red">
					Hapus
				</Button>
			</Box>
		</Modal>
	);
}

export default DeleteConfirmationModal;
