import React, { useState, useEffect, useTransition, useRef, useMemo } from 'react';
import {regExTrim} from '../Helper/auxiliaryFunctions.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

  function valuetext(value) {
    return `${value}°C`;
  }

  let debounceSearching;

const Products = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [rating, setRating] = useState(null);
  const [priceRange, setPriceRange] = useState([5, 500]);
  const [data, setData] = useState([]);   
  const [foundData, setFoundData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [isPending, startTransition] = useTransition() ;
  const [page, setPage] = useState(1);
  const rowCount = 10;
  let countRef = useRef(0);

  async function getData(){
    await fetch('./storage/data.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response=>{      
      setData(response);    
    })
    .catch(err => console.error(err))
  }
  
  const searchFnc = (newKeyword) => {
    if(debounceSearching !== undefined){
      clearTimeout(debounceSearching);
    }
    debounceSearching = setTimeout(function() {
      setKeyword(newKeyword);
    },1000)
  }

  const chooseCategoryFnc = (event, newCategory) => {
    if(!category.includes(newCategory) && event.checked === true){
      setCategory(oldCategories => [...oldCategories, newCategory])
    }else{
      const index = category.indexOf(newCategory);
      if (index > -1) {
        setCategory([...category.slice(0, index), ...category.slice(index + 1)]);
      }
    }
  }

  const chooseBrandFnc = (event, newBrand) => {
    if(!brand.includes(newBrand) && event.checked === true){
      setBrand(oldBrands => [...oldBrands, newBrand])
    }else{
      const index = brand.indexOf(newBrand);
      if (index > -1) {
        setBrand([...brand.slice(0, index), ...brand.slice(index + 1)]);
      }
    }
  }

  const chooseRatingFnc = (newRating) => {     
    setRating(newRating);
  }

  const changePriceRangeFnc = (event, newValue) => {    
    setPriceRange(newValue);
  };

  function searchLogic(keyword = '', category = [], brand = [], rating = null, priceRange = [5, 500]){
    countRef.current = 0;
    setFoundData([]);
    for (let i= 0; i<data.length; i++) {        
      if (
          ((data[i].name.includes(keyword)  || 
          data[i].category.includes(keyword)  || 
          data[i].brand.includes(keyword)) || keyword === '' 
          ) && 
          (rating === null || Math.round(data[i].rating) === rating)
          &&
          (category.length === 0 || 
          ((category[0] !==undefined && data[i].category === category[0]) || 
            (category[1] !==undefined && data[i].category === category[1]) ||
            (category[2] !==undefined && data[i].category === category[2])
          ))
          &&
          (brand.length === 0 || 
          ((brand[0] !==undefined && data[i].brand === brand[0]) ||
            (brand[1] !==undefined && data[i].brand === brand[1]) ||
            (brand[2] !==undefined && data[i].brand === brand[2]) ||
            (brand[3] !==undefined && data[i].brand === brand[3]) ||
            (brand[4] !==undefined && data[i].brand === brand[4])
          ))
          &&
          (data[i].price >= priceRange[0] && data[i].price <= priceRange[1])
        )
      {           
        countRef.current++;
        startTransition(() => {
          if((countRef.current  > (rowCount * page) - rowCount) && (countRef.current  <= (rowCount * page))){
            setFoundData(oldData => [...oldData, data[i]]);
          }
        });
      }
    }

    if(page > Math.ceil(countRef.current/rowCount)){
      if(Math.ceil(countRef.current/rowCount) > 0){
        setPage(Math.ceil(countRef.current/rowCount));
      }else{
        setPage(1);
      }
    }
  }

  const changePagination = (env, currentPage) => {
    setPage(currentPage);
  };

  useMemo(() => {
    return getData();
  },[]);

  useEffect(() => {
    if(regExTrim(keyword).length > 0 || category.length > 0 || brand.length > 0 || rating !== null ){
      searchLogic(regExTrim(keyword), category, brand, rating, priceRange);
    }else {
      setFoundData([]);
    }
  },[keyword, category, brand, rating, priceRange, page])
/////////////////////////////////////////////////////////////////////////////////////////////////
  
  return (
    <>        
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} >
          <Grid  size={{ xs: 12, sm: 12, md: 3, lg: 2 }}>
            <Box component="div" sx={{ display: { xs: (filter ? 'block': 'none'), sm: filter ? 'block': 'none',  md: 'inline' }}}>
              <Grid container spacing={1}  align="left">
                <Grid  size={{ xs: 12, sm: 6, md: 12 }}>
                  <Box component="div" m={3} xs={3} >
                    <FormLabel component="legend">Category</FormLabel>    
                    <FormGroup>
                      <FormControlLabel control={<Checkbox onChange={(e) => chooseCategoryFnc(e.target, 'Electronics')} />} label="Electronics" />
                      <FormControlLabel control={<Checkbox onChange={(e) => chooseCategoryFnc(e.target, 'Footwear')} />} label="Footwear" />
                      <FormControlLabel control={<Checkbox onChange={(e) => chooseCategoryFnc(e.target, 'Clothing')} />} label="Clothing" />
                    </FormGroup>
                  </Box>
                </Grid>
                <Grid  size={{ xs: 12, sm: 6, md: 12 }} >
                  <Box component="div" m={3}>
                    <FormLabel component="legend">Brand</FormLabel>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox onChange={(e) => chooseBrandFnc(e.target, 'Brand A')} />} label="Brand A" />
                      <FormControlLabel control={<Checkbox onChange={(e) => chooseBrandFnc(e.target, 'Brand B')} />} label="Brand B" />
                      <FormControlLabel control={<Checkbox onChange={(e) => chooseBrandFnc(e.target, 'Brand C')} />} label="Brand C" />
                      <FormControlLabel control={<Checkbox onChange={(e) => chooseBrandFnc(e.target, 'Brand D')} />} label="Brand D" />
                      <FormControlLabel control={<Checkbox onChange={(e) => chooseBrandFnc(e.target, 'Brand E')} />} label="Brand E" />
                    </FormGroup>
                  </Box>
                </Grid>
                <Grid  size={{ xs: 12, sm: 6, md: 12 }}>
                  <Box component="div" m={3}>
                  <FormLabel component="legend">Rating</FormLabel> 
                      <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(event, newValue) => {
                        chooseRatingFnc(newValue);
                      }}
                    />
                  </Box>
                </Grid>
                <Grid  size={{ xs: 12, sm: 6, md: 12 }}>
                  <Box component="div" m={3}>
                    <FormLabel component="legend">0 - 500</FormLabel>
                    <Slider
                      getAriaLabel={() => 'Temperature range'}
                      min={0}
                      max={500}
                      step={10}
                      shiftStep={50}
                      className="Slider-price-range"
                      value={priceRange}
                      onChange={changePriceRangeFnc}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                    />
                  </Box>
                </Grid>      
              </Grid>
            </Box>        
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9, lg: 10 }} align="left" >
            <Box component="div" sx={{ display: { xs: 'block', md: 'inline' } }}>
              <Stack spacing={2} m={2} direction="row">
                <TextField          
                  id="outlined-required"
                  label="Search..."
                  style={{width: '100%', }}
                  defaultValue={keyword}
                  onChange={(e) => searchFnc(e.target.value)}
                />    
                <Button 
                  variant="outlined" 
                  sx={{ display: { xs: 'inline', md: 'none' } }}
                  style={{ width: '100%'}}
                  onClick={() => setFilter(!filter)}
                >Filter
                  {filter && <CloseIcon sx={{ fontSize: "small" }} />}
                </Button>
              </Stack>
              {isPending 
              ?  
                <Box component="div" m={3}>
                  <CircularProgress />
                </Box>
              :
              <>
              { (foundData.length > 0 ) ?
              <>
              <TableContainer  component={Paper}>
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
                  count={Math.ceil(countRef.current/rowCount)}
                  size="medium"
                  page={page}
                  variant="outlined"
                  sx={{ paddingTop: '20px'}}
                  shape="rounded"                           
                  onChange={changePagination}                   
                />  
              </Box>
              </>
              :        
              <Stack spacing={2}  >        
                <SnackbarContent message={ 'No products found'}  />
              </Stack>
              }
            </>
            }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )

}

export default Products;