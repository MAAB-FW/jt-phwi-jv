import axios from "axios";

export const getUserRole = async (email: string) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-role/${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
