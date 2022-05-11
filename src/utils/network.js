import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://192.168.1.102:1919/" });

const signUp = (email, username, password) => {
  return axiosInstance.post(
    "api/sign/up",
    { email, username, password }
    //{ timeout: 20000 }
  );
};

const verify = (email, code) => {
  return axiosInstance.post(
    "api/sign/verify",
    { email, code }
    //{ timeout: 20000 }
  );
};

const signIn = (email, password) => {
  return axiosInstance.post(
    "api/sign/in",
    { email, password }
    //{ timeout: 20000 }
  );
};

const forgot = (email) => {
  return axiosInstance.post("api/sign/forgot", { email }, { timeout: 3000 });
};

const checkToken = (email, token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.post(
    "api/sign/checktoken",
    { email }
    //{ timeout: 20000 }
  );
};

const getWallets = (email, token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.get(
    `api/wallets/${email}`
    //{ timeout: 3000 }
  );
};

const addWallet = (email, token, { title, type, address }) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.post(
    "api/wallets",
    { email, title, type, address }
    //{ timeout: 10000 }
  );
};

const updateWallet = (email, token, { _id, title, type, address }) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.put(
    "api/wallets",
    { email, _id, title, type, address }
    //{ timeout: 10000 }
  );
};

const deleteWallets = (email, token, walletIds) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.delete("api/wallets", {
    //timeout: 10000,
    data: {
      email,
      walletIds,
    },
  });
};

const getPlans = (email, token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.get(`api/plans/${email}`, {
    //timeout: 10000
  });
};

const addPlan = (
  email,
  token,
  {
    number,
    title,
    dateOfExpiration,
    dateOfPurchase,
    deposit,
    reward,
    percentage,
    status,
    wallet,
    period,
  }
) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.post(
    "api/plans",
    {
      email,
      number,
      title,
      dateOfExpiration,
      dateOfPurchase,
      deposit,
      reward,
      percentage,
      status,
      wallet,
      period,
    }
    //{ timeout: 10000 }
  );
};

const updatePlan = (email, token, { _id, status }) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.put(
    "api/plans",
    { email, _id, status }
    //{ timeout: 10000 }
  );
};

const getBalance = (email, token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.get(
    `api/user/balance/${email}`
    //{ timeout: 10000 }
  );
};

const signAdmin = (username, password) => {
  return axiosInstance.post(
    "api/sign/signadmin",
    { username, password }
    //{ timeout: 20000 }
  );
};

const checkAdmin = (token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.post(
    "api/sign/checkadmin"
    //{ timeout: 20000 }
  );
};

const getAllUsers = (token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.get(
    "api/user/all"
    //{ timeout: 20000 }
  );
};

const getWithdrawHistoryOfUser = (email, token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.get(
    `api/withdraws/${email}`
    //{ timeout: 20000 }
  );
};

const sendToSupport = (email, content) => {
  return axiosInstance.post("api/support", { email, content });
};

const getSupports = (token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.get(
    `api/support`
    //{ timeout: 20000 }
  );
};

const deleteSupport = (token, supportIds) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosInstance.delete("api/support", {
    //timeout: 10000,
    data: {
      supportIds,
    },
  });
};

export {
  signUp,
  verify,
  signIn,
  forgot,
  checkToken,
  getWallets,
  addWallet,
  updateWallet,
  deleteWallets,
  getPlans,
  addPlan,
  updatePlan,
  getBalance,
  signAdmin,
  checkAdmin,
  getAllUsers,
  getWithdrawHistoryOfUser,
  sendToSupport,
  getSupports,
  deleteSupport,
};
