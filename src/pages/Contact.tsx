import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (First Name, Email, and Message).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
      
      if (accessKey === "YOUR_ACCESS_KEY_HERE") {
        throw new Error("Web3Forms Access Key is not configured. Please add VITE_WEB3FORMS_ACCESS_KEY to your .env file.");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.firstName} ${formData.lastName}`
        })
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        throw new Error(data.message || "Failed to send message. Please try again later.");
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="py-12 max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Let's Work Together</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Ready to elevate your brand identity or need standout digital content? Drop a message below and I will get back to you as soon as possible.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="flex flex-col justify-center space-y-8 bg-slate-50 p-8 rounded-lg border border-slate-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Contact Details</h3>
          
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm border border-slate-200">
              <Phone className="text-slate-700" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Phone</p>
              <a href="tel:+2348164154662" className="text-lg font-semibold text-slate-900 hover:text-slate-600 transition-colors">
                +2348164154662
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm border border-slate-200">
              <Mail className="text-slate-700" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Email</p>
              <a href="mailto:workwithdan6@gmail.com" className="text-lg font-semibold text-slate-900 hover:text-slate-600 transition-colors">
                workwithdan6@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm border border-slate-200">
              <MapPin className="text-slate-700" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Location</p>
              <p className="text-lg font-semibold text-slate-900">
                Lagos, Nigeria
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.3 }}
        >
          {status === 'success' ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-emerald-950 mb-2">Message Sent Successfully!</h3>
              <p className="text-emerald-800 mb-6">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-rose-50 border border-rose-200 text-rose-900 px-4 py-3 rounded-md text-sm font-medium">
                  {errorMessage}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white" 
                    placeholder="John" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white" 
                    placeholder="Doe" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white" 
                  placeholder="john@example.com" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                <textarea 
                  rows={5} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white resize-none" 
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className={`w-full bg-slate-900 text-white font-medium py-4 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {status === 'loading' ? (
                  <>
                    Sending...
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}