import React, { useState } from "react";
import Layout from "../../components/Layout";

function index() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name && link) { //เงื่อนไขอาจจะเหลือแค่เช็คชื่อ
      try {
        let response = await fetch("http://localhost:3000/api/addService", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            image: image,
            role: role,
            link: link,


          }),
          headers: {
            Accept: "application/json , text/plain, */*",
            "Content-Type": "application/json",
          },
        });

        response = await response.json();

        setName("");
        setLink("");
        setImage("");
        setRole("");
        setError("");
        setMessage("Service added successfully!");
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required!");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}

        <div className="form-group"> {/*Name*/}
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name of the post"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="form-group"> {/*Link*/}
          <label htmlFor="link">Link</label>
          <textarea
            name="link"
            cols={20}
            rows={8}
            placeholder="Link of the service"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          ></textarea>
        </div>

        <div className="form-group"> {/*Image*/}
          <label htmlFor="image">Image</label>
          <input
            name="image"
            type="text"
            placeholder="Image of the service"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </div>

        <div className="form-group"> {/*Role*/}
          <label htmlFor="role">Role</label>
          <input
            name="role"
            type="text"
            placeholder="Role of the post"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          />
        </div>

        <div className="form-group"> {/*Submit*/}
          <button type="submit" className="submit_btn">
            Add Service
          </button>
        </div>
      </form>

      <style jsx>
        {`
          .form {
            width: 400px;
            margin: 10 px auto;
          }
          .form-group {
            width: 100 %;
            margin-bpttom: 10 px;
            display: block;
          }
          .form-group label {
            display: block;
            margin-bottom: 10 px;
          }
          .form-group input[type="text"] {
            paddind: 10px;
            width: 100%;
          }
          .form-group textarea {
            padding: 10px;
            width: 100%;
          }

          .alert-error {
            width: 100%;
            color: red;
            margin-bottom: 10px;
          }

          .alert-message {
            width: 100%;
            color: green;
            margin-bottom: 10px;
          }
        `}
      </style>
    </Layout>
  );
}

export default index;