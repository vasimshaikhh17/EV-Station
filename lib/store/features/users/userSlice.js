import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    user: null,
    isLoading:false,
    error:null
}

export const login = createAsyncThunk(
    'auth/login',
    async({formData,router},{rejectWithValue})=>{
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });        
              if (!response.ok) {
                const errorData = await response.json();
                toast.error("Invalid Password")
                throw new Error(errorData.message || 'Login failed');
              }        
              const data = await response.json();            
              if(data.success){
                toast.success("Login Success")
                sessionStorage.setItem('auth',JSON.stringify(data))
                router.push('/')
              }
              return data; 
        } catch (error) {
            return rejectWithValue(error.message); 
        }
    }
)

export const signup = createAsyncThunk(
    'auth/register',
    async ({ formData, router }, { rejectWithValue }) => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          toast.error("Signup failed")
          throw new Error('Signup failed');
        }
  
        const data = await response.json();
        console.log('data: ', data);
        if (data.success) {
          toast.success("Account Created Successfully,Please verify your email")
          const email = data.result.email
          router.push(`/auth/verify-email/?email=${email}`)        
        }
  
        return data;
      } catch (error) {
        console.log('error: ', error);
        return rejectWithValue(error); // Return error message on failure
      }
    }
  );    

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
        .addCase(login.pending,(state)=>{
            state.isLoading = true;
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload; // Store user data on successful login
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; // Store error message on failure
        });

      // Signup cases
      builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Store user data on successful signup
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store error message on failure
      });
  }
})

// Action creators are generated for each case reducer function
// export const { signupStart, signupSuccess, signupFailure } = authSlice.actions;
export default authSlice.reducer    