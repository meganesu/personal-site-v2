import React, { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"

import CallToActionBox from "../call-to-action"

import {
  formFieldWrapper as formFieldWrapperStyles,
  formField as formFieldStyles,
  submitWrapper as submitWrapperStyles,
  submit as submitStyles,
  successMessage as successMessageStyles,
  errorMessage as errorMessageStyles,
} from "./styles.module.css"

const MailingListSignupForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm()

  const [success, setSuccess] = useState(false)
  const successMessageRef = useRef(null)
  const [successMessage, setSuccessMessage] = useState('')

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    console.log("Submitted form with data:", data)
    fetch(`/api/email-signup`, {
      method: `POST`,
      body: JSON.stringify(data),
      headers: {
        "content-type": `application/json`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(`Response from /api/email-signup:`, body)
        if (body.status === 200) {
          setSuccess(true)
          setSuccessMessage("Thanks for subscribing! Check your inbox for a confirmation email.")
          successMessageRef.current.focus()
        }
        else {
          setError(true)
          setErrorMessage("Oops, something's wrong on my end. Please try again later.")
          console.log("Error from /api/email-signup:", body)
        }
      })
  }

  return (
    <CallToActionBox>
      <h2>Join the newsletter!</h2>
      <p>
        Subscribe to get email updates about new content! (No spam. Unsubscribe
        at any time.)
      </p>
      { !success && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={formFieldWrapperStyles}>
            <div className={formFieldStyles}>
              <label htmlFor="name">Preferred name</label>
              <input
                type="text"
                name="preferred-name"
                id="name"
                {...register("preferred_name")}
              />
            </div>
            <div className={formFieldStyles}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onInvalid={e => e.target.setCustomValidity('Please enter a valid email address')}
                {...register("email")}
              />
            </div>
          </div>
          <div className={submitWrapperStyles}>
            <input className={submitStyles} type="submit" value="Submit" />
            <p className={errorMessageStyles} role="alert">
              {errorMessage}
            </p>
          </div>
        </form>
      )}
      <p className={successMessageStyles} tabIndex={-1} ref={successMessageRef}>
        {successMessage}
      </p>
    </CallToActionBox>
  )
}

export default MailingListSignupForm
