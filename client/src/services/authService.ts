import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
// const API_BASE_URL = "http://localhost:3000";



const authService = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    culturalProfile: {
      state: string;
      city: string;
      primaryLanguages: string[];
      regionalLanguages?: string[];
      bio: string;
      culturalInterests: string[];
      artForms: string[];
    };
    learningPreferences: {
      interestedStates: string[];
      learningGoals: string[];
      teachingSkills: string[];
    };
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
