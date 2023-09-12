import { NavLink, Outlet } from "react-router-dom";
import { useState, useContext } from "react";

import AuthModal from "../Auth-Modal/AuthModal";

import classes from "./Header.module.css";
import CartModal from "../Cart-Modal/CartModal";
import CartContext from "../../store/cart-context";
import FavModal from "../Fav-Modal/FavModal";

function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [favModalOpen, setFavModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const openFavModal = () => {
    setFavModalOpen(true);
  };

  const toggleNavModal = () => {
    setShowNavModal(!showNavModal);
  };

  const closeModal = () => {
    setAuthModalOpen(false);
    setCartModalOpen(false);
    setFavModalOpen(false);
  };

  const indoor = 'indoor';
  const outdoor = 'outdoor';
  const office = 'office';


  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.length;

  

  return (
    <>
      <header className={classes.header}>
        <div className={classes.burgerIcon} onClick={toggleNavModal}>
          ☰
        </div>

        <img
          src="https://www.verona.ge/wp-content/uploads/2020/02/75white.png"
          alt="logo"
          style={{ maxWidth: "210px" }}
        />
        <nav className={classes.category}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <p className={classes.forActive}>Home</p>
          </NavLink>
          {/* <NavLink
            to="add-products"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <p className={classes.forActive}>Add Products</p>
          </NavLink> */}
          <div className={classes.dropdownContainer}>
            <NavLink
              // to="#"
              className={classes.dropdownTrigger}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <p className={classes.forActive}>Collections</p>
              {isDropdownOpen && (
                <div className={classes.dropdownContent}>
                  <NavLink to="/indoor" state={{ indoor: indoor }}>Indoor</NavLink>
                  <NavLink to="/indoor" state={{ outdoor: outdoor }}>Outdoor</NavLink>
                  <NavLink to="/indoor" state={{ office: office }}>Office</NavLink>
                </div>
              )}
            </NavLink>
          </div>

          <NavLink
            to="gallery"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <p className={classes.forActive}>Gallery</p>
          </NavLink>
          <NavLink
            to="contact"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <p className={classes.forActive}>Contact</p>
          </NavLink>
        </nav>

        {showNavModal && (
          <div className={classes.navModal}>
            <div className={classes.closeIcon} onClick={toggleNavModal}>
              &times;
            </div>
            <nav className={classes.modalCategory}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <p>Home</p>
              </NavLink>
              {/* <NavLink
                to="add-products"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <p>Add Products</p>
              </NavLink> */}
              <div
                className={classes.dropdownContainer}>
                <NavLink
                  to="#"
                  className={classes.dropdownTrigger}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <p>Collections</p>
                  {isDropdownOpen && (
                    <div className={classes.dropdownContent}>
                      <NavLink to="/indoor" state={{ indoor: indoor }} >Indoor</NavLink>
                      <NavLink to="/indoor" state={{ outdoor: outdoor }}>Outdoor</NavLink>
                      <NavLink to="/indoor" state={{ office: office }}>Office</NavLink>
                    </div>
                  )}
                </NavLink>
              </div>

              <NavLink
                to="gallery"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <p>Gallery</p>
              </NavLink>
              <NavLink
                to="contact"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <p>Contact</p>
              </NavLink>
            </nav>
          </div>
        )}
        <div className={classes.category}>
          <p onClick={openFavModal}>favorites</p>
          <p onClick={openAuthModal}>auth</p>
          <p onClick={openCartModal}>Cart {numberOfCartItems}</p>

        </div>
        <div className={classes.iconsContainer}>
          <div className={classes.favoritesIcon} onClick={openFavModal}>
            💓
          </div>
          <div className={classes.profileIcon} onClick={openAuthModal}>
            👤
          </div>
          <div className={classes.cartIcon} onClick={openCartModal}>
            🛒
            {numberOfCartItems > 0 && (
              <span className={classes.cartItemCount}>{numberOfCartItems}</span>
            )}
          </div>
        </div>
      </header>
      {/* <hr /> */}
      <Outlet />
      {favModalOpen && <FavModal closeModal={closeModal} />}
      {authModalOpen && <AuthModal closeModal={closeModal} />}
      {cartModalOpen && <CartModal closeModal={closeModal} />}
    </>
  );
}

export default Header;
