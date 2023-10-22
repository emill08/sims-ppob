const baseUrl = "https://take-home-test-api.nutech-integrasi.app"

export function postRegister(data) {
    return async () => {
      try {
        const response = await fetch(`${baseUrl}/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }
  
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        throw new Error(error.message || 'Registration failed');
      }
    };
  }
  
  export function postLogin(data) {
    return async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
  
        const responseData = await response.json();
        localStorage.setItem("token", responseData.data.token);
        return responseData;
      } catch (error) {
        throw new Error(error.message || 'Login failed');
      }
    };
  }

  export async function handleProfile() {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${baseUrl}/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in userAction:", error.message);
      throw error;
    }
  }

  export async function getBalance() {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${baseUrl}/balance`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch balance data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in userAction:", error.message);
      throw error;
    }
  }


  export function addBalance(data) {
    return async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(`${baseUrl}/topup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'topup failed');
        }
  
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        throw new Error(error.message || 'topup failed');
      }
    };
  }

  export function editProfile(data) {
    return async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(`${baseUrl}/profile/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'update profile failed');
        }
        
        handleProfile()
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        throw new Error(error.message || 'update profile failed');
      }
    };
  }

  export async function fetchHistory(offset, limit) {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${baseUrl}/transaction/history?offset=${offset}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch history");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in userAction:", error.message);
      throw error;
    }
  }


  export async function editProfilePhoto(formData) {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${baseUrl}/profile/image`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      handleProfile()
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update profile photo failed");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(error.message || "Update profile photo failed");
    }
  }
  
  export async function fetchServices() {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${baseUrl}/services`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch services");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in userAction:", error.message);
      throw error;
    }
  }

  export function postPayment(data) {
    return async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(`${baseUrl}/transaction`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'payment failed');
        }
        const responseData = await response.json();
        getBalance()
        return responseData;
      } catch (error) {
        console.log(error, 'ini error');
        throw new Error(error.message || 'Payment failed')
      }
    };
  }