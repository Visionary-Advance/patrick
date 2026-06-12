'use client'

import { useState } from "react";
import { Upload } from "lucide-react";
import Button from "@/Components/Button";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function SharePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    workedBefore: "",
    experience: "",
    photo: null,
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: "" });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, workedBefore: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ show: false, success: false, message: "" });

    try {
      if (!executeRecaptcha) {
        setSubmitStatus({ show: true, success: false, message: "reCAPTCHA not ready. Please try again." });
        setIsSubmitting(false);
        return;
      }
      const recaptchaToken = await executeRecaptcha('submit_experience');

      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('recaptchaToken', recaptchaToken);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('workedBefore', formData.workedBefore);
      formDataToSend.append('experience', formData.experience);

      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }

      const response = await fetch('/api/submit-experience', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit experience');
      }

      setSubmitStatus({
        show: true,
        success: true,
        message: "Thank you for sharing your experience! We'll be in touch soon."
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        workedBefore: "",
        experience: "",
        photo: null,
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: "" });
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        show: true,
        success: false,
        message: "Something went wrong. Please try again."
      });

      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: "" });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <>
    {/* Toast Notification */}
    {submitStatus.show && (
      <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
        submitStatus.success
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      }`}>
        <div className="text-sm">{submitStatus.message}</div>
      </div>
    )}

    <div className="mx-auto mt-40 mb-10 text-center text-black jomol">
        <h1 className="text-4xl">Share your experience with us!</h1>
    </div>
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="bg-form-background border border-form-border shadow-lg font-jomolhari"
          style={{
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            padding: "42px 30px 30px 30px",
          }}
        >
          {/* Name Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full h-14 px-4 border border-form-border bg-form-background text-form-text placeholder-form-placeholder text-xl font-jomolhari focus:outline-none focus:ring-2 focus:ring-form-border"
                style={{
                  color: formData.firstName ? "#000" : "rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full h-14 px-4 border border-form-border bg-form-background text-form-text placeholder-form-placeholder text-xl font-jomolhari focus:outline-none focus:ring-2 focus:ring-form-border"
                style={{
                  color: formData.lastName ? "#000" : "rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
          </div>

          {/* Radio Button Question */}
          <div className="mb-10">
            <h3 className="text-xl font-jomolhari text-form-text mb-8">
              Have you worked for PatRick in the past?
            </h3>
            <div className="space-y-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="workedBefore"
                    value="yes"
                    checked={formData.workedBefore === "yes"}
                    onChange={() => handleRadioChange("yes")}
                    className="sr-only"
                  />
                  <div className="w-6 h-6 border border-black rounded-full flex items-center justify-center">
                    {formData.workedBefore === "yes" && (
                      <div className="w-4 h-4 bg-black rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="ml-4 text-xl font-jomolhari text-form-text">
                  Yes
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="workedBefore"
                    value="no"
                    checked={formData.workedBefore === "no"}
                    onChange={() => handleRadioChange("no")}
                    className="sr-only"
                  />
                  <div className="w-6 h-6 border border-black rounded-full flex items-center justify-center">
                    {formData.workedBefore === "no" && (
                      <div className="w-4 h-4 bg-black rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="ml-4 text-xl font-jomolhari text-form-text">
                  No
                </span>
              </label>
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-10">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email (Optional)"
              className="w-full h-14 px-4 border border-form-border bg-form-background text-form-text placeholder-form-placeholder text-xl font-jomolhari focus:outline-none focus:ring-2 focus:ring-form-border"
              style={{ color: formData.email ? "#000" : "rgba(0, 0, 0, 0.5)" }}
            />
          </div>

          {/* Phone Field */}
          <div className="mb-10">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full h-14 px-4 border border-form-border bg-form-background text-form-text placeholder-form-placeholder text-xl font-jomolhari focus:outline-none focus:ring-2 focus:ring-form-border"
              style={{ color: formData.phone ? "#000" : "rgba(0, 0, 0, 0.5)" }}
            />
          </div>

          {/* Experience Textarea */}
          <div className="mb-10">
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Share your Experience!"
              rows={8}
              className="w-full p-4 border border-form-border bg-form-background text-form-text placeholder-form-placeholder text-xl font-jomolhari resize-none focus:outline-none focus:ring-2 focus:ring-form-border"
              style={{
                color: formData.experience ? "#000" : "rgba(0, 0, 0, 0.5)",
                minHeight: "246px",
              }}
            />
          </div>

          {/* File Upload */}
          <div className="mb-10">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                w-full border border-dashed border-form-border bg-form-background
                flex flex-col items-center justify-center py-16 px-4 cursor-pointer
                transition-colors duration-200
                ${isDragOver ? "bg-gray-200" : ""}
              `}
              style={{ minHeight: "246px" }}
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload size={60} className="text-form-text mb-6" />
              <span className="text-xl font-jomolhari text-form-text">
                {formData.photo ? formData.photo.name : "Upload a photo"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
           <Button
             type='submit'
             text={isSubmitting ? "SUBMITTING..." : "SUBMIT"}
             color={`bg-[#E32121] w-full text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
             disabled={isSubmitting}
           />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}