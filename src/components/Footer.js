import React from 'react'; 
import classes from './Footer.module.css';

function Footer() {
  return (
    <div className={classes.wrapper}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <footer className={classes.footer}>
        <h6 className={classes.footerText}>this is a footer</h6>
      </footer>
    </div>
  );
}

export default Footer;
