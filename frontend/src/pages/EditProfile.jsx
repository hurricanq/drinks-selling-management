import React from 'react'

import { Input, Typography } from "@material-tailwind/react";
  
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EditProfile = () => {
  return (
    <>
        <Navbar isMenu={false} isContact={false} isAbout={false} />
        <div className="bg-white font-poppins">
            <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:pt-24 sm:pb-80 lg:max-w-7xl lg:px-8">
                <div className="mb-5">
                    <a href="/profile" className="hover:text-primary-bg transition-colors"><span>&larr;</span> Back to Profile</a>
                </div>

                <section>
                    <Typography variant="h5" color="blue-gray">
                        User Information
                    </Typography>
                    <Typography
                        variant="small"
                        className="text-gray-600 font-normal mt-1"
                    >
                        Update your profile information below.
                    </Typography>
                    <div className="flex flex-col mt-8">
                        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                            <div className="w-full">
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                                >
                                Username
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Emma"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    className="w-full placeholder:opacity-100 focus:border-t-primary"
                                />
                            </div>

                            <div className="w-full">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-2 font-medium"
                                >
                                    Phone Number
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Roberts"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                />
                            </div>
                        </div>
                        
                        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                            <div className="w-full">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-2 font-medium"
                                >
                                Email
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="emma@mail.com"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                />
                            </div>
                            <div className="w-full">
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                                >
                                Password
                                </Typography>
                                <Input
                                size="lg"
                                placeholder="emma@mail.com"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default EditProfile
