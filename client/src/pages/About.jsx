import React, { useState, useEffect } from "react";

const About = () => {
    // const images = [
    //     "https://res.cloudinary.com/dytbju4xg/image/upload/v1755866565/hill3_iphu8n.jpg",
    //     "https://res.cloudinary.com/dytbju4xg/image/upload/v1755866546/hill2_x4sa0m.jpg",
    //     "https://res.cloudinary.com/dytbju4xg/image/upload/v1755866530/mahabaleshwar_hills_ldi08w.jpg",
    // ];
    // const [currentImage, setCurrentImage] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //     setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    //     }, 4000); // Change image every 4 sec (you can set 3000 or 5000 too)

    //     return () => clearInterval(interval); // cleanup
    // }, [images.length]);
    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Hero Image */}
            {/* <div className="w-full h-72 md:h-96 relative overflow-hidden">
                <img
                src={images[currentImage]}
                alt="Hiltop Stays Mahabaleshwar"
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-xl md:text-2xl font-light">We are</h2>
                <h1 className="text-3xl md:text-5xl font-bold">Hiltop Stays</h1>
                </div>
            </div> */}
            <div className="w-full h-72 md:h-96 relative">
                <img
                src="https://res.cloudinary.com/dytbju4xg/image/upload/v1755866565/hill3_iphu8n.jpg"
                alt="Hiltop Stays Mahabaleshwar"
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-White bg-opacity-40 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-xl md:text-2xl font-light">We are</h2>
                <h1 className="text-3xl md:text-5xl font-bold">Hiltop Stays</h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
                <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                <p className="mb-6">
                Hiltop Stays was founded with a simple idea – to make it easier for
                travelers to discover the best stays in Mahabaleshwar. With our own
                roots in the hospitality industry and strong local connections, we
                bring you handpicked hotels, villas, and homestays that ensure
                comfort, convenience, and memorable experiences.
                </p>

                <h2 className="text-2xl font-semibold mb-4">What Makes Us Different</h2>
                <p className="mb-6">
                Unlike large travel platforms, we specialize only in Mahabaleshwar.
                This local focus allows us to curate the most trusted hotels and
                properties, often managed by people we personally know. Whether it’s a
                cozy hillside villa or a family-friendly hotel, we make sure every
                stay lives up to our quality promise.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Our Mission & Vision</h2>
                <p className="mb-6">
                Our mission is to make booking hotels in Mahabaleshwar stress-free and
                transparent. We want to be the go-to platform for travelers looking
                for verified, comfortable, and affordable stays in the hills. In the
                future, we aim to bring the same trusted experience to other hill
                stations across India.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Guest-Centric Approach</h2>
                <p className="mb-6">
                At Hiltop Stays, your comfort is our priority. From secure bookings
                and fair pricing to reliable customer support, we’re here to make your
                trip planning smooth and worry-free.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                <p className="mb-6">
                Hiltop Stays started with our own family-run hotel in Mahabaleshwar.
                Over the years, as more friends and guests asked us for
                recommendations, we realized the need for a dedicated platform. That’s
                how Hiltop Stays was born.
                </p>

                <div className="mt-10 text-center">
                <a
                    href="/hotels"
                    className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-xl shadow-md transition"
                    >
                    Explore Stays in Mahabaleshwar
                </a>

                </div>
            </div>
        </div>
    );
};

export default About;
