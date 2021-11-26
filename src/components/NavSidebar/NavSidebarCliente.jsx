import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/olab_logo.svg";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const WhiteTextTypography = withStyles({
	root: {
		color: "black",
		textAlign: "right",
	},
})(Typography);

const NavbarCliente = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className='container-fluid'>
					<img src={logo} alt='logo' />
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNav'
						aria-controls='navbarNav'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav mx-5'>
							<li className='nav-item'>
								<a
									className='nav-link active'
									aria-current='page'
									href='/Cliente'
								>
									Home
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' href='#'>
									TeslaLAB
								</a>
							</li>
							{/* <li className='nav-item'>
								<a className='nav-link' href='#'>
									Carrito de préstamos
								</a>
							</li> */}
						</ul>
						<div style={{ color: "#0c3779", margin: "auto" }}>
							<h3>Laboratorio Tesla</h3>
						</div>
					</div>
				</div>
				{/* <IconButton>
					<FaIcons.FaShoppingCart />
				</IconButton>
				<IconButton>
					<IoIcons.IoMdNotifications />
				</IconButton> */}
				{/* <IconButton style={{ marginRight: "1em" }}>
					<Avatar alt='Miguel Valencia' />
				</IconButton> */}
				<div>
					<Grid
						container
						alignItems='center'
						justifyContent='center'
						spacing={2}
					>
						<Grid item xs container direction='column' spacing={2}>
							<Grid item xs>
								<WhiteTextTypography variant='caption'>
									Miguel Valencia Z.
								</WhiteTextTypography>
							</Grid>
						</Grid>
						<Grid item>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								size='small'
								style={{ marginRight: "1em" }}
							>
								<Avatar alt='Miguel Valencia' />
								{/* <Avatar alt='Camioncitos S.A.S.' src={truck_avatar} /> */}
							</IconButton>
						</Grid>
					</Grid>

					<Menu
						id='menu-appbar'
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={open}
						onClose={handleClose}
					>
						<Link
							to='/ClientePerfil'
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
						</Link>

						<MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
					</Menu>
				</div>
			</nav>
		</React.Fragment>
	);
};

export default NavbarCliente;
