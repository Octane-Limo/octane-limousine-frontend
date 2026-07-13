import React, { useState, useEffect } from "react";
import "./ContactBanner.css";
import { GoArrowUpRight } from "react-icons/go";
import { CheckCircle, X, AlertCircle } from "lucide-react";

const ContactBanner = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Get base URL from environment
  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE || "https://octane-limousine-backend.vercel.app";

  // Toast auto hide effect
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill all required fields", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseURL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Reset form on successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        showToast("Message sent successfully!", "success");

      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className="fixed top-4 right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out"
          style={{
            background: toast.type === 'success'
              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
          )}
          <span className="text-white font-medium">{toast.message}</span>
          <button
            onClick={hideToast}
            className="text-white hover:text-gray-200 transition-colors ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <section className="contact-banner-sec">
        <div className="container contact-banner-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-banner-content">
                <h3>Contact us</h3>
                <h1>
                  Get in <span>touch with us</span>. We're <br className="desktop-only" /> here to assist
                  you.
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <input
                        type="number"
                        name="phone"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      ></textarea>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          opacity: isSubmitting ? 0.7 : 1,
                          cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            Sending...
                            <div className="ml-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin inline-block"></div>
                          </>
                        ) : (
                          <>
                            Leave a Message <GoArrowUpRight size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default ContactBanner;