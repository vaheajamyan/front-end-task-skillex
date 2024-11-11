import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';

const Catalog = (props) => {
  
  const {foundData, countRef, page, rowCount, changePagination} = props;

  return (
    foundData.length > 0 ?
    <div data-testid="Table-testid">
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{background: '#763876'}}>
          <TableRow className="Table-row">
            <TableCell className="Table-cell">Id</TableCell>
            <TableCell className="Table-cell" align="left">Name</TableCell>
            <TableCell className="Table-cell" align="left">Category</TableCell>
            <TableCell className="Table-cell" align="left">Brand</TableCell>
            <TableCell className="Table-cell" align="left">Price</TableCell>            
            <TableCell className="Table-cell" align="left">Rating</TableCell>            
            <TableCell className="Table-cell" align="left">ImageUrl</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {foundData.map((row, key) => (              
            <TableRow
              key={key}                        
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >                
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.category}</TableCell>
              <TableCell align="left">{row.brand}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.rating}</TableCell>
              <TableCell align="left"><img src={row.imageUrl} style={{width: '20px', height: '20px'}} alt="productImg" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>     
    </TableContainer>
    <Box style={{
      background: 'white',         
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius: '0 0 8px 8px',
      paddingBottom: '20px',
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      }}>
      <Pagination
        count={Math.ceil(countRef/rowCount)}
        size="medium"
        page={page}
        variant="outlined"
        sx={{ paddingTop: '20px'}}
        shape="rounded"                           
        onChange={changePagination}                   
      />  
    </Box>
    </div>
    :
    <Stack spacing={2} >        
      <SnackbarContent message={'No products found'}  />
    </Stack>
  )
}

export default Catalog;