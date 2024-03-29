import {API_KEY, URL_STRING} from "../../constant/config";

const headers = {
  'Content-Type': 'application/json',
  apikey: API_KEY,
};
// LOGIN WITH USERNAME
export const getLoginMobile = async (username) => {
  const response = await fetch(`${URL_STRING}/authuser/login-username`, {
    method:'POST',
    headers,
    body: JSON.stringify({
      username,
    }),
  });
  const data = await response.json();
  return data
};
// LOGIN WITH PASSWORD BY USING USERNAME
export const getLoginPassword = async (username, password) => {
  const response = await fetch(`${URL_STRING}/authuser/login-password`, {
    method:'POST',
    headers,
    body: JSON.stringify({username, password}),
  });
  const data = await response.json();
  return data
};
// SIGNUP STEP - 1
export const getSignupUsername = async (mobile, email) => {
  const response = await fetch(`${URL_STRING}/authuser/signup-username`, {
    method:'POST',
    headers,
    body: JSON.stringify({
      email, mobile
    }),
  });
  const data = await response.json();
  return data;
};
// SIGNUP STEP - 1 - VERIFY OTP
export const getVerifyOTP = async (mobile, otp) => {
  const response = await fetch(`${URL_STRING}/authuser/otpverify`, {
    method:'POST',
    headers,
    body: JSON.stringify({
      otp,
      mobile,
    }),
  });
  const data = await response.json();
  return data;
};
// SIGNUP STEP - 2
export const getSignupPassword = async (mobile, password) => {
  const response = await fetch(`${URL_STRING}/authuser/set-password`, {
    method:'POST',
    headers,
    body: JSON.stringify({
      mobile, password
    }),
  });
  const data = await response.json();
  return data;
};

export const getSignupProfile = async (mobile, name, gender, dob) => {
  const response = await fetch(`${URL_STRING}/authuser/set-profile`, {
    method:'POST',
    headers,
    body: JSON.stringify({
      mobile, name, gender, dob
    }),
  });
  const data = await response.json();
  return data;
};
// FORGOT PASSWORD SEND OTP
export const getResendOTP = async (mobile) => {
  const response = await fetch(`${URL_STRING}/authuser/resendotp`, {
    method:'POST',
    headers,
    body: JSON.stringify({
      mobile,
    }),
  });
  const data = await response.json();
  return data;
};
// FORGOT PASSWORD VERIFY OTP
export const getForgotOtpVerify = async (mobile, otp) => {
  const response = await fetch(`${URL_STRING}/authuser/forgototpverify`, {
    method:'POST',
    headers,
    body: JSON.stringify({
      otp,
      mobile,
    }),
  });
  const data = await response.json();
  return data;
};
// FORGOT PASSWORD VERIFY OTP
export const getForgotChangePassword = async (mobile, password, cpassword) => {
  const response = await fetch(`${URL_STRING}/authuser/resetpassword`, {
    method:'POST',
    headers,
    body: JSON.stringify({
      mobile,
      password,
      cpassword,
    }),
  });
  const data = await response.json();
  return data;
};