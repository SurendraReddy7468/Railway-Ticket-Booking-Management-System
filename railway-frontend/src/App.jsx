import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar    from "./components/Navbar";
import Home      from "./pages/Home";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Search    from "./pages/SearchTrains";
import Bookings  from "./pages/Bookings";
import Admin     from "./pages/Admin";
import PNRStatus from "./pages/PNRStatus";

export default function App() {
  const [page, setPage] = useState("home");

  const render = () => {
    switch (page) {
      case "login":    return <Login    setPage={setPage} />;
      case "register": return <Register setPage={setPage} />;
      case "search":   return <Search />;
      case "bookings": return <Bookings />;
      case "admin":    return <Admin />;
      case "pnr":      return <PNRStatus />;
      default:         return <Home setPage={setPage} />;
    }
  };

  return (
    <AuthProvider>
      <Navbar setPage={setPage} currentPage={page} />
      {render()}
    </AuthProvider>
  );
}