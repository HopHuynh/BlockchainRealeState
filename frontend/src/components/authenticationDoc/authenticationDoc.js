import React, { useEffect, useState } from "react";
import "../authenticationDoc/authenticationDoc.css";
import axios from "axios";
import authHeader from "../../services/auth.header";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function AuthenticationDoc() {
  const [files, setFile] = useState("");
  const [Imgs, setImgs] = useState("");
  const [photo, setPhoto] = useState("");
  const [params, setParams] = useSearchParams();
  const [id, setID] = useState();

  useEffect(() => {
    var _id = params.get("id");
    setID(_id);
  }, [params]);

  const projectId = "2OJkN1gP0xrZ7URoleSkvDoIacG";
  const projectSecretKey = "ca0be2c5c14e0a3c64fe2439bb4440a2";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

  const user = useSelector((state) => state?.auth?.user);

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  const [docIds, setDocIds] = useState([]);
  const [imgIds, setImgIds] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
  };
  const handleFileChange = (event) => {
    setFile(event.target.files);
  };
  const handleImgChange = (event) => {
    setImgs(event.target.files);
  };

  const handleSubmitFile = async (event) => {
    event.preventDefault();

    // const formData = new FormData();

    // formData.append("files", files);

    try {
      var temp = [];
      console.log("Debug ====>", files);
      console.log("Debug  ====>", user);
      for (var i = 0; i < files.length; i++) {
        const result = await ipfs.add(files[i]);

        const cid = result.cid;
        const path = result.path;
        console.log("Debug =====> CID, PATH", cid, path);
        temp.push(path);
      }
      setDocIds([...temp]);
      await axios.post("http://localhost:5000/authDocs", {
        urls: [...temp],
        from: user?.roles ? user?.roles : user.username,
        postId: id,
      });
      const res = await axios.post(`http://localhost:5000/notif`, {
        userId: user?.id,
        username: user?.username,
        userWallet: "",
        postId: id,
        type: "Uploaded Docs",
        to: "government",
        detail: `${user?.username} uploaded auth docs for ${id} property`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitImg = async (event) => {
    event.preventDefault();
    // const formData = new FormData();

    // formData.append("img_url", Imgs);
    // console.log("img1", formData);

    try {
      var temp = [];
      for (var i = 0; i < Imgs.length; i++) {
        const result = await ipfs.add(files[i]);

        const cid = result.cid;
        const path = result.path;
        console.log("Debug =====> CID, PATH", cid, path);
        temp.push(path);
      }
      setImgIds([...temp]);
      await axios.post("http://localhost:5000/authImgs", {
        urls: [...temp],
        from: user?.roles ? user?.roles : user.username,
        postId: id,
      });
      const res = await axios.post(`http://localhost:5000/notif`, {
        userId: user?.id,
        username: user?.username,
        userWallet: "",
        postId: id,
        type: "Uploaded Docs",
        to: "government",
        detail: `${user?.username} uploaded auth imgs for ${id} property`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authen">
      <div className="authen-header">
        <h2>Relevant legal papge:</h2>
      </div>

      <div className="authen-body">
        <div className="authen-file">
          <form onSubmit={handleSubmitFile}>
            <input
              className="authen-detail"
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
            />
            <button className="authen-button" onClick={handleSubmitFile}>
              Upload
            </button>
          </form>
        </div>
        <div className="authen-image">
          <p>Choose Image </p>
          <form onSubmit={handleSubmitImg}>
            <input
              className="authen-detail"
              type="file"
              name="img_url"
              multiple
              onChange={handleImgChange}
            />
            <button className="authen-button" onClick={handleSubmitImg}>
              Upload
            </button>
          </form>
          <img src={photo} style={{ width: "400px", height: "200px" }}></img>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationDoc;
