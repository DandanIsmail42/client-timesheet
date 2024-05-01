import { Box, Container, Tabs, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import Home from "../../pages/Home/Home";

const Navbar = () => {
	return (
		<div>
			<nav
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "1rem 1.5rem",
					width: "100%",
					boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
					position: "relative",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<Text
						style={{
							color: "red",
							fontWeight: "bold",
						}}
						size="lg"
					>
						Timesheet
					</Text>
					<Text
						style={{
							color: "red",
							fontWeight: "bold",
							marginTop: "-5px",
						}}
						size="sm"
					>
						Management
					</Text>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
