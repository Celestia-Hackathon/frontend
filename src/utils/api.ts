import { User } from "./types";

const fetchPosts = async () => {
    try {
      const response = await fetch("https://chatspace-backend.vercel.app/api/get-posts");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("error getting posts data");
        return [];
      }
    } catch (error) {
      console.error(error);
        return [];
    }
};

const fetchUserData = async () => {
    try {
      const response = await fetch("https://chatspace-backend.vercel.app/api/get-users");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("error getting users data");
        return {} as User;
      }
    } catch (error) {
      console.error(error);
      return {} as User;
    }
};

const fetchQuests = async () => {
    try {
      const response = await fetch("https://chatspace-backend.vercel.app/api/get-quests");
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data;
      } else {
        console.error("error getting quests data");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
};

export const api = {
    fetchPosts,
    fetchUserData,
    fetchQuests
}
