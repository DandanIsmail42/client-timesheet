import React, { useEffect, useState } from "react";
import { apiGetAllUser } from "../../services/api";
import { useForm } from "react-hook-form";

const DataUsers = () => {
	const [recordDataUsers, setRecordDataUsers] = useState([]);
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			menu_id: "",
			name: "",
		},
	});
	useEffect(() => {
		getAllUser();
	}, []);

	const getAllUser = async () => {
		try {
			const {
				data: { status, record },
			} = await apiGetAllUser();
			if (status === 200) {
				setRecordDataUsers(record);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return {
		recordDataUsers,
	};
};

export default DataUsers;
