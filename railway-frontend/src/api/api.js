const API = "http://127.0.0.1:8000";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.token || null;
};

const authHeaders = () => ({
  "Content-Type": "application/json",
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
});

const post = async (url, data) => {
  const res = await fetch(`${API}${url}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
};

const get = async (url) => {
  const res = await fetch(`${API}${url}`, { method: "GET", headers: authHeaders() });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
};

const del = async (url) => {
  const res = await fetch(`${API}${url}`, { method: "DELETE", headers: authHeaders() });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
};

export const loginApi         = (email, password) => post("/login", { email, password });
export const registerApi      = (data)             => post("/register", data);
export const searchTrainApi   = (data)             => post("/user/get_train", data);
export const bookSeatApi      = (data)             => post("/user/book_seat", data);
export const myBookingsApi    = ()                 => get("/user/my_bookings");
export const cancelBookingApi = (booking_id)       => post("/user/cancel_booking", { booking_id });
export const addTrainApi      = (data)             => post("/admin/add_train", data);
export const allTrainsApi     = ()                 => get("/admin/all_trains");
export const deleteTrainApi   = (id)               => del(`/admin/delete_train/${id}`);