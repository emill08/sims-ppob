const baseUrl = "https://take-home-test-api.nutech-integrasi.app/"

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