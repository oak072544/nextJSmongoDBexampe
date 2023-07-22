import React from 'react'
import styles from './styles/Nav.module.css'
function Nav() {
  return (
    <nav className={styles.navbar}>
        <div className={styles.navItems}>
            <ul>
                <li><a href="/">My Service</a></li>
                <li><a href="/service">Add Service</a></li>
            </ul>
        </div>
    </nav>
  )
}

export default Nav