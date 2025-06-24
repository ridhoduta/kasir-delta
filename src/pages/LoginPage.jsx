import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// import '../login.css';
import { getUser } from '../api/authService';



const LoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
     // State untuk loading
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
         // Mulai loading
        
        try {
            await login({ name, password, device_name: "ReactApp" });
            const user = await getUser(); // dari authService
            
            if (user.role_id === 1) navigate('/home');
            else if (user.role_id === 2) navigate('/pesanan');
            else if (user.role_id === 3) navigate('/beranda-owner');
        } catch (err) {
            alert('Login gagal: ' + err.message);
        } 
    };

    if (user) {
        return (
            <div className="spinner-overlay">
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <div className="loading-text">Mengalihkan...</div>
                    <div className="user-info">Halo, {user.name}</div>
                </div>
                <a href="">Halo</a>
            </div>
            
        );
    }

    return (
        <>
            {/* <div className="body-login">
                <div className="login-container">
            
                    <div className="logo-container">
                        <div className="logo-shape">
                            <div className="logo-text-login">
                                <div className="welcome-text">Selamat Datang</div>
                                <div className="company-name">Delta Konveksi</div>
                            </div>
                            <div className="decorative-dots dot-1-login"></div>
                            <div className="decorative-dots dot-2-login"></div>
                            <div className="decorative-dots dot-3-login"></div>
                        </div>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-input" 
                                placeholder="Username" 
                                id="username" 
                                required 
                                value={name} 
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-input" 
                                id="password" 
                                required 
                                placeholder="Password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                // Disable saat loading
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="login-button"
                            
                        >
                            Masuk
                        </button>
                    </form>
                </div>
            </div> */}
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] overflow-hidden px-4">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl w-full max-w-xl scale-[1.1] text-center flex flex-col justify-center">

        {/* Logo Section */}
        <div className="relative mb-10 inline-block px-10 py-8">
          {/* Background shapes */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-400 rounded-[50px_20px_40px_30px] rotate-[-2deg] -z-10"></div>
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-yellow-100 to-yellow-200 rounded-[60px_25px_45px_35px] opacity-70 -z-20"></div>

          {/* Logo Text */}
          <div className="relative z-10 text-gray-800">
            <div className="text-lg font-bold mb-1">Selamat Datang</div>
            <div className="text-3xl md:text-4xl font-bold italic text-[#2c3e50]">Delta Konveksi</div>
          </div>

          {/* Dots */}
          <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -top-2 left-5"></div>
          <div className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full top-5 -right-4"></div>
          <div className="absolute w-2.5 h-2.5 bg-yellow-300 rounded-full -bottom-2 -left-2"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-6 text-left">
            <input
              type="text"
              placeholder="Username"
              id="username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-gray-200 rounded-full text-base focus:outline-none focus:bg-gray-300 focus:ring-4 focus:ring-yellow-300 placeholder:text-sm placeholder:text-gray-600"
            />
          </div>

          <div className="mb-6 text-left">
            <input
              type="password"
              placeholder="Password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-200 rounded-full text-base focus:outline-none focus:bg-gray-300 focus:ring-4 focus:ring-yellow-300 placeholder:text-sm placeholder:text-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-br from-yellow-300 to-yellow-400 text-gray-800 font-bold text-lg rounded-full shadow-lg hover:from-yellow-200 hover:to-yellow-300 transform hover:-translate-y-1 transition"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
            
        </>
    );
};

export default LoginPage;