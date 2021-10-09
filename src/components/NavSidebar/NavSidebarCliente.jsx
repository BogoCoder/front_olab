import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/olab_logo.svg";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

const NavbarCliente = () => {
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
								<a className='nav-link active' aria-current='page' href='#'>
									Home
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' href='#'>
									TeslaLAB
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' href='#'>
									Carrito de préstamos
								</a>
							</li>
						</ul>
						<div style={{ color: "#0c3779", marginLeft: "20%" }}>
							<h3>Laboratorio Tesla</h3>
						</div>
					</div>
				</div>
				<IconButton>
					<FaIcons.FaShoppingCart />
				</IconButton>
				<IconButton>
					<IoIcons.IoMdNotifications />
				</IconButton>
				<IconButton>
					<Avatar alt='Miguel Valencia' />
				</IconButton>
			</nav>
		</React.Fragment>
	);
};

export default NavbarCliente;
