import { useState } from "react";
import { loginApi } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login({ setPage }) {
  const { loginUser } = useAuth();
  const [mode, setMode] = useState("password");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", password: "", otp: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await loginApi(form.email, form.password);
      if (res.token) {
        loginUser(res.token);
        setPage("search");
      } else setError(res.error || "Login failed");
    } catch {
      setError("Server error");
    }
    setLoading(false);
  };
  const sendOtp = async () => {
    if (!form.email) return setError("Enter email first");
    setLoading(true);
    setError("");
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1000);
  };

  const verifyOtp = async () => {
    if (!form.otp) return setError("Enter OTP");
    setLoading(true);
    setTimeout(() => {
      loginUser("demo-token");
      setPage("search");
    }, 1000);
  };

  const handleGoogleLogin = () => {
    alert("Google Login Clicked");
  };

  return (
    <>
      <style>{`
        .login-bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;

          background: linear-gradient(135deg, #2563EB, #4F46E5, #073468);
          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .c1 {
          width: 300px;
          height: 300px;
          background: #93C5FD;
          top: 10%;
          left: 5%;
          animation: float 10s ease-in-out infinite;
        }

        .c2 {
          width: 250px;
          height: 250px;
          background: #2f206c;
          bottom: 10%;
          right: 5%;
          animation: float 12s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          backdrop-filter: blur(20px);
          background: rgba(134, 33, 33, 0.15);
          border-radius: 20px;
          padding: 28px;
          z-index: 2;
          color: white;
        }

        input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: none;
          margin-top: 6px;
          background: rgba(252, 251, 251, 0.52);
          color: white;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          margin-top: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-primary {
          background: linear-gradient(135deg, #2563EB, #4F46E5);
          color: white;
        }

        .btn-google {
          background: linear-gradient(135deg, #ffffffbf, #f0f0f0);
          color: black;
        }

        .switch {
          text-align: center;
          margin-top: 10px;
          cursor: pointer;
          font-size: 14px;
        }

        .divider {
          margin: 20px 0;
          text-align: center;
          font-size: 12px;
          opacity: 0.7;
        }

        .error {
          background: rgb(143, 67, 67);
          padding: 8px;
          border-radius: 6px;
          margin-top: 10px;
        }
      `}</style>

      {/* ===== UI ===== */}
      <div className="login-bg">
        <div className="bg-circle c1"></div>
        <div className="bg-circle c2"></div>
        <div className="login-card">
          <h2 style={{ textAlign: "center" }}>Welcome Back 🚂</h2>
          <button className="btn btn-google" onClick={handleGoogleLogin}>
            Continue with Google
          </button>
          <div className="divider">OR</div>
          {mode === "password" && (
            <>
              <input
                type="email"
                placeholder="Email"
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              <div className="switch" onClick={() => setMode("otp")}>
                Login with OTP
              </div>
            </>
          )}
          {mode === "otp" && (
            <>
              {step === 1 && (
                <>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                  <button className="btn btn-primary" onClick={sendOtp}>
                    Send OTP
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    onChange={e => setForm({ ...form, otp: e.target.value })}
                  />
                  <button className="btn btn-primary" onClick={verifyOtp}>
                    Verify OTP
                  </button>
                </>
              )}
              <div className="switch" onClick={() => { setMode("password"); setStep(1); }}>
                Back to Password Login
              </div>
            </>
          )}
          {error && <div className="error">{error}</div>}

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don't have an account?{" "}
            <span onClick={() => setPage("register")} style={{ cursor: "pointer", fontWeight: "600" }}>
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
