// FilterModal.jsx

import React from "react";
import { Modal, MultiSelect, Select } from "@mantine/core";

const FilterModal = ({
	isOpen,
	onClose,
	options,
	selectedOptions,
	onChange,
}) => {
	return (
		<Modal title="Filter" opened={isOpen} onClose={onClose}>
			<Select
				data={options}
				value={selectedOptions}
				onChange={onChange}
				searchable
				clearable
				label="Select options"
			/>
		</Modal>
	);
};

export default FilterModal;
