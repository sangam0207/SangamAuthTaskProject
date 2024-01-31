import React from 'react';
import { Link } from 'react-router-dom'; 
import  image from '../image/not-found.svg'
const Error = () => {
  return (
    <div style={styles.container}>
      <img src={image} alt="Not Found" style={styles.image} />
      <h1 style={styles.text}>Oops! Something went wrong.</h1>
      <Link to="/" style={styles.link}>
        <button style={styles.button}>Back to Home</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    height:'50%',
    marginBottom: '20px',
  },
  text: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff', // You can customize the color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Error;
