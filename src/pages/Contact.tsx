import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { SOCIAL_LINKS, BehanceIcon, LinkedinIcon, InstagramIcon, TiktokIcon, WhatsappIcon } from '../App';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("workwithdan6@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+2348164154662");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
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
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Let's Work Together</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Ready to elevate your brand identity or need standout digital content? Drop a message below and I will get back to you as soon as possible.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="flex flex-col justify-between space-y-8 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-lg border border-slate-200 dark:border-slate-800"
        >
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Contact Details</h3>
            
            <div className="flex items-start gap-4">
              <div className="bg-white dark:bg-slate-950 p-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                <Phone className="text-slate-700 dark:text-slate-350" size={24} />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-slate-500 mb-1">Phone</p>
                <div className="flex items-center gap-3">
                  <a href="tel:+2348164154662" className="text-lg font-semibold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    +2348164154662
                  </a>
                  <button 
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer relative"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? <Check className="text-emerald-500" size={16} /> : <Copy size={16} />}
                    {/* Tooltip */}
                    <AnimatePresence>
                      {copiedPhone && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: -5 }}
                          exit={{ opacity: 0, scale: 0.8, y: 5 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap font-medium z-10"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white dark:bg-slate-950 p-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                <Mail className="text-slate-700 dark:text-slate-350" size={24} />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-slate-500 mb-1">Email</p>
                <div className="flex items-center gap-3">
                  <a href="mailto:workwithdan6@gmail.com" className="text-lg font-semibold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    workwithdan6@gmail.com
                  </a>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer relative"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="text-emerald-500" size={16} /> : <Copy size={16} />}
                    {/* Tooltip */}
                    <AnimatePresence>
                      {copiedEmail && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: -5 }}
                          exit={{ opacity: 0, scale: 0.8, y: 5 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap font-medium z-10"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white dark:bg-slate-950 p-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-800 flex-shrink-0">
                <MapPin className="text-slate-700 dark:text-slate-350" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Location</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Connections */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-8">
            <p className="text-sm font-medium text-slate-500 mb-3">Connect on Socials</p>
            <div className="flex items-center space-x-4">
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-full shadow-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.behance} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-full shadow-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Behance"
              >
                <BehanceIcon size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-full shadow-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <TiktokIcon size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-full shadow-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsappIcon size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-full shadow-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
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
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg p-8 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-350 mb-2">Message Sent Successfully!</h3>
              <p className="text-emerald-800 dark:text-emerald-400 mb-6">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-350 px-4 py-3 rounded-md text-sm font-medium">
                  {errorMessage}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">First Name *</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white" 
                    placeholder="John" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white" 
                    placeholder="Doe" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white" 
                  placeholder="john@example.com" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message *</label>
                <textarea 
                  rows={5} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none" 
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className={`w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium py-4 rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {status === 'loading' ? (
                  <>
                    Sending...
                    <svg className="animate-spin h-5 w-5 text-white dark:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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