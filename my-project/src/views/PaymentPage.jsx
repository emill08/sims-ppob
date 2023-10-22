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

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
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
          <h1 className="text-white text-3xl font-bold mt-1">Rp {balance ? balance.balance : "Loading..."}</h1>
          <div className="flex items-center mt-4 mr">
            <h3 className="text-white text-sm">Lihat Saldo</h3>
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