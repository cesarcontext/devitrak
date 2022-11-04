import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { NavbarBottom } from '../components/ui/NavbarBottom'

export const DeclineTerms = () => {
  return (
    <div>
      <Navbar />
        <div style={{
          margin: "50% auto"
        }}>
            <h1>We understand your concern</h1>
            <span>
                Please understand our, we hope to have you back sooner!
            </span>
            <NavLink to="/">
              <p style={{
                textDecoration: "underline"
              }}>Here to return to Privacy Policy to access to application</p>
            </NavLink>
        </div>
        <NavbarBottom />
    </div>
  )
}
