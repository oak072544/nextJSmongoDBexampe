import React from 'react'
import styles from './styles/Nav.module.css'
import Link from 'next/link'
function Nav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItems}>
        <ul>
          <li><Link href="/">My Service</Link></li>
          <li><Link href="/service">Add Service</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav