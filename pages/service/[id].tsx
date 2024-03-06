import React, { useState } from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Layout from "../../components/Layout";
import { type } from "os";

type PageParams = {
  id: string;
};
type ContentPageProps = {
  post: Post;
};
type Post = {
  _id: string;
  name: string;
  description : string;
  image: string;
  role: { [key: string]: boolean }; // Update the type to object with key-value pairs
  link: string;
  date : Date;
  username : string;
  enable : boolean;
};

type ResponseFromSever = {
  _id: string;
  name: string;
  description : string;
  image: string;
  role: { [key: string]: boolean }; // Update the type to object with key-value pairs
  link: string;
  date : Date;
  username : string;
  enable : boolean;
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> {
  try {
    let response = await fetch(
      "http://localhost:3000/api/getService?id=" + params?.id
    );

    let responseFromSever: ResponseFromSever = await response.json();

    return {
      props: {
        post: {
          _id: responseFromSever._id,
          name: responseFromSever.name,
          description : responseFromSever.description,
          image: responseFromSever.image, //หาประเภทมา
          role: responseFromSever.role, //น่าจะมาแก้เป็น Array เก็บ boolean ทีหลัง
          link: responseFromSever.link,
          date : responseFromSever.date,
          username : responseFromSever.username,
          enable : responseFromSever.enable,
        },
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        post: {
          _id: "",
          name: "",
          description:"",
          image: "", //หาประเภทมา
          role: {
            student: false,
            exchange_student: false,
            alumni: false,
            personel: false,
            retirement: false,
            templecturer: false,
          },
          link: "",
          date : new Date(),
          username : "",
          enable : true,
        },
      },
    };
  }
}

export async function getStaticPaths() {
  let posts = await fetch("http://localhost:3000/api/getServices");

  let postFromServer: [Post] = await posts.json();

  return {
    paths: postFromServer.map((post) => {
      return {
        params: {
          id: post._id,
        },
      };
    }),
    fallback: false,
  };
}
function EditPost({
  post: { _id, name,description, image, role, link, date, username, enable },
}: ContentPageProps) {
  /*
  const [postTitle, setPostTitle] = useState(title);
  const [postContent, setPostContent] = useState(content);
  */
  const [serviceName, setServiceName] = useState(name);
  const [serviceDescription, setServiceDescription] = useState(description);
  const [serviceLink, setServiceLink] = useState(link);
  const [serviceImage, setServiceImage] = useState(image);
  const [serviceRole, setServiceRole] = useState(role);
  const [serviceEnable, setServiceEnable] = useState(enable);
  const [serviceDate, setServiceDate] = useState(date);
  const [serviceUsername, setServiceUsername] = useState(username);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (serviceName && serviceImage) {
      try {
        let response = await fetch(
          "http://localhost:3000/api/editService?id=" + _id,
          {
            method: "POST",
            body: JSON.stringify({
              name: serviceName,
              description : serviceDescription,
              image: serviceImage,
              role: serviceRole,
              link: serviceLink,
              date : serviceDate,
              enable: serviceEnable,
            }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          }
        );
        response = await response.json();
        /*
        setPostTitle("");
        setPostContent("");
        */
        setError("");
        setMessage("Post edited successfully!");
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

        <div className="form-group">
          {/*Name*/}
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name of the post"
            onChange={(e) => setServiceName(e.target.value)}
            value={serviceName ? serviceName : ""}
          />
        </div>

        <div className="form-group"> {/*Description*/}
          <label htmlFor="description">Description</label>
          <textarea
            name="Description"
            cols={20}
            rows={5}
            placeholder="Description of the service"
            onChange={(e) => setServiceDescription(e.target.value)}
            value={serviceDescription ? serviceDescription : "" }
          ></textarea>
        </div>

        <div className="form-group">
          {/*Link*/}
          <label htmlFor="link">Link</label>
          <textarea
            name="link"
            cols={20}
            rows={1}
            placeholder="Link of the service"
            onChange={(e) => setServiceLink(e.target.value)}
            value={serviceLink ? serviceLink : ""}
          ></textarea>
        </div>

        <div className="form-group">
          {/*Image*/}
          <label htmlFor="image">Image</label>
          <input
            name="image"
            type="text"
            placeholder="Image of the service"
            onChange={(e) => setServiceImage(e.target.value)}
            value={serviceImage ? serviceImage : ""}
          />
        </div>

        <div className="form-group"> {/*Role*/}
          <label htmlFor="role">Role</label>
          {Object.keys(serviceRole).map((r, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={serviceRole[r]}
                  onChange={(e) => {
                    setServiceRole((prevRoles) => ({
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

        {/*Date*/}
        <div className="form-group">
          <label htmlFor="Date">Date</label>
          <textarea
            name="Date"
            placeholder="Date will show here"
            value={serviceDate.valueOf()}
            readOnly
          />
        </div>

        <div className="form-group">
          {/*Username*/}
          <label htmlFor="Date">Username</label>
          <textarea
            name="Username"
            placeholder="Username will show here"
            value={serviceUsername}
            readOnly
          />
        </div>

        <div className="form-group"> {/*Enable*/}
          <label>Enable</label>
                <input
                  type="checkbox"
                  checked={serviceEnable}
                  onChange={(e) => setServiceEnable(e.target.checked)}
                />
        </div>

        <div className="form-group">
          <button type="submit" className="submit_btn">
            Update
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

export default EditPost;
