import React, { useState } from "react";
import Layout from "../../components/Layout";

function index() {
  const [name, setName] = useState("");
  const [description,setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState({
    student: false,
    echange_student: false,
    alumni: false,
    personel: false,
    retirement: false,
    templecturer: false,
  });
  const [enable, setEnable] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name && link) {
      //เงื่อนไขอาจจะเหลือแค่เช็คชื่อ
      try {
        let response = await fetch("http://localhost:3000/api/addService", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            description : description,
            image: image,
            role: role,
            link: link,
            enable: enable,
          }),
          headers: {
            Accept: "application/json , text/plain, */*",
            "Content-Type": "application/json",
          },
        });

        response = await response.json();

        setName("");
        setDescription("");
        setLink("");
        setImage("");
        setRole({
          student: false,
          echange_student: false,
          alumni: false,
          personel: false,
          retirement: false,
          templecturer: false,
        });
        setEnable(true);
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

        <div className="form-group"> {/*Description*/}
          <label htmlFor="description">Description</label>
          <textarea
            name="Description"
            cols={20}
            rows={5}
            placeholder="Description of the service"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        
        <div className="form-group"> {/*Link*/}
          <label htmlFor="link">Link</label>
          <textarea
            name="link"
            cols={20}
            rows={1}
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
          <label>Role</label>
          {Object.keys(role).map((r, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={role[r]}
                  onChange={(e) => {
                    setRole((prevRoles) => ({
                      ...prevRoles,
                      [r]: e.target.checked,
                    }));
                  }}
                />
                {r}
              </label>
            </div>
          ))}
        </div>

        <div className="form-group"> {/*Enable*/}
          <label htmlFor="enable">Enable</label>
                <input
                  type="checkbox"
                  checked={enable}
                  onChange={(e) => setEnable(e.target.checked)}
                />
        </div>


        <div className="form-group">
          {/*Submit*/}
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
