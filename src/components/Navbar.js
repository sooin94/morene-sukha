import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!isOpen);
  const closeMenu = () => setMenuOpen(false);

  // lock body scroll when menu is opened
  useEffect(() => {
    document.body.style.overflow = isOpen? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);
  return (
    <>
      <header className="nav-header">
        <button className="hamburger" onClick={toggleMenu}>
         {isOpen ? '✕' : '☰'}
        </button>
      </header>
    
     {isOpen && (
        <div className="side-menu">
          <div className="menu-header">
            <h1 className="logo">morene-sukha 🧘‍♀️</h1>
          </div>
          <Menu className="menu-links" right isOpen={isOpen} onStateChange={({isOpen}) => setMenuOpen(isOpen)} customBurgerIcon={false} customCrossIcon={false}>
            <Link className="menu-item" to="/" onClick={closeMenu}>🍔 menu</Link>
            <Link className="menu-item" to="/merch" onClick={closeMenu}>🎁 merch</Link>
            <Link className="menu-item" to="/bookings" onClick={closeMenu}>🎫 show</Link>
            <Link className="menu-item" to="/cart" onClick={closeMenu}>🛒 cart</Link>
            <Link className="menu-item" to="/orders/my" onClick={closeMenu}>📦 orders</Link>
          </Menu>
      </div>
      )}
    </>
  )
};

export default Navbar;