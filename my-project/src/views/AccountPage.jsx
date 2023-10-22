import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { handleProfile, editProfilePhoto } from "../redux/action/userAction";
import { useState, useEffect} from "react";



export default function AccountPage() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [isFileInputVisible, setIsFileInputVisible] = useState(false)
  const [imageUpdated, setImageUpdated] = useState(false);


  const handleCancel = () => {
    setIsFileInputVisible(false);
  };

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

  const handlePhotoUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);
        const response = await editProfilePhoto(formData);
        console.log("Profile photo updated:", response);
        setImageUpdated(true);
        setIsFileInputVisible(false)
        Swal.fire({
          icon: 'success',
          text: `Profile has been updated`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.error("Error updating profile photo:", error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        })
      }
    }
  };

  function handleLogout() {
    localStorage.clear()
    navigate('/')
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Logout successful',
      showConfirmButton: false,
      timer: 1500
    })
  }

  useEffect(() => {
    if (imageUpdated) {
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
  
      setImageUpdated(false);
    }
  }, [imageUpdated]);

  return (
    <div className="flex flex-col items-center gap-5 mt-9">
 <div className="relative">
      <img
        src={userData ? userData.profile_image : '/Profile Photo.png'}
        alt="ProfilePicture"
        className="h-36"
      />
      {isFileInputVisible ? (
        <div className="">
          <input
            type="file"
            name="profile_image"
            className="file-input file-input-bordered w-full max-w-xs mt-5 flex items-center"
            accept=".jpg, .jpeg, .png"
            size={102400}
            onChange={handlePhotoUpload}
          />
          <div className="flex justify-center mt-4">
          <button onClick={handleCancel} className="w-1/4 border border-error mt-2 mr-4 p-2 font-bold text-error text-center rounded">
            Cancel
          </button>
        </div>
        </div>
      ) : (
        <button
          onClick={() => setIsFileInputVisible(true)}
          className="absolute bottom-0 right-3 bg-base-100 border border-black rounded-full w-6 h-6 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      )}
    </div>

      <p className="text-3xl font-bold mb-4">
      {userData ? userData.first_name + " " + userData.last_name : "Loading..."}
      </p>

      <div className="w-1/2">
        <div className="flex flex-col">
          <p className="mb-2 font-bold">Email</p>
          <div className="relative mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
              />
            </svg>
            <input
              type="email"
              value={userData ? userData.email : "Loading..."}
              disabled
              style={{ backgroundColor: "transparent", color: "black" }}
              className="input input-bordered pl-10 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="mb-2 font-bold">Nama Depan</p>
          <div className="relative mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <input
              type="text"
              value={userData ? userData.first_name : "Loading..."}
              disabled
              style={{ backgroundColor: "transparent", color: "black" }}
              className="input input-bordered pl-10 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="mb-2 font-bold">Nama Belakang</p>
          <div className="relative mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <input
              type="text"
              value={userData ? userData.last_name : "Loading..."}
              disabled
              style={{ backgroundColor: "transparent", color: "black" }}
              className="input input-bordered pl-10 w-full"
            />
          </div>
        </div>
      </div>
      <Link to="/edit" className="w-1/2 mt-4 p-2 font-bold text-error border border-error text-center rounded">
        Edit Profile
      </Link>
      <button onClick={handleLogout} className="w-1/2 mt-4 p-2 font-bold text-white bg-error text-center rounded">
        Logout
      </button>
    </div>
  );
}
