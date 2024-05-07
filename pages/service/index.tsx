import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react"
function index() {
  let d = new Date();

  const { data: session, status } = useSession()
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      setUsername(session.user.name);
    }
  }, [status, session]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState<RoleType>({
    student: false,
    exchange_student: false,
    alumni: false,
    personel: false,
    retirement: false,
    templecturer: false,
  });
  const [date, setDate] = useState(d.toString());
  const [enable, setEnable] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  interface RoleType {
    [key: string]: boolean;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name && link) {
      //เงื่อนไขอาจจะเหลือแค่เช็คชื่อ
      try {
        let response = await fetch("http://localhost:3000/api/management/addService", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            description: description,
            image: image,
            role: role,
            link: link,
            date: date,
            username: username,
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
          exchange_student: false,
          alumni: false,
          personel: false,
          retirement: false,
          templecturer: false,
        });
        d = new Date();
        setDate(d.toString());
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
            placeholder="Name of the Service"
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

        <div className="form-group">
          {/*Date*/}
          <label htmlFor="Date">Date</label>
          <textarea
            name="Date"
            placeholder="Date will show here"
            value={date}
            readOnly
          />
        </div>

        <div className="form-group">
          {/*Username*/}
          <label htmlFor="Date">Username</label>
          <textarea
            name="Username"
            placeholder="Username will show here"
            value={username}
            readOnly
          />
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
