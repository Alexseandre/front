import "./PutDelet.css";
import axios from "axios";
import { useState } from "react";

export default function PutDelet(props) {
  const [toggle, setToggle] = useState(false);
  const [modifInput, setModifInput] = useState();
  const toggleFunc = () => {
    setToggle(!toggle);
  };
  const deletePost = async () => {
    alert("Voulez-vous vraiment supprimer votre post?");
    axios({
      method: "DELETE",
      url: `https://ancient-depths-14793.herokuapp.com/api/delete/post/${props.x.postId}`,
      withCredentials: true,
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const modifyPost = async () => {
    axios({
      method: "PUT",
      url: `https://ancient-depths-14793.herokuapp.com/api/post/update/${props.x.postId}`,
      data: {
        post: modifInput,
      },
      withCredentials: true,
    })
      .then((res) => {
        setToggle(false);
        props.fetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={
        props.connect.data.admin == 0 ? "box-put" : "display-admin-none"
      }
    >
      {toggle && (
        <textarea
          onChange={(e) => {
            setModifInput(e.target.value);
          }}
          cols="30"
          maxLength="290"
          rows="5"
          className="modif-input"
          defaultValue={props.x.post}
        ></textarea>
      )}
      <p onClick={toggleFunc} className="modifier">
        <i className="fas fa-edit"></i>
      </p>
      <p onClick={deletePost} className="supprimer">
        X
      </p>
      {toggle && (
        <button className="modifier-btn">
          <i onClick={modifyPost} className="fas fa-arrow-right"></i>
        </button>
      )}
    </div>
  );
}
