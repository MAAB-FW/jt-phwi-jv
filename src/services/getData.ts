import axios from "axios";

export const getUserInfo = async (email: string) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-info/${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
