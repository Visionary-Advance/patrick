"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
});

export default function ContactForm() {
  const [toast, setToast] = useState({ show: false, title: "", description: "", variant: "" });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const showToast = (title, description, variant = "success") => {
    setToast({ show: true, title, description, variant });
    setTimeout(() => setToast({ show: false, title: "", description: "", variant: "" }), 5000);
  };

  const onSubmit = async (data) => {
    try {
      // Here you would typically send the data to your server
      console.log("Form submitted:", data);

      showToast(
        "Message sent!",
        "Thank you for your message. We'll get back to you soon."
      );

      form.reset();
    } catch (error) {
      showToast(
        "Error",
        "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="bg-[url('/Img/Contact_Header.jpg')] bg-cover bg-center">
    <div className=" py-8 flex items-center justify-center bg-[#E32121]/45 ">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
          toast.variant === "error" 
            ? "bg-red-500 text-white" 
            : "bg-green-500 text-white"
        }`}>
          <div className="font-semibold">{toast.title}</div>
          <div className="text-sm">{toast.description}</div>
        </div>
      )}

      <div className="w-full max-w-2xl bg-white border border-black shadow-lg rounded-none p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First and Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...form.register("firstName")}
                placeholder="First Name"
                className="w-full h-14  border border-black rounded-none text-lg placeholder:text-black/50 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {form.formState.errors.firstName && (
                <p className="text-red-600 text-sm mt-1">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            
            <div>
              <input
                {...form.register("lastName")}
                placeholder="Last Name"
                className="w-full h-14  border border-black rounded-none text-lg placeholder:text-black/50 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {form.formState.errors.lastName && (
                <p className="text-red-600 text-sm mt-1">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <input
              {...form.register("email")}
              type="email"
              placeholder="Email"
              className="w-full h-14  border border-black rounded-none text-lg placeholder:text-black/50 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {form.formState.errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <input
              {...form.register("phoneNumber")}
              type="tel"
              placeholder="Phone Number"
              className="w-full h-14  border border-black rounded-none text-lg placeholder:text-black/50 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <textarea
              {...form.register("message")}
              placeholder="Leave us a Message"
              className="w-full min-h-[200px]  border border-black rounded-none text-lg placeholder:text-black/50 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {form.formState.errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-xl font-normal rounded-none border-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}