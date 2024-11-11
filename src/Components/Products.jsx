import React, { useState, useEffect, useTransition, useRef, useReducer } from 'react';
import Catalog from './Catalog';
import {regExTrim} from '../Helper/auxiliaryFunctions.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

  const categoryArray = {
    checked: [false, false, false], 
    name: ['Electronics', 'Footwear', 'Clothing']
  }

  function categoryReducer(state, action){
    switch(action.type){
      case 'category_checked_change': {
        return {
          checked: action.newChecked,
          name: state.name
        }
      }
      default: {
        console.log('Unknown case');
      }
    }
    throw Error('Unknown action: ' + action.type);
  }

  const brandArray = {
    checked: [false, false, false, false, false], 
    name: ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E']
  }

  function brandReducer(state, action){
    switch(action.type){
      case 'brand_checked_change': {
        return {
          checked: action.newChecked,
          name: state.name
        }
      }
      default: {
        console.log('Unknown case');
      }
    }
    throw Error('Unknown action: ' + action.type);
  }

  function valuetext(value) {
    return `${value}°C`;
  }

  let debounceSearching;

const Products = () => {
  const [preKeyword, setPreKeyword] = useState('');
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
  const [categoryState, categoryDispatch] = useReducer(categoryReducer, categoryArray);
  const [brandState, brandDispatch] = useReducer(brandReducer, brandArray);
  const rowCount = 10;
  let countRef = useRef(0);

  async function getData(){
    await fetch('http://localhost:3000/storage/data.json',{
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
    setPreKeyword(newKeyword);
    if(debounceSearching !== undefined){
      clearTimeout(debounceSearching);
    }    
    debounceSearching = setTimeout(function() {      
      setKeyword(newKeyword);
    },1000);
  }

  const chooseCategoryFnc = (event, newCategory) => {
    const nameIndex = (element) => element === newCategory;
    const cch = categoryState.checked;
    cch[categoryState.name.findIndex(nameIndex)] = cch[categoryState.name.findIndex(nameIndex)] ? false : true;
    categoryDispatch({type: 'category_checked_change', newChecked: cch});

    if(!category.includes(newCategory) && event.checked === true){
      setCategory(oldCategories => [...oldCategories, newCategory]);
    }else{
      const index = category.indexOf(newCategory);
      if (index > -1) {
        setCategory([...category.slice(0, index), ...category.slice(index + 1)]);
      }
    }
  }

  const chooseBrandFnc = (event, newBrand) => {
    const nameIndex = (element) => element === newBrand;
    const bch = brandState.checked;
    bch[brandState.name.findIndex(nameIndex)] = bch[brandState.name.findIndex(nameIndex)] ? false : true;
    brandDispatch({type: 'brand_checked_change', newChecked: bch});

    if(!brand.includes(newBrand) && event.checked === true){
      setBrand(oldBrands => [...oldBrands, newBrand]);
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

  useEffect(() => {
  for(let i=0; i<categoryArray.checked.length; i++){
    if(categoryArray.checked[i] === true){
      setCategory(oldCategories => [...oldCategories, categoryArray.name[i]]);
    }
  }

  for(let i=0; i<brandArray.checked.length; i++){
    if(brandArray.checked[i] === true){
      setBrand(oldBrands => [...oldBrands, brandArray.name[i]]);
    }
  }
  },[])

  useEffect(() => {
    if(data.length === 0){
      getData();
    }

    if(regExTrim(keyword).length > 0 || category.length > 0 || brand.length > 0 || rating !== null ){
      searchLogic(regExTrim(keyword), category, brand, rating, priceRange);
    }else {
      setFoundData([]);
    }
  },[keyword, category, brand, rating, priceRange, page, data])
/////////////////////////////////////////////////////////////////////////////////////////////////
  
  return (
    <>        
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} >
          <Grid  size={{ xs: 12, sm: 12, md: 3, lg: 2 }}>
            <Box component="div" sx={{ display: { xs: (filter ? 'block': 'none'), sm: filter ? 'block': 'none',  md: 'inline' }}}>
              <Grid container spacing={1}  align="left">
                <Grid  size={{ xs: 12, sm: 6, md: 12 }}>
                  <Box component="div" m={3} xs={3}>
                    <FormLabel component="legend">Category</FormLabel>
                    <FormGroup>
                      {categoryState.name.map((element, key) => {
                        return (<FormControlLabel key={key} control={<Checkbox checked={categoryState.checked[key]} onChange={(e) => chooseCategoryFnc(e.target, element)} />} label={element} />)
                      })}
                    </FormGroup>
                  </Box>
                </Grid>
                <Grid  size={{ xs: 12, sm: 6, md: 12 }} >
                  <Box component="div" m={3}>
                    <FormLabel component="legend">Brand</FormLabel>
                    <FormGroup>
                      {brandState.name.map((element, key) => {
                        return (<FormControlLabel key={key} control={<Checkbox checked={brandState.checked[key]} onChange={(e) => chooseBrandFnc(e.target, element)} />} label={element} />)
                      })}
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
                      data-testid="Slider-price-range-testid"
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
                  data-testid="Search-input"
                  placeholder="Search..."                  
                  id="outlined-required"
                  style={{width: '100%', }}
                  value={preKeyword}   
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
                <Box component="div" m={3} style={{ textAlign: 'center' }}>
                  <CircularProgress />
                </Box>
              :
              <>
              <Catalog foundData = {foundData} countRef = {countRef.current} page = {page} rowCount = {rowCount} changePagination = {changePagination}/>              
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