import React, { useState } from "react";
import Layout from "../../components/Layout";

function addUser() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [userinfo, setUserinfo] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (username && role) {
      //เงื่อนไขอาจจะเหลือแค่เช็คชื่อ
      try {
        let response = await fetch("http://localhost:3000/api/addUser", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            displayname : displayname,
            role: role,
          }),
          headers: {
            Accept: "application/json , text/plain, */*",
            "Content-Type": "application/json",
          },
        });

        response = await response.json();

        setUsername("");
        setDisplayname("");
        setRole("");
        setUserinfo("");
        setError("");
        setMessage("Service added successfully!");
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required!");
    }
  };

  let handleSearch = async () => {
    // Simulate fetching search results from an API
    // Replace this with your actual API call
    try {
    let response = await fetch(`http://localhost:3000/api/userInfo`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        Accept: "application/json , text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUsername(data.userInfo.username);
    setDisplayname(data.userInfo.displayname)
    setUserinfo(JSON.stringify(data.userInfo));
  }
  catch(e : any){
    setError("error")
  }
}

  return (
    <Layout>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={handleSearch}>Search</button>

      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}

        <div className="form-group">
          {" "}
          {/*Name*/}
          <label htmlFor="username">Name</label>
          <textarea
            name="username"
            placeholder="User info will show here"
            value={userinfo}
            readOnly
          />
        </div>

        <div className="form-group">
          {" "}
          {/*Role*/}
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select...</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div className="form-group">
          {/*Submit*/}
          <button type="submit" className="submit_btn">
            Add User
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

export default addUser;
