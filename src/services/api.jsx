import axios from "axios";

const webserviceurlMain = "http://localhost:3000";
export async function apiGetAllUser() {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "get",
			url: webserviceurlMain + "/users",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function apiGetUserById(id) {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "get",
			url: webserviceurlMain + `/users/${id}`,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function apiInsertUser(params) {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "post",
			url: webserviceurlMain + "/users",
			data: params,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function apiEditUser(id, params) {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "put",
			url: webserviceurlMain + `/users/${id}`,
			data: params,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function apiDeleteUser(id) {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "delete",
			url: webserviceurlMain + `/users/${id}`,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function apiGetActivity(id, proyekId) {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "get",
			url: webserviceurlMain + `/kegiatan/${id}?proyekId=${proyekId}`,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function apiInsertActivity(params) {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "post",
			url: webserviceurlMain + "/kegiatan",
			data: params,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function apiGetProyek() {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "get",
			url: webserviceurlMain + `/proyek`,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function apiInsertProyek(params) {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios({
			method: "post",
			url: webserviceurlMain + "/proyek",
			data: params,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
