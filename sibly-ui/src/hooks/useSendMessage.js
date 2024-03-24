import { useState } from "react";
import axios from "axios";
import { API } from "../utils/server";
import Cookies from "js-cookie";
import decryptMessage from "../utils/DecryptMessage";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("sibly_user");

  const sendMessage = async (message, id) => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${API}/chat/send-message/${id}`,
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
      if (result.data.success == "sent"){
        //We should decrypt here as well
        const message = result.data;
        console.log(message);
      }
      console.log(result)

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
