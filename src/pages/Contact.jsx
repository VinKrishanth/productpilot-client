import React, { useState } from "react";
import { MapPin, Phone, MailCheckIcon } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our organic products or want to collaborate?
              We'd love to hear from you!
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Contact Info */}
              <div className="bg-gray-50 p-8 md:col-span-2">
                <h3 className="text-xl font-semibold text-green-700 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-green-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Our Address</h4>
                      <p className="text-gray-600 mt-1">
                        Yatiyantota, Sri Lanka.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MailCheckIcon className="h-6 w-6 text-green-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Email Us</h4>
                      <p className="text-gray-600 mt-1">
                        Krishanth.cse@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-green-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Call Us</h4>
                      <p className="text-gray-600 mt-1">(+94) 77-323-5540</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Business Hours
                  </h4>
                  <p className="text-gray-600">Mon - Fri: 9am - 5pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 md:col-span-3">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Just Say Hello!
                </h3>
                <p className="text-gray-600 mb-8">
                  Want to chat, start a project, or say hi? Feel free to contact
                  us.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 px-4 py-3 rounded w-full min-h-[150px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full  mt-12 ">
          <div className="h-[400px] mx-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.832920936267!2d80.29248337475802!3d7.0289160929729375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae30905b0cc0c77%3A0xd577430e4fe90c5a!2sYatiyantota%20clock%20tower!5e0!3m2!1sen!2slk!4v1744528329636!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
