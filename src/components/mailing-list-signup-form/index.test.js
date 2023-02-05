import React from 'react'
import { render, screen, cleanup, findByRole, findByText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MailingListSignupForm from "."

describe("MailingListSignupForm component", () => {
  it("renders with the expected form elements", () => {
    // ARRANGE
    render(<MailingListSignupForm/>)
    
    // ASSERT

    // it renders a "Preferred name" input
    expect(screen.getByRole('textbox', {name: "Preferred name"})).toBeInTheDocument()

    // it renders a required "Email" input
    const emailInput = screen.getByRole('textbox', {name: "Email"})
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toBeRequired()

    // it renders a "Submit" button
    expect(screen.getByRole("button", { name: "Submit"})).toBeInTheDocument()

    // CLEAN UP
    cleanup()
  })

  it("(happy path) when user submits a name and an email, it calls /api/email-signup and replaces the form with a success message", async () => {
    // ARRANGE
    // mock fetch call to serverless function
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ status: 200 })
    }));

    const user = userEvent.setup()
    render(<MailingListSignupForm/>)

    // ACT
    // Enter a name
    await user.click(screen.getByRole("textbox", {name: "Preferred name"}))
    await user.keyboard('megan')

    // Enter an email
    await user.click(screen.getByRole("textbox", {name: "Email"}))
    await user.keyboard('hello@meganesulli.com')

    // Click submit
    await user.click(screen.getByRole("button", {name: "Submit"}))

    await screen.findByText(/Thanks for subscribing!/)

    // ASSERT

    // it calls /api/email-signup
    expect(global.fetch.mock.lastCall[0]).toBe('/api/email-signup')

    // it removes the form from the DOM
    expect(screen.queryByRole('textbox', {name: "Preferred name"})).toBeNull()
    expect(screen.queryByRole('textbox', {name: "Email"})).toBeNull()
    expect(screen.queryByRole("button", { name: "Submit"})).toBeNull()

    // it displays (and moves focus to) a success message
    const successMessage = screen.getByText(/Thanks for subscribing!/)
    expect(successMessage).toBeInTheDocument()
    expect(successMessage).toHaveFocus()
    
    // CLEAN UP
    global.fetch.mockClear();
    delete global.fetch;
    
    cleanup() // clears component loaded by render
  })

  it("(happy path) when user submits an email only, it calls /api/email-signup and replaces the form with a success message", async () => {
    // ARRANGE
    // mock fetch call to serverless function
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ status: 200 })
    }));

    const user = userEvent.setup()
    render(<MailingListSignupForm/>)

    // ACT
    // Enter an email
    await user.click(screen.getByRole("textbox", {name: "Email"}))
    await user.keyboard('hello@meganesulli.com')

    // Click submit
    await user.click(screen.getByRole("button", {name: "Submit"}))

    await screen.findByText(/Thanks for subscribing!/)

    // ASSERT

    // it calls /api/email-signup
    expect(global.fetch.mock.lastCall[0]).toBe('/api/email-signup')

    // it removes the form from the DOM
    expect(screen.queryByRole('textbox', {name: "Preferred name"})).toBeNull()
    expect(screen.queryByRole('textbox', {name: "Email"})).toBeNull()
    expect(screen.queryByRole("button", { name: "Submit"})).toBeNull()

    // it displays (and moves focus to) a success message
    const successMessage = screen.getByText(/Thanks for subscribing!/)
    expect(successMessage).toBeInTheDocument()
    expect(successMessage).toHaveFocus()
    
    // CLEAN UP
    global.fetch.mockClear();
    delete global.fetch;
    
    cleanup() // clears component loaded by render
  })

  it("when user submits with an empty email, it doesn't call /api/email-signup and displays a form validation error", async () => {
    // ARRANGE
    // mock fetch call to serverless function
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ status: 200 })
    }));

    const user = userEvent.setup()
    render(<MailingListSignupForm/>)

    // ACT
    // Click submit
    await user.click(screen.getByRole("button", {name: "Submit"}))

    // ASSERT

    // it calls /api/email-signup
    expect(global.fetch.mock.calls).toEqual([])

    // it doesn't remove the form from the DOM
    expect(screen.getByRole('textbox', {name: "Preferred name"})).toBeInTheDocument()
    expect(screen.getByRole('textbox', {name: "Email"})).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit"})).toBeInTheDocument()

    // it displays a form validation error for the email field
    expect(screen.getByRole('textbox', {name: "Email"})).toBeInvalid()
    
    // CLEAN UP
    global.fetch.mockClear();
    delete global.fetch;
    
    cleanup() // clears component loaded by render
  })

  it("when user submits with an invalid email, it doesn't call /api/email-signup and displays a form validation error", async () => {
    // ARRANGE
    // mock fetch call to serverless function
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ status: 200 })
    }));

    const user = userEvent.setup()
    render(<MailingListSignupForm/>)

    // ACT

    // Enter invalid email pattern
    await user.click(screen.getByRole("textbox", {name: "Email"}))
    await user.keyboard('this is not an email address')

    // Click submit
    await user.click(screen.getByRole("button", {name: "Submit"}))

    // ASSERT

    // it calls /api/email-signup
    expect(global.fetch.mock.calls).toEqual([])

    // it doesn't remove the form from the DOM
    expect(screen.getByRole('textbox', {name: "Preferred name"})).toBeInTheDocument()
    expect(screen.getByRole('textbox', {name: "Email"})).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit"})).toBeInTheDocument()

    // it displays a form validation error for the email field
    expect(screen.getByRole('textbox', {name: "Email"})).toBeInvalid()
    
    // CLEAN UP
    global.fetch.mockClear();
    delete global.fetch;
    
    cleanup() // clears component loaded by render
  })

  // When ConvertKit API responds with an error, UI updates to say "Something went wrong. (It's me, not you.) Please try again later!" (& send an error alert to Google Analytics?)
  it("when /api/email-signup responds with an error, it displays an error message", async () => {
    // ARRANGE
    // mock fetch call to serverless function
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ status: 500 })
    }));

    const user = userEvent.setup()
    render(<MailingListSignupForm/>)

    // ACT

    // Enter an email
    await user.click(screen.getByRole("textbox", {name: "Email"}))
    await user.keyboard('hello@meganesulli.com')

    // Click submit
    await user.click(screen.getByRole("button", {name: "Submit"}))

    await screen.findByText(/Oops/)

    // ASSERT

    // it doesn't remove the form from the DOM
    expect(screen.getByRole('textbox', {name: "Preferred name"})).toBeInTheDocument()
    expect(screen.getByRole('textbox', {name: "Email"})).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit"})).toBeInTheDocument()

    // it displays an error message
    expect(screen.getByRole("alert")).toBeInTheDocument()
    
    // CLEAN UP
    global.fetch.mockClear();
    delete global.fetch;
    
    cleanup() // clears component loaded by render
  })
})
