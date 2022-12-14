// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { Null } from 'mdi-material-ui'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const [values, setValues] = useState({
    firstName: "",
    lastName: "" ,
    email: "",
    phone: ""
  })

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if(JSON.parse(localStorage.getItem("type")) === "developer"){
    fetch("https://lancerbackend.herokuapp.com/developers/home", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      contentType: 'application/json',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
         "Access-Control-Allow-Origin": "*"}
    })
     .then(res => res.json())
     .then((data) =>{
      console.log(data)
      setValues({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone
     })
     }
     )
    }
  else{
    fetch("https://lancerbackend.herokuapp.com/clients/home", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      contentType: 'application/json',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
         "Access-Control-Allow-Origin": "*"}
    })
     .then(res => res.json())
     .then((data) =>{
      console.log(data)
      setValues({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone
     })
     }
     )
  }}
  }, [])

  const fetchAccUpdate = () => {
    if (typeof window !== 'undefined') {
      if(JSON.parse(localStorage.getItem("type")) === "developer"){
    fetch("https://lancerbackend.herokuapp.com/developers/settings", {
      method: 'PUT', 
      mode: 'cors',
      
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        
        // "Access-Control-Allow-Origin": "*"
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
    }else{
      fetch("https://lancerbackend.herokuapp.com/clients/settings", {
      method: 'PUT', 
      mode: 'cors',
      
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        
        // "Access-Control-Allow-Origin": "*"
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
    }
  }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }


  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='First Name' 
              placeholder='John'
              value={values.firstName}
              onChange={handleChange('firstName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            fullWidth 
            label='Last Name' 
            placeholder='John Doe'  
            defaultValue = {values.lastName}
            value={values.lastName}
              onChange={handleChange('lastName')}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              value={values.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Phone'
              placeholder='xxx-xxx-xxxx'
              value={values.phone}
              onChange={handleChange('phone')}
            />
          </Grid>
         
          


          <Grid item xs={12}>
            <Button 
            variant='contained' 
            onClick={() => {
              fetchAccUpdate()
            }}
          
            sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
          
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
