import React, { useState } from "react"
import { useForm } from "react-hook-form"

import CallToActionBox from "../call-to-action"

import {
  formFieldWrapper as formFieldWrapperStyles,
  formField as formFieldStyles,
  submit as submitStyles,
  successMessage as successMessageStyles,
  errorMessage as errorMessageStyles,
} from "./styles.module.css"

const MailingListSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit = (data) => {
    console.log("DATA IN ONSUBMIT", data)
    fetch(`/api/email-signup`, {
      method: `POST`,
      body: JSON.stringify(data),
      headers: {
        "content-type": `application/json`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(`response from API:`, body)
        if (body.status === 200) {
          setSuccess(true)
        }
        else {
          setError(true)
          console.log("Error from /api/email-signup:", body)
        }
      })
  }

  if (Object.keys(errors).length !== 0) {
    console.log("ERRORS:", errors)
  }

  return (
    <CallToActionBox>
      <h2>Join the newsletter!</h2>
      <p>
        Subscribe to get email updates about new content! (No spam. Unsubscribe
        at any time.)
      </p>
      {success ? (
        <p className={successMessageStyles}>
          Thanks for subscribing! Check your inbox for a confirmation email.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          { error && (
            <p className={errorMessageStyles}>
              Oops, something's wrong on my end. Please try again later.
            </p>
          )}
          <div className={formFieldWrapperStyles}>
            <div className={formFieldStyles}>
              <label htmlFor="name">Preferred name</label>
              <input
                type="text"
                name="preferred-name"
                id="name"
                {...register("first_name")}
              />
            </div>
            <div className={formFieldStyles}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                {...register("email", { required: true })}
              />
            </div>
          </div>
          <input className={submitStyles} type="submit" value="Submit" />
        </form>
      )}
    </CallToActionBox>
  )
}

export default MailingListSignupForm
