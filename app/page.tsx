"use client"
import Layout from "../components/Layout";

const getServices = async () => {
  try {
    let response = await fetch("http://localhost:3000/api/management/getServices", { cache: "no-store" });;
    return response.json();
  } catch (e) {
    console.error(e);
  }
}
export default async function Home() {
  const services = await getServices();

  const handleServiceDelete = async (serviceId: string) => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/management/deleteService?id=" + serviceId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occured while deleting", error);
    }
  };

  return (
    <div className="container">

      <Layout>
        <h1>Services</h1>
        {services?.length > 0 ?
          (<ul className="posts-list">
            {services.map((service: any, index: number) => (
              <li key={index} className="post-item">

                <div className="post-item-details">
                  <h2>{service.name}</h2>
                  {service.description}<br />
                  <a href={`${service.link}`}>{service.link}</a><br />
                  <img src={`${service.image}`} alt={`${service.image}`} />
                  <ul>
                    {Object.keys(service.role).map((role, index) => (
                      <li key={index}>
                        {role}: {service.role[role] ? "true" : "false"}
                      </li>
                    ))}
                  </ul>
                  enable : {service.enable ? "true" : "false"}
                </div>

                <div className="post-item-actions">
                  <a href={`/service/${service._id}`}>Edit</a>
                  <button
                    onClick={() => handleServiceDelete(service._id as string)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}</ul>)
          : (<h2 className="posts-body-heading">Ooops ! No posts...</h2>)}
      </Layout>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .posts-body {
          width: 400px;
          margin: 10 px auto;
        }

        .post-body-heading {
          font-family: sans-serif;
        }

        .posts-list {
          list-style: none;
          display: block;
        }

        .post-item {
          width: 100%;
          paddind: 10px;
          border: 1 px solid #d5d5d5;
        }

        .post-item-actions {
          display: flex;
          justify-content: space-between;
        }

        .post-item-actions a {
          text-decoration: none;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

    </div>
  );
}