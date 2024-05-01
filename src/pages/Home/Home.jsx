import React from "react";
import "./home.css";
import Header from "../../components/Header/Header";
import { Box, Paper, Tabs } from "@mantine/core";

import Pengaturan from "../../components/Pengaturan/Pengaturan";
import DaftarKegiatan from "../../components/DaftarKegiatan/DaftarKegiatan";
const Home = () => {
	return (
		<div className="container">
			<h2>HH TIMESHEET</h2>
			<Tabs color="blue" defaultValue="daftar-kegiatan">
				<Tabs.List>
					<Tabs.Tab value="daftar-kegiatan">Daftar Kegiatan</Tabs.Tab>
					<Tabs.Tab value="pengaturan">Pengaturan</Tabs.Tab>
				</Tabs.List>
				<Box className="tabs-wrapper">
					<Tabs.Panel value="daftar-kegiatan">
						<DaftarKegiatan />
					</Tabs.Panel>

					<Tabs.Panel value="pengaturan">
						<Pengaturan />
					</Tabs.Panel>
				</Box>
			</Tabs>
		</div>
	);
};

export default Home;
