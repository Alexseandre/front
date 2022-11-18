import React, { useEffect, useState } from "react";
import Like from "./Like";
import axios from "axios";

export default function InfoSupp(props) {
  const [data, setData] = useState();
  const fetchComment = async () => {
    const res = await axios
      .get(
        `https://ancient-depths-14793.herokuapp.com/api/comments/${props.post.postId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setData(res.data.data);
      })

      .catch((err) => console.log("a"));
  };
  useEffect(() => {
    fetchComment();
  }, []);
  const [toggle, setToggle] = useState();
  const toggleFunc = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <div className="container-info-supp">
        <p className="date">{props.dateFr}</p>
        <Like postId={props.post.postId} connect={props.connected}></Like>
      </div>
    </div>
  );
}
