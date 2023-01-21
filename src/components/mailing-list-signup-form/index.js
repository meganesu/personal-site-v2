import React from "react"

import CallToActionBox from "../call-to-action"

export const TemplateMailingListSignupForm = () => {
  return (
    <CallToActionBox>
      <script src="https://f.convertkit.com/ckjs/ck.5.js" />
      <form
        action="https://app.convertkit.com/forms/4003750/subscriptions"
        class="seva-form formkit-form"
        method="post"
        data-sv-form="4003750"
        data-uid="e7e1f92800"
        data-format="inline"
        data-version="5"
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
      >
        <div class="formkit-background"></div>
        <div data-style="minimal">
          <div class="formkit-header" data-element="header">
            <h2>Join the Newsletter</h2>
          </div>
          <div class="formkit-subheader" data-element="subheader">
            <p>Subscribe to get email updates about new content!</p>
          </div>
          <ul
            class="formkit-alert formkit-alert-error"
            data-element="errors"
            data-group="alert"
          >
          </ul>
          <div
            data-element="fields"
            data-stacked="true"
            class="seva-fields formkit-fields"
          >
            <div class="formkit-field">
              <label for="first-name">First name</label>
              <input
                type="text"
                id="first-name"
                name="fields[first_name]"
                class="formkit-input"
                required=""
              />
            </div>
            <div class="formkit-field">
              <label for="email-address">Email address</label>
              <input
                type="email"
                id="email-address"
                name="email_address"
                class="formkit-input"
                required=""
              />
            </div>
            <button data-element="submit" class="formkit-submit formkit-submit">
              <div class="formkit-spinner">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span class="">Subscribe</span>
            </button>
          </div>
          <div class="formkit-guarantee" data-element="guarantee">
            <p>No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </form>
    </CallToActionBox>
  )
}

const MailingListSignupForm = () => {
  return (
    <CallToActionBox>
      <h2>Join the newsletter!</h2>
      <p>Subscribe to get email updates about new content!</p>
      <p>No spam. Unsubscribe at any time.</p>
      <form
        action="https://app.convertkit.com/forms/4003750/subscriptions"
        method="POST"
      >
        <div>
          <label for="name">First name</label>
          <input type="text" name="first-name" id="name" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </CallToActionBox>
  )
}

export default MailingListSignupForm
