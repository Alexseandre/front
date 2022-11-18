import React, { useState, useContext } from "react";
import { UidContext } from "../../AppContext";
import axios from "axios";
import "./Profil.css";
export default function PutProfil() {
  const [dataEmail, setDataEmail] = useState();
  const [toggle, setToggle] = useState(false);
  const [imgRead, setImgRead] = useState();
  const [files, setFiles] = useState();
  const actualUser = useContext(UidContext);

  const putProfil = async () => {
    let formData = new FormData();
    files && formData.append("image", files);
    dataEmail && formData.append("email", dataEmail);
    axios({
      method: "PUT",
      url: "https://ancient-depths-14793.herokuapp.com/api/update/profil",
      data: formData,
      withCredentials: true,
    })
      .then((x) => {
        console.log(x);
        window.location.replace("http://localhost:3001");
      })
      .catch((err) => alert(err.response.data.message));
  };
  // ***********************************************************************************
  const deleteUser = async () => {
    alert("Voulez-vous vraiment supprimer votre compte?");
    axios({
      method: "DELETE",
      url: `https://ancient-depths-14793.herokuapp.com/api/delete/user`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        window.location.replace("http://localhost:3001/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profil-box">
      <div className="profil-box2">
        <div className="form-div">
          <div className="title-profil">
            <h2>Bonjour {actualUser.data.pseudo}</h2>
            <div
              className={
                toggle
                  ? "img-container-profil "
                  : "img-container-profil display-none"
              }
            >
              <img src={imgRead} alt="profil" />
            </div>
            <div
              className={
                toggle
                  ? "img-container-profil display-none"
                  : "img-container-profil"
              }
            >
              <img src={actualUser.data.imageUrl} alt="profil" />
            </div>
          </div>
          <p>Adresse email :</p>
          <input
            className="input-profil"
            type="text"
            onChange={(x) => {
              setDataEmail(x.target.value);
            }}
            placeholder={actualUser.data.email}
          />

          <div className="btn-profil">
            <input
              id="file-input"
              className="input-files-profil"
              onChange={(e) => {
                const file = e.target.files[0];
                setFiles(file);
                const img = URL.createObjectURL(e.target.files[0]);
                setImgRead(img);
                setToggle(true);
              }}
              type="file"
            />
            <label className="label-profil-pblm" htmlFor="file-input">
              <span className="submit-btn-profil">
                {" "}
                Joindre une photo de profil
              </span>
            </label>
            <span onClick={putProfil} className="submit-btn-profil">
              Sauvegarder
            </span>
          </div>
          <button onClick={deleteUser} className="why-not">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}
