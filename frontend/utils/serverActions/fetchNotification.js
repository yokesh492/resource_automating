import axios from "axios";

const fetchNotifications = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCTION}/notifications`
    );
    if (res.status !== 200) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchNotifications;
