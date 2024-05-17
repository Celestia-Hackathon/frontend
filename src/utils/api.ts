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

const addQuestReward = async (userId: string, questId: string, reward : number) => {
  try {
    const response = await fetch(`https://chatspace-backend.vercel.app/api/add-quest-reward/${userId}/${questId}/${reward}`);
    if(response.ok) {
      console.log("Quest reward added");
      return 200;
    }
  } catch(err) {
    console.log(err);
    return 400;
  }
}

const assignQuest = async (userId: string, questId : string) => {
  try {
    const response = await fetch(`https://chatspace-backend.vercel.app/api/apply-for-quest/${userId}/${questId}`);
    if(response.status == 200) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        return 200;
    } else if(response.status == 404) {
        return 404;
    }
  } catch(err) {
    console.log(err);
    return 400;
  }
}

const updateUserInfo = async(address : string) => {
  try {
    const response = await fetch('https://chatspace-backend.vercel.app/api/get-user/' + address);
    if(response.status == 200) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        return 200;
    } else if(response.status == 404) {
        return 404;
    }
  } catch(err) {
    console.log(err);
    return 400;
  }
}

export const api = {
    fetchPosts,
    fetchUserData,
    fetchQuests,
    addQuestReward,
    assignQuest,
    updateUserInfo
}
