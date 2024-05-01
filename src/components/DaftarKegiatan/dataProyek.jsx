import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiGetProyek } from "../../services/api";

const DataProyek = () => {
	const [recordDataProyek, setRecordDataProyek] = useState([]);
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
		getProyek();
	}, []);

	const getProyek = async () => {
		try {
			const {
				data: { status, record },
			} = await apiGetProyek();
			if (status === 200) {
				setRecordDataProyek(record);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return {
		recordDataProyek,
	};
};

export default DataProyek;
