"use client"
import { useState, useEffect } from "react"
import {
  Badge,
  IconButton,
} from "@mui/material"

export default function Navigation() {


  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const handleScroll = () => {
    if (typeof window != "undefined") {
      setIsNavVisible(prevScrollPos > window.scrollY || window.scrollY < 70);
      setPrevScrollPos(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);


  return (
    <nav id="header-nav" className={isNavVisible ? 'nav top-0' : 'nav top-70-u'}>
      <div className="nav-logo">
        <div className="nav-logo-square">
          <img alt="imagotipo" src="/imagotipo.svg" />
        </div>
        <div className="nav-logo-large">
          <img alt="logo" src="/logo.svg" />
        </div>
      </div>

      <div className="nav-buttons-container">
        <div className="icon-btn-container">
          <IconButton size="small" >
            <img alt="user-icon" src="/user-icon.svg" width="34" />
          </IconButton>
        </div>
        <div className="icon-btn-container">
          <IconButton size="small" >
            <img alt="user-icon" src="/cart-icon.svg" width="34" />
          </IconButton>
        </div>
        <div className="icon-btn-container">
          <IconButton size="small" >
            <Badge color="error" badgeContent={" "} overlap="circular" >
              <img alt="user-icon" src="/bell-icon.svg" width="34" />
            </Badge>
          </IconButton>
        </div>
      </div>

    </nav>
  )
}
