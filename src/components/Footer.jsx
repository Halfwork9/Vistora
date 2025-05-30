import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full mt-8">
      <hr className="border border-gray-300 dark:border-gray-700" />

      <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 flex-col md:flex-row justify-between items-center">
            <h1 className="text-xl font-bold">Vistora</h1>
            <p className="text-sm ">Your One-stop shop for Everything you need.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <a href="/about" className="text-sm hover:opacity-70">About Us</a>
            <a href="/contact" className="text-sm hover:opacity-70">Contact Us</a>
            <a href="/privacy" className="text-sm hover:opacity-70">Privacy Policy</a>
            <a href="/terms" className="text-sm hover:opacity-70">Terms and Conditions</a>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm" >Follow us:</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className=" hover:opacity-70"><Facebook /></a>
            <a href="#" className=" hover:opacity-70"><Twitter /></a>
            <a href="#" className=" hover:opacity-70"><Instagram /></a>
            <a href="#" className=" hover:opacity-70"><Youtube /></a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;