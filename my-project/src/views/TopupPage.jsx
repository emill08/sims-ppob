import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getBalance, addBalance, handleProfile } from "../redux/action/userAction";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function TopupPage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [manualAmount, setManualAmount] = useState(null);
  const [balance, setBalance] = useState(0)
  const [data, setData] = useState({top_up_amount: 0});
  const [userData, setUserData] = useState(null)
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevVisibility) => !prevVisibility);
  };


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAmountSelect = (amount) => {
    setSelectedAmount((prevAmount) => (prevAmount === amount ? null : amount));
    setManualAmount(null);
    setData({ top_up_amount: amount })
  };

  const handleManualAmountChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setManualAmount(isNaN(amount) ? null : amount);
    setData({ top_up_amount: amount })
  };

  const isButtonDisabled = selectedAmount === null && manualAmount === null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await handleProfile();
        console.log(profile, 'ini profile');
        setUserData(profile.data);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };
  
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        console.log(response, 'ini di useEffect');
        setBalance(response.data);
      } catch (error) {
        console.error("Error di useEffect:", error.message);
      }
    };
  
    fetchBalance();
  }, []);

  const handleTopup = async (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      try {
        const topUpData = { top_up_amount: data.top_up_amount };
        dispatch(addBalance(data))
  
        const response = getBalance();
        setBalance(response.data);
  
        setSelectedAmount(null);
        setManualAmount(null);
        navigate("/home")

        Swal.fire({
          icon: 'success',
          title: `Top Up with an amount of ${topUpData.top_up_amount} was successful`,
          showConfirmButton: false,
          timer: 1500
        })

      } catch (error) {
        console.error("Error during top-up:", error.message);
        Swal.fire({
          icon: 'error',
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  };

  const formatToIDR = (amount) => {
    if (typeof amount !== "number") {
      return "Loading...";
    }
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(amount);
  };

  
  

  return (
    <div className="flex flex-col mt-9 gap-3 mx-44">
      <div className="flex flex-row justify-between">
        {/* mini profiler */}
        <div className="flex flex-col">
          <img
            src={userData ? userData.profile_image : '/Profile Photo.png'}
            alt="ProfilePicture"
            className="h-20"
          />
          <h3 className="text-2xl mt-3">Selamat datang,</h3>
          <h1 className="text-3xl font-bold">{userData ? userData.first_name + " " + userData.last_name : "Loading..."}</h1>
        </div>

        {/* saldo */}
        <div className="px-5 py-6 flex flex-col bg-[url('/Background%20Saldo.png')] bg-cover bg-center w-[670px] h-[161px]">
          <h3 className="text-white text-md mt-3">Saldo anda</h3>
          {isBalanceVisible ? (
            <h1 className="text-white text-3xl font-bold mt-1">
              {formatToIDR(balance ? balance.balance : "Loading...")}
            </h1>
          ) : (
            <h1 className="text-white text-3xl font-bold mt-1">●●●●●●●●</h1>
          )}
          <div className="flex items-center mt-4 mr">
            <button
              className="text-white text-sm bg-red-500"
              onClick={toggleBalanceVisibility}
            >
              {isBalanceVisible ? (
                <div className="flex items-center">
                  <p className="mr-1">Lihat Saldo</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="mr-1">Tutup Saldo</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* TOP UP */}
      <form onSubmit={handleTopup} className="mt-16 flex flex-col">
        <p className="font-semibold">Silahkan masukkan</p>
        <p className="font-bold text-4xl">Nominal Top Up</p>
        <div className="flex flex-row mt-6">
          <div className="w-1/2 pr-4">
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" mt-1 w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
              <input
                type="number"
                name="top_up_amount"

                placeholder="Masukkan nominal Top Up"
                className="w-full pl-10 p-2 mt-2 border border-gray-300 rounded"
                value={manualAmount || ""}
                onChange={handleManualAmountChange}
                min="10000"
                max="1000000"
              />
            </div>
            <button type="submit"
              className={`w-full mt-4 p-2 text-white text-center rounded ${
                isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-error"
              }`}
              disabled={isButtonDisabled}
            >
              Top Up
            </button>
          </div>
          <div className="w-1/2 pl-4">
            <div className="flex flex-wrap -mx-1">
              {[10000, 20000, 50000, 100000, 250000, 500000].map(
                (amount, index) => (
                  <div
                    key={index}
                    className={`px-2 py-2 w-1/4 mt-2`}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "0.25rem",
                      marginLeft: "0.5rem",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                      background: selectedAmount === amount ? "#ccc" : "white",
                    }}
                    onClick={() => handleAmountSelect(amount)}
                  >
                    {"Rp. " + amount}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
