import React, { useState } from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Layout from "../../components/Layout";
import { type } from "os";

type PageParams = {
  id: String;
};
type ContentPageProps = {
  post: Post;
};
type Post = {
  _id: String;
  title: String;
  comment: String;
};

type ResponseFromSever = {
  _id: String;
  title: String;
  content: String;
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> {
  try {
    let response = await fetch(
      "http://localhost:3000/api/getPost?id=" + params?.id
    );

    let responseFromSever: ResponseFromSever = await response.json();

    return {
      props: {
        post: {
          _id: responseFromSever._id,
          title: responseFromSever.title,
          content: responseFromSever.content,
        },
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        post: {
          _id: "",
          title: "",
          content: "",
        },
      },
    };
  }
}

export async function getStaticPaths() {
  let posts = await fetch("http://localhost:3000/api/getPosts");

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
function EditPost({ post: { _id, title, content } }: ContentPageProps) {
  const [postTitle, setPostTitle] = useState(title);
  const [postContent, setPostContent] = useState(content);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (postTitle && postContent){
      try{
        let response =await fetch("http://localhost:3000/api/editPost?id=" + _id, 
        {
          method:"POST",
          body: JSON.stringify({
            title: postTitle,
            content: postContent
          }),
          headers:{
            Accept: "application/json, text/plain, */*",
            "Content-Type":"application/json"
          }
        })
        response = await response.json();
        /*
        setPostTitle("");
        setPostContent("");
        */
        setError("");
        setMessage("Post edited successfully!");

      }
      catch(errorMessage:any){
        setError(errorMessage)
      }
    }
    else{
      return setError("All fields are required!")
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title of the post"
            onChange={(e) => setPostTitle(e.target.value)}
            value={postTitle ? postTitle : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            cols={20}
            rows={8}
            placeholder="Comtent of the post"
            onChange={(e) => setPostContent(e.target.value)}
            value={postContent ? postContent : ""}
          ></textarea>
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
