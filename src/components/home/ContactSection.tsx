import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { MapPin, Phone, Mail, Clock, Send, AlertCircle } from 'lucide-react';
import { sanitizeInput, isValidEmail, formRateLimiter, generateCSRFToken } from '../../utils/security';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    csrfToken: generateCSRFToken()
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Visit Us',
      info: 'Area 14/81 Lingadzi Crescent Road, Lilongwe, Malawi',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Call Us',
      info: '+265 88 55 89 782',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Us',
      info: 'hello@dffrnt.com',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Working Hours',
      info: 'Mon-Fri: 8am - 6pm',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientId = 'contact-form'; // In a real app, use IP or user ID
    if (!formRateLimiter.isAllowed(clientId)) {
      setErrors({ form: 'Too many attempts. Please wait before submitting again.' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, send data to your backend
      console.log('Form submitted:', {
        ...formData,
        timestamp: new Date().toISOString()
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        csrfToken: generateCSRFToken()
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrors({ form: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary-950 text-white">
      <Container>
        <SectionTitle
          title="Get In Touch"
          subtitle="Ready to stand out? Contact us today and let's create something amazing together."
          centered
          light
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <div className="text-primary">{item.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="text-gray-400">{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124414.4585909055!2d33.699754326538574!3d-13.946886724813227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d31f3c483e7f%3A0xc8f065269701a668!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2sus!4v1694606138979!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DFFRNT Office Location"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-secondary-900 p-8 rounded-xl"
              noValidate
            >
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                  <p className="text-green-400">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {errors.form && (
                <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                  <p className="text-red-400">{errors.form}</p>
                </div>
              )}

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-secondary-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white ${
                      errors.name ? 'border-red-500' : 'border-secondary-700'
                    }`}
                    placeholder="John Doe"
                    required
                    maxLength={100}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-secondary-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white ${
                      errors.email ? 'border-red-500' : 'border-secondary-700'
                    }`}
                    placeholder="john@example.com"
                    required
                    maxLength={255}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-secondary-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white ${
                      errors.subject ? 'border-red-500' : 'border-secondary-700'
                    }`}
                    placeholder="How can we help you?"
                    required
                    maxLength={200}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-secondary-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white resize-vertical ${
                      errors.message ? 'border-red-500' : 'border-secondary-700'
                    }`}
                    placeholder="Tell us about your project..."
                    required
                    maxLength={1000}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </motion.div>

                <input
                  type="hidden"
                  name="csrfToken"
                  value={formData.csrfToken}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full flex justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-secondary-950 mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" /> Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};