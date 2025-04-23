import React from 'react';
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Typography variant="h5" color="blue-gray" className="font-bold">
              61House
            </Typography>
            <Typography className="text-gray-600">
              Your favorite destination for refreshing drinks. We serve the best quality beverages with exceptional service.
            </Typography>
          </div>

          {/* Quick Links */}
          <div>
            <Typography variant="h6" color="blue-gray" className="font-bold mb-4">
              Quick Links
            </Typography>
            <ul className="space-y-2">
              <li>
                <a href="/menu" className="text-gray-600 hover:text-blue-500">
                  Menu
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-blue-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <Typography variant="h6" color="blue-gray" className="font-bold mb-4">
              Contact Us
            </Typography>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-gray-600">Ho Chi Minh City, Vietnam</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-600">+84 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-600">info@61house.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <Typography variant="h6" color="blue-gray" className="font-bold mb-4">
              Opening Hours
            </Typography>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="text-gray-600">9:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="text-gray-600">10:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="text-gray-600">11:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Typography className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} 61House. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
