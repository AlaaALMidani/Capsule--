import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './loginSlices';
import logo from "../../styles/logo.png";
import { CustomInput } from '../../components/CustomInput';

export const UserTypes = {
  client : 'CLINT',
  pharmacy: 'PHARMACY',
  warehouse: 'WAREHOUSE',
  delivery: 'DELIVERY'
}
export let userType = UserTypes.pharmacy
export let userData ={} ;
export let token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzNkMzk4MjJjMWYwODUyYWEwYzUxZDciLCJwaG9uZU51bWJlciI6IjA5Mzc2NTk0NTQiLCJpYXQiOjE3MzIwOTM2NDgsImV4cCI6MTczMjE4MDA0OH0.BL7D_83G4utFxKD05Nym75FZtX36vL_XU4-687MhLbM'

export const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "0937639501",
    password: "12345678"
  });

  const dispatch = useDispatch();
  const state = useSelector(state => state.login);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(formData));
  };

  if (state.data && state.data.ok) {
    userData = {...state.data.user}
    console.log(state.data.user)
    token = userData.token
    if (userData.roleID === 2) {
      userType = UserTypes.client
    } else if (userData.roleID === 3) {
      userType = UserTypes.pharmacy
    } else if (userData.roleID === 4) {
      userType = UserTypes.warehouse
    } else if (userData.roleID === 5) {
      userType = UserTypes.delivery
    }
    navigate('/home');
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-screen bg-white p-6 md:p-20">
      {/* Logo */}
      <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0">
        <img src={logo} alt="Logo" className="w-1/2 md:w-auto" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 min-h-96"
      >
        <h2 className="text-lg font-bold mb-4 text-center md:text-left">Login</h2>

        {/* Phone Number Input */}
        <CustomInput
          type="Phone number"
          handleChange={handleChange}
          name="phoneNumber"
          label="Phone number"
          value={formData.phoneNumber}
        />

        {/* Password Input */}
        <CustomInput
          handleChange={handleChange}
          name="password"
          label="Password"
          value={formData.password}
        />

        {/* Error Message */}
        {state.data && !state.data.ok && (
          <div className="error-message text-red-700 mt-3">
            {state.data.message}
          </div>
        )}

        {/* Loading Spinner */}
        {state.loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <button
            type="submit"
            className="w-full bg-[#1a8942] text-white p-2 rounded hover:bg-[#215f92] mt-5"
          >
            LOGIN
          </button>
        )}
      </form>
    </div>
  );
};
