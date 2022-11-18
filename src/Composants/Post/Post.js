import { UidContext } from "../../AppContext";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import Loading from "../Loading/Loading";
import CreatePost from "./CreatePost";
import PutAdmin from "./PutAdmin";
import InfoSupp from "./InfoSupp";
import Avatar from "./Avatar";
import axios from "axios";
import Put from "./Put";
import "./Post.css";

export default function Post() {
  const connected = useContext(UidContext);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [toggleComment, setToggleComment] = useState();
  const toggleFunc = () => {
    setToggleComment(!toggleComment);
  };

  const fetchData = async () => {
    const res = await axios
      .get("https://ancient-depths-14793.herokuapp.com/api/posts", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.data);
      })
      .then(() => setToggle(false))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="containers-home">
      {connected.connect ? (
        <CreatePost fetch={fetchData} />
      ) : (
        <NavLink className="connected-post" to="/login">
          Connectez-vous pour pouvoir poster
        </NavLink>
      )}
      {toggle && <Loading />}
      {data.map((x, index) => {
        const newData = new Date(x.created);
        const dateFr = newData.toLocaleDateString("fr");
        return (
          <section className="post" key={x.postId}>
            <Avatar user={x.userId} />
            <article className="post-p">
              {connected.data.id == x.userId && (
                <Put connect={connected} fetch={fetchData} x={x} />
              )}
              {connected.data.admin == 1 && (
                <PutAdmin fetch={fetchData} x={x} />
              )}
              <p>{x.post}</p>
              <div
                className="img-box"
                onClick={(_) => {
                  window.open(x.imageUrl);
                }}
              >
                {x.imageUrl && <img src={x.imageUrl} alt="" />}
              </div>
            </article>
            <InfoSupp post={x} connected={connected} dateFr={dateFr}></InfoSupp>
          </section>
        );
      })}
    </div>
  );
}
