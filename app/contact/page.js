"use client"

import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [form, setForm] = useState({ user_name: '', user_email: '', user_message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!form.user_name) validationErrors.user_name = 'Name is required';
    if (!form.user_email) validationErrors.user_email = 'Email is required';
    else if (!validateEmail(form.user_email)) validationErrors.user_email = 'Invalid email';
    if (!form.user_message) validationErrors.user_message = 'Message is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      );
      setSuccess(true);
      setForm({ user_name: '', user_email: '', user_message: '' });
      setErrors({});
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full bg-background shadow-lg rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl font-bold text-foreground text-center">Contact Me</h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input 
            type="text" 
            name="user_name" 
            placeholder="Your Name" 
            value={form.user_name} 
            onChange={handleChange} 
            className="p-3 border rounded-lg bg-input text-background" 
          />
          {errors.user_name && <p className="text-red-500 text-sm">{errors.user_name}</p>}
          
          <input 
            type="email" 
            name="user_email" 
            placeholder="Your Email" 
            value={form.user_email} 
            onChange={handleChange} 
            className="p-3 border rounded-lg bg-input text-background" 
          />
          {errors.user_email && <p className="text-red-500 text-sm">{errors.user_email}</p>}
          
          <textarea 
            name="user_message" 
            placeholder="Your Message" 
            value={form.user_message} 
            onChange={handleChange} 
            className="p-3 border rounded-lg bg-input text-background h-32" 
          ></textarea>
          {errors.user_message && <p className="text-red-500 text-sm">{errors.user_message}</p>}
          
          <button type="submit" className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-80 transition">
            Send Message
          </button>
          {success && <p className="text-green-500 text-sm text-center">Message sent successfully!</p>}
        </form>
      </div>
    </section>
  );
}
