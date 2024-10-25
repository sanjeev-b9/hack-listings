import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import listings from '../data/listings'; // Mock data

export default function Home() {

  const [listingsData, setListingsData] = useState([]);
  const apiHost = 'http://localhost:5000';

  useEffect(() => {
    axios.get(apiHost+'/api/listings')  // Replace with your API endpoint
      .then(response => {
        setListingsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching listings:', error);
        setListingsData(listings); // Set mock data
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        Header
      </header>
      <main>
        <div>
          <h1>Available Listings</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {listingsData.map((listing) => (
              <div key={listing.id} style={{ margin: '20px', width: '300px', border: '1px solid #ddd', padding: '10px' }}>
                <img src={listing.imageUrl} alt={listing.title} style={{ width: '100%' }} />
                {/* <Image
                  src={listing.imageUrl} 
                  alt={listing.title}
                  width={500}
                  height={300}
                /> */}
                <h2>{listing.title}</h2>
                <p>{listing.description}</p>
                <p><strong>{listing.date}</strong></p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer>
        Footer
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
          header {
          width: 100%;
          height: 100px;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
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
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
