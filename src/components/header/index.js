import React from 'react';
import { Link } from 'gatsby';
import NavBar from './components/nav-bar/';
import SocialLinks from './components/social-links/';
import styles from './styles.module.css';

const Header = () => (
  <header className={styles.header}>
    <Link to="/" className={styles.title}>
      <h1>Megan Sullivan</h1>
    </Link>
    <SocialLinks />
    <NavBar />
  </header>
)

export default Header