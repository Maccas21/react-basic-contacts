import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function App() {
	const [contacts, setContacts] = useState([]);
	const [open, setOpen] = useState({});

	useEffect(() => {
		getContacts();
	}, [contacts]);

	const getContacts = async () => {
		const req = new Request("https://jsonplaceholder.typicode.com/users");
		fetch(req)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setContacts(data);
			});
	};

	const handleListClick = (name) => {
		setOpen({
			...open,
			[name]: !open[name],
		});
	};

	return (
		<div className="App">
			<Box
				sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
				margin="auto"
			>
				<List>
					{contacts.map((item, index) => {
						return (
							<div>
								<ListItem disablePadding>
									<ListItemButton
										onClick={handleListClick.bind(this, item.name)}
									>
										<ListItemIcon>
											<PersonIcon />
										</ListItemIcon>
										<ListItemText primary={item.name} />
										{open[item.name] ? <ExpandLess /> : <ExpandMore />}
									</ListItemButton>
								</ListItem>
								<Collapse in={open[item.name]} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem sx={{ pl: 4 }}>
											<ListItemText
												primary={"Username: " + item.username}
												secondary={
													<div>
														<Typography display={"block"}>
															{"Email: " + item.email}
														</Typography>
														<Typography display={"block"}>
															{"Address: " +
																item.address.suite +
																" " +
																item.address.street +
																", " +
																item.address.city +
																", " +
																item.address.zipcode}
														</Typography>
														<Typography display={"block"}>
															{"Phone: " + item.phone}
														</Typography>
														<Typography display={"block"} href={item.website}>
															{"Website: "}
															<Link href={"http://" + item.website}>
																{item.website}
															</Link>
														</Typography>
														<Typography display={"block"}>
															{"Company: " + item.company.name}

														</Typography>
													</div>
												}
											/>
										</ListItem>
									</List>
								</Collapse>
							</div>
						);
					})}
				</List>
			</Box>
		</div>
	);
}

export default App;
