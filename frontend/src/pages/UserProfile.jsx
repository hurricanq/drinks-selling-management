import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const UserProfile = () => {
    const socials = [
        {
            id: 1,
            image: "facebook.png",
            username: "Đăng Khôi"
        },
        {
            id: 2,
            image: "spotify.png",
            username: "Đăng Khôi"
        },
    ]

    const activities = [
        {
            id: 1,
            content: "Ordered Iced Cappuccino, Milk Coffee, +3",
            date: "12/12/2024"
        },
        {
            id: 2,
            content: "Ordered Milk Coffee",
            date: "09/12/2024"
        },
    ]

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    axios.defaults.withCredentials = true
  
    useEffect(() => {
        axios.get("http://localhost:8800")
        .then(res => {
            if (res.data.status == "Successful") {
            setUsername(res.data.name)
            setEmail(res.data.email)
            setPhoneNumber(res.data.phone)
            console.log(res.data)
            } else {
            alert("Error!")
            }
        }).then(err => console.log(err))
    }, [])

    return (
        <>
            <Navbar isMenu={false} isContact={false} isAbout={false} />
            <div className="bg-white font-poppins">
                <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex flex-col justify-center items-center gap-5 py-10">
                        <img src="./assets/pfp.jpg" alt="" className="w-52 h-52 object-cover rounded-full" />
                        <h1 className="text-3xl font-bold">{username}</h1>
                        <h2 className="text-xl">{email}</h2>
                        <a href="/edit-profile" className="px-5 py-3 border-solid border-2 border-primary-bg text-primary-text hover:bg-primary-bg hover:text-white transition-colors rounded-xl">Edit Profile</a>
                    </div>

                    <section className="flex flex-col md:flex-row items-center justify-between px-8 gap-5">
                        {/* Left Section */}
                        <div className="md:w-1/2 flex flex-col gap-y-5">
                            <div className="rounded-xl shadow-lg px-5 py-3">
                                <h2 className="text-xl font-bold">Bio</h2>
                                <p className="text-gray-700 mt-4 text-lg">
                                No bio set.
                                </p>
                            </div>

                            <div className="rounded-xl shadow-lg px-5 py-3">
                                <h2 className="text-xl font-bold">Contact</h2>
                                <p className="text-gray-700 mt-4 text-lg">
                                {phoneNumber}
                                </p>
                            </div>
                            
                            <div className="rounded-xl shadow-lg px-5 py-3">
                                <h2 className="text-xl font-bold">Recent Activities</h2>
                                {activities.map(activity => (
                                    <div key={activity.id} className="flex justify-between mt-4">
                                        <p className="text-gray-700 text-lg">{activity.content}</p>
                                        <p className="text-sm">{activity.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="self-start md:w-1/2 mt-8 md:mt-0 relative rounded-xl shadow-lg px-5 py-3">
                            <h2 className="text-xl font-bold mb-3">Social Links</h2>
                            <div className="flex flex-col gap-y-5">
                                {socials.map(social => (
                                    <a key={social.id} href="#" className="flex items-center gap-5 px-5 py-3 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl">
                                        <img src={`./assets/${social.image}`} alt="" className="w-10"/>
                                        <p className="text-md font-bold">{social.username}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default UserProfile
