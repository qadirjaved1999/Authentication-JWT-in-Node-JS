import Grid from "@mui/material/Grid2";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from "axios";

const SignUpForm = () => {

    const initialState = {
        username: '',
        email: '',
        password: '',
        age: ''
    }
    const [data, setData] = useState(initialState);

    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        console.log("name => ", name + " " + "value => ", value);
    }

    const submitForm = async  () => {
        alert("FORM SUBMITED");
        try{
         const response = await axios.post('http://localhost:3000/create', data, { withCredentials: true });
         setData(response.data.data);
         setData("");
        }catch(error){
         console.log("Some thing wrong, Form can't Submitted");
        }
    } 
    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid container spacing={2} boxShadow={2} width={400} borderRadius={3} sx={{ padding: "0px 25px 25px 25px" }} >
                <Grid style={{width: "100%", marginTop: "25px", marginBottom: "10px"}}>
                    <img src="/public/assets/logo.svg" alt="Logo" width={40} height={40} />
                </Grid>
                <Grid style={{width: "100%", marginTop: "5px", marginBottom: "15px"}}>
                   <Typography variant="h5" style={{fontWeight:"bold"}}>{"SignUp Form"}</Typography>
                </Grid>
                <Grid sx={{width: "100%" }}>
                    <TextField
                        required
                        name="username"
                        value={data.username}
                        variant="outlined"
                        label="Enter name"
                        type="text"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid sx={{width: "100%" }}>
                    <TextField
                        required
                        name="email"
                        value={data.email}
                        variant="outlined"
                        label="Enter email"
                        type="email"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        required
                        name="password"
                        variant="outlined"
                        value={data.password}
                        label="Enter password"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        required
                        name="age"
                        variant="outlined"
                        value={data.age}
                        label="Enter age"
                        type="number"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12} sx={{ mt: 2,width: "100%" }}>
                    <Button fullWidth onClick={submitForm} sx={{background: "#6D0926", color: "white"}}>{"SignUp"}</Button>
                </Grid>
                <Grid sx={{ mb: 2, width: "100%" }}>
                    <Link href="/forgot-password" className="text-sm underline text-primary font-medium">
                        Forgot password?
                    </Link>
                </Grid>
            </Grid>
        </Box>
    )
}
export default SignUpForm
