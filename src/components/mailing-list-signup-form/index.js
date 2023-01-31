import React from "react"
import { useForm } from "react-hook-form"

import CallToActionBox from "../call-to-action"

import {
  formFieldWrapper as formFieldWrapperStyles,
  formField as formFieldStyles,
  submit as submitStyles,
} from "./styles.module.css"

const MailingListSignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log('DATA IN ONSUBMIT', data)
    fetch(`/api/email-signup`, {
      method: `POST`,
      body: JSON.stringify(data),
      headers: {
        "content-type": `application/json`,
      },
    })
      .then(res => res.json())
      .then(body => {
        console.log(`response from API:`, body)
      })
  }

  if ( Object.keys(errors).length !== 0 ) {
    console.log('ERRORS:', errors)
  }

  return (
    <CallToActionBox>
      <h2>Join the newsletter!</h2>
      <p>Subscribe to get email updates about new content! (No spam. Unsubscribe at any time.)</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={formFieldWrapperStyles}>
          <div className={formFieldStyles}>
            <label htmlFor="name">First name</label>
            <input type="text" name="first-name" id="name" {...register("first_name") } />
          </div>
          <div className={formFieldStyles}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" { ...register ("email", {required: true}) } />
          </div>
        </div>
        <input className={submitStyles} type="submit" value="Submit" />
      </form>
    </CallToActionBox>
  )
}

export default MailingListSignupForm
