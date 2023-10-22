import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchServices, handleProfile, getBalance, postPayment } from "../redux/action/userAction"; 
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceTariff, setSelectedServiceTariff] = useState("");
  const [serviceCode, setServiceCode] = useState(null);
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevVisibility) => !prevVisibility);
  };

  
  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        const response = await fetchServices();
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchServiceList();
  }, []);

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

  useEffect(() => {
    const selectedServiceObject = services.find(
      (service) => service.service_name === selectedService
    );
    if (selectedServiceObject) {
      setSelectedServiceTariff(selectedServiceObject.service_tariff);
      setServiceCode(selectedServiceObject.service_code);
    } else {
      setSelectedServiceTariff("");
      setServiceCode(null); 
    }
  }, [selectedService, services]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (serviceCode) {
      try {
        const topUpData = { service_code: serviceCode };
        await dispatch(postPayment(topUpData)); 
        navigate('/home');
        Swal.fire({
          icon: 'success',
          title: `Pembayaran ${topUpData.service_code} telah berhasil`,
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500
        });
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

        {/* mini profile */}
        <div className="flex flex-col">
          <img
            src={userData ? userData.profile_image : '/Profile Photo.png'}
            alt="ProfilePicture"
            className="w-16 h-16"
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
     <form onSubmit={handlePayment} className="mt-16 flex flex-col">
        <p className="font-semibold pl-4 mb-3">Pembayaran</p>
        <select
          className="select w-full max-w-xs"
          onChange={(e) => setSelectedService(e.target.value)}
          value={selectedService}
        >
          <option disabled value="">Pilih layanan</option>
          {services.map((service) => (
            <option key={service.service_code} value={service.service_name}>
              {service.service_name}
            </option>
          ))}
        </select>
        <div className="flex flex-row mt-6">
          <div className="w-full pr-4">
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
                className="w-full pl-10 p-2 mt-2 border border-gray-300 rounded"
                value={selectedServiceTariff}
                readOnly
              />
            </div>
            <button type="submit" className="w-full mt-4 p-2 text-white text-center bg-error rounded">
              Bayar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}