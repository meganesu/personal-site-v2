import React from 'react'

import CallToActionBox from '../call-to-action';

export const TemplateMailingListSignupForm = () => {
  return (
    <>
    <script src="https://f.convertkit.com/ckjs/ck.5.js">
    </script>
    <form
      action="https://app.convertkit.com/forms/4003750/subscriptions"
      class="seva-form formkit-form"
      method="post"
      data-sv-form="4003750"
      data-uid="e7e1f92800"
      data-format="inline"
      data-version="5"
      data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}"
      min-width="400 500 600 700 800"
    >
      <div
        class="formkit-background"
      >
      </div>
      <div data-style="minimal">
        <div
          class="formkit-header"
          data-element="header"
        >
        <h2>Join the Newsletter</h2>
        </div>
        <div
        class="formkit-subheader"
        data-element="subheader">
          <p>Subscribe to get email updates about new content!</p>
        </div>
        <ul class="formkit-alert formkit-alert-error"
        data-element="errors"
        data-group="alert">
          </ul>
        <div data-element="fields"
        data-stacked="true"
        class="seva-fields formkit-fields">
          <div class="formkit-field">
          <input
            class="formkit-input"
            aria-label="First Name"
            name="fields[first_name]"
            required=""
            placeholder="First Name"
            type="text"
          />
          </div>
        <div class="formkit-field">
          <input
            class="formkit-input"
            name="email_address"
            aria-label="Email Address"
            placeholder="Email Address"
            required=""
            type="email"
          />
          </div>
        <button data-element="submit"
        class="formkit-submit formkit-submit"
        >
          <div class="formkit-spinner">
          <div>
          </div>
        <div>
          </div>
        <div>
          </div>
        </div>
        <span class="">Subscribe</span>
        </button>
        </div>
        <div class="formkit-guarantee"
        data-element="guarantee">
          <p>No spam. Unsubscribe at any time.</p>
        </div>
        </div>
        </form>
        </>
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