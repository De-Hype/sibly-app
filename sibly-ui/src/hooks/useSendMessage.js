import { useState } from "react";
import axios from "axios";
import { API } from "../utils/server";
import Cookies from "js-cookie";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("sibly_user");

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${API}/chat/send-message/${"jsjssh"}`,
        {
          //Message body will be passed here
          message:message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = result.json();

      setM

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
