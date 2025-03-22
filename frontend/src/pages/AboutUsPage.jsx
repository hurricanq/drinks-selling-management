import React from 'react';

import { BookOpenIcon, TruckIcon, LockClosedIcon } from "@heroicons/react/24/outline"

const AboutUsPage = () => {
  return (
    <div>
      <section className="mx-auto max-w-7xl text-center lg:text-left px-5 lg:px-0 overflow-hidden pt-10 pb-12 lg:pt-[40px] lg:pb-[90px] bg-white dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2 aspect-auto">
                  <div className="py-3 sm:py-4">
                    <img
                      src="./assets/appleCarousel.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="./assets/orangeCarousel.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src="./assets/wallpaper.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-blue-300">
                  Why Choose Us
                </span>
                <h2 className="mb-5 text-3xl font-bold text-primary-text dark:text-white sm:text-[40px]/[48px]">
                  Make your customers happy by giving services.
                </h2>
                <p className="mb-5 text-base text-gray-700 dark:text-dark-6">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less.
                </p>
                <p className="mb-8 text-base text-gray-700 dark:text-dark-6">
                  A domain name is one of the first steps to establishing your
                  brand. Secure a consistent brand image with a domain name that
                  matches your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl text-center px-5 lg:px-0">
        <div className="flex flex-col gap-3 mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-text">Here's why you will love our store</h2>
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend, metus et elementum malesuada, lectus dui pellentesque risus, id rhoncus ante mi sed lacus. Sed malesuada massa vitae feugiat ullamcorper.</p>
        </div>

        <div className="my-10 grid grid-cols-3 gap-5">
          <div className="px-3 py-5 flex flex-col items-center gap-3 rounded-lg shadow-md hover:bg-primary-bg hover:scale-105 transition-all">
            <div className="flex items-center justify-center h-10 w-10 bg-primary-text text-white p-2 rounded-full">
              <BookOpenIcon className="h-5"  />
            </div>
            <h3 className="text-lg font-semibold">Large Menu</h3>
            <p className="text-gray-700">Offers a wide variety of refreshing beverages to satisfy every taste.</p>
          </div>

          <div className="px-3 py-5 flex flex-col items-center gap-3 rounded-lg shadow-md hover:bg-primary-bg hover:scale-105 transition-all">
            <div className="flex items-center justify-center h-10 w-10 bg-primary-text text-white p-2 rounded-full">
              <TruckIcon className="h-5"  />
            </div>
            <h3 className="text-lg font-semibold">Fast Delivery</h3>
            <p className="text-gray-700">Ensures your orders arrive quickly and on time, within the same day</p>
          </div>

          <div className="px-3 py-5 flex flex-col items-center gap-3 rounded-lg shadow-md hover:bg-primary-bg hover:scale-105 transition-all">
            <div className="flex items-center justify-center h-10 w-10 bg-primary-text text-white p-2 rounded-full">
              <LockClosedIcon className="h-5"  />
            </div>
            <h3 className="text-lg font-semibold">Secure Payment</h3>
            <p className="text-gray-700">Ensure your personal and financial information stays safe during checkout.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
