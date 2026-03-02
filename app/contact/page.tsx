"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="border-b border-gray-200 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900">Get in Touch</h1>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 max-w-6xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Left - Info */}
          <div className="lg:col-span-2 space-y-14">

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <a href="mailto:hello@exora.in" className="flex items-start gap-4 group">
                  <Mail className="w-4 h-4 mt-1 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <p className="text-gray-900 group-hover:underline underline-offset-2 text-sm">hello@exora.in</p>
                  </div>
                </a>
                <a href="tel:+917861886462" className="flex items-start gap-4 group">
                  <Phone className="w-4 h-4 mt-1 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                    <p className="text-gray-900 group-hover:underline underline-offset-2 text-sm">+91 78618 86462</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 mt-1 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Address</p>
                    <p className="text-gray-900 text-sm leading-relaxed">C-41, Sumeru City Mall<br />Surat, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-6">
                Business Hours
              </h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Monday - Friday", "10:00 AM - 7:00 PM"],
                    ["Saturday", "11:00 AM - 5:00 PM"],
                    ["Sunday", "Closed"],
                  ].map(([day, hours]) => (
                    <tr key={day}>
                      <td className="py-2.5 text-gray-600">{day}</td>
                      <td className={"py-2.5 text-right " + (hours === "Closed" ? "text-gray-400" : "text-gray-900 font-medium")}>{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-4">
                Response Time
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We typically respond to all enquiries within 24 business hours. For urgent matters, please call us directly.
              </p>
            </div>

          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="w-px h-full bg-gray-100 mx-auto" />
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="h-full flex flex-col justify-center py-16 text-center">
                <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">Message received</h3>
                <p className="text-sm text-gray-500">Thank you for reaching out. We will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-8">
                  Send a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Email *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white"
                    placeholder="Order enquiry / Custom request"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white resize-none"
                    placeholder="Write your message here"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
                >
                  Send Message
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}