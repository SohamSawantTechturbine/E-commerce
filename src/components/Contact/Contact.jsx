import React from 'react'
import { toast } from 'react-toastify'

function Contact() {
  const contactHandle=(e)=>{
    e.preventDefault()
    toast("tour data submitted ,we will get you back soon")
  }
  return (
    <div>
    <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold text-center mb-4">Contact Us</h1>
    <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2">
            <h2 class="text-xl font-semibold mb-2">Get in Touch</h2>
            <p class="mb-4">Have questions or feedback? Feel free to reach out to us using the contact information below or fill out the form, and we'll get back to you as soon as possible.</p>
            <div class="flex items-center mb-2">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                <span class="font-semibold">Mulund West </span>
            </div>
            <div class="flex items-center mb-2">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                <span class="font-semibold">ShopCart@gmail.com</span>
            </div>
            <div class="flex items-center mb-2">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                <span class="font-semibold">+1234567890</span>
            </div>
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0">
            <h2 class="text-xl font-semibold mb-2">Send Us a Message</h2>
        
                <div class="mb-4">
                    <label for="name" class="block text-sm font-semibold mb-1">Your Name</label>
                    <input type="text" id="name" name="name" class="form-input w-full" />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-semibold mb-1">Your Email</label>
                    <input type="email" id="email" name="email" class="form-input w-full border border-gray-300 focus:border-blue-500" />
                </div>
                <div class="mb-4">
                    <label for="message" class="block text-sm font-semibold mb-1">Your Message</label>
                    <textarea id="message" name="message" rows="4" class="form-textarea w-full border border-gray-300 focus:border-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"onClick={contactHandle}>Send Message</button>
          
        </div>
    </div>
</div>
</div>
  )
}

export default Contact
