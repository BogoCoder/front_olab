import React, { useState } from 'react';
import './InfoPersonal.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TablePagination } from '@mui/material';




const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));




function createData(name, calories, fat, carbs,x,y) {
  return {
    name,
    calories,
    fat,
    carbs,
    x,
    y,
    Descripción: [
      {
        serial: '2020-01-05',
        customerId: '11091700',
        amount: 3,
        l:3,
        J:3,
      },

    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.x}</TableCell>
        <TableCell align="right">{row.y}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Resumen
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Serial</TableCell>
                    <TableCell>Descripcion</TableCell>
                    <TableCell align="right">Categoria</TableCell>
                    <TableCell align="right">Ubicacion</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Descripción.map((DescripciónRow) => (
                    <TableRow key={DescripciónRow.serial}>
                      <TableCell component="th" scope="row">
                        {DescripciónRow.serial}
                      </TableCell>
                      <TableCell>{DescripciónRow.customerId}</TableCell>
                      <TableCell align="right">{DescripciónRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(DescripciónRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    Descripción: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        serial: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('P-0Mg5dv', '2021-11-12', '2021-11-39', '2021-11-39', 'Activo', 39),
  createData('P-0Mg5dv1', '2021-11-13', '2021-11-25', '2021-11-39', 'Atrasado',1),
  createData('P-0Mg5dv', '2021-11-10', '2021-11-22', '2021-11-39', 'Activo', 3),
  createData('P-0Mg5dv12', '2021-11-12', '2021-11-24', '2021-11-39', 'Activo', 2),
  createData('P-0Mg5dv23', '2021-11-16', '2021-11-24', '2021-11-39', 'Activo', 1),
];

export default function CollapsibleTable() {
    const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(4);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Prestamo_id</TableCell>
            <TableCell align="right">Fecha del préstamo</TableCell>
            <TableCell align="right">Fecha de Vencimiento</TableCell>
            <TableCell align="right">Fecha de entrega</TableCell>
            <TableCell align="right">Estado entrega</TableCell>
            <TableCell align="right">Renovaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
		
                                        <Row key={row.name} row={row} />
                                      
								);
							})}
					</TableBody>
      </Table>
      <TablePagination
				rowsPerPageOptions={[4, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
    </TableContainer>
    
  );
}
