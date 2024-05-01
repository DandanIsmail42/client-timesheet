import React, { useState } from "react";

import "./header.css";
import { Paper, Tabs } from "@mantine/core";

const Header = () => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<>
			<div className="header">
				<h2>HH TIMESHEET</h2>
				<Tabs color="blue" defaultValue="gallery">
					<Tabs.List>
						<Tabs.Tab value="gallery">Gallery</Tabs.Tab>
						<Tabs.Tab value="messages">Messages</Tabs.Tab>
					</Tabs.List>
					<Paper className="tabs-wrapper">
						<Tabs.Panel value="gallery">
							Gallery tab content
						</Tabs.Panel>

						<Tabs.Panel value="messages">
							Messages tab content
						</Tabs.Panel>
					</Paper>
				</Tabs>
			</div>
		</>
	);
};

export default Header;
