import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Mail, Phone, MapPin, Clock, Check, Globe, ArrowRight, Users, MessageSquare, TrendingUp, Star, Award, Shield, Zap, Heart, Target, Rocket, Building2 } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { trackConversionWithValue } from '@/lib/conversionTracking';
import { services } from '@/config/services';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      service: '',
      message: '',
    },
  });

  // Extract service from URL query parameters and pre-populate form
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      form.setValue('service', serviceParam);
      analytics.trackServiceInterest(serviceParam, 'view');
    }
  }, [form]);

  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;
    
    document.title = 'Contact TalPro - Get Free Quote & 8-Hour Response Time | Start Your Project';
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Contact TalPro for custom software solutions. Get free quote with 8-hour response time. 2500+ successful projects, 97% satisfaction. Start your digital transformation journey today.');
    
    return () => {
      document.title = originalTitle;
      
      const currentMeta = document.querySelector('meta[name="description"]');
      if (currentMeta) {
        if (tagExisted) {
          if (originalDescription !== null) {
            currentMeta.setAttribute('content', originalDescription);
          } else {
            currentMeta.removeAttribute('content');
          }
        } else {
          currentMeta.remove();
        }
      }
    };
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data, variables) => {
      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: data.message || "Thank you for your inquiry. We'll get back to you within 8 business hours.",
      });
      
      analytics.trackContactFormSubmit({
        name: `${variables.firstName} ${variables.lastName}`,
        email: variables.email,
        company: variables.company,
        service: variables.service,
      });
      
      trackConversionWithValue('CONTACT_FORM', {
        service_interest: variables.service || 'N/A',
      });
      
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred while sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="pt-16">
      {/* Gradient Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">CONTACT US</span>
                Ready to Start Your Project
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Let's Build</span><br />
                Something<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">Amazing</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your vision into reality with our expert team. We'll get back to you within 8 hours 
                with a detailed proposal and next steps to accelerate your success.
              </p>
              
              {/* Response Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-response">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">8H</div>
                  <div className="text-xs text-white/70">Response Time</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-satisfaction">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">97%</div>
                  <div className="text-xs text-white/70">Satisfaction</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-projects">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">2500+</div>
                  <div className="text-xs text-white/70">Projects</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-experience">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">15+</div>
                  <div className="text-xs text-white/70">Years Exp</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg"
                  onClick={() => {
                    const formSection = document.getElementById('contact-form');
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  data-testid="button-start-project"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button 
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105"
                  onClick={() => {
                    // Schedule call functionality
                    const formSection = document.getElementById('contact-form');
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  data-testid="button-schedule-call"
                >
                  Schedule Free Call
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional team collaboration and communication workspace" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Ready to Help</span>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-800">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">GET IN TOUCH</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Start Your Digital</span><br />
              <span className="text-foreground">Transformation Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to discuss your project? Fill out the form below or use our contact information to get in touch directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Modern Contact Form */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl rounded-3xl p-8 relative">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow shadow-lg">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Thank You!</span>
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      We've received your message and will get back to you within 8 business hours with a detailed proposal.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)} 
                      className="btn-gradient-hover"
                      data-testid="button-send-another"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">
                          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Get In Touch</span>
                        </h3>
                        <p className="text-muted-foreground">Start your project today</p>
                      </div>
                    </div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground font-semibold">First Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John" 
                                    {...field} 
                                    className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                    data-testid="input-first-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground font-semibold">Last Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Doe" 
                                    {...field}
                                    className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                    data-testid="input-last-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Email Address *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="john@company.com" 
                                  {...field}
                                  className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Company</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Company" 
                                  {...field}
                                  className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                  data-testid="input-company"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Service Interest</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                                name={field.name}
                              >
                                <FormControl>
                                  <SelectTrigger 
                                    className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                    data-testid="select-service"
                                  >
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="custom-software">Custom Software Development</SelectItem>
                                  <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                                  <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                                  <SelectItem value="consulting">Technology Consulting</SelectItem>
                                  {services.map((service) => (
                                    <SelectItem key={service.slug} value={service.name}>
                                      {service.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Project Details *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  rows={4}
                                  placeholder="Tell us about your project requirements, goals, timeline, and budget expectations..."
                                  className="resize-none bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                  {...field}
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full btn-gradient-hover py-4 text-lg font-semibold"
                          disabled={contactMutation.isPending}
                          data-testid="button-submit-contact"
                        >
                          {contactMutation.isPending ? (
                            <span className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Sending Message...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Send Message
                              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </div>
            </div>

            {/* Modern Contact Information */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Contact Information</span>
                </h3>
                <p className="text-muted-foreground mb-8">
                  Multiple ways to reach us. Choose what works best for you.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email Card */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-rotate shadow-lg">
                        <Mail className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-lg mb-1">Email Us</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">hello@talproindia.com</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4" />
                          We'll respond within 8 hours
                        </p>
                      </div>
                      <div className="text-green-500">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Phone Card */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/20 to-green-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-rotate shadow-lg">
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-lg mb-1">Call Us</h4>
                        <p className="text-teal-600 dark:text-teal-400 font-semibold text-lg">08040948407</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4" />
                          Monday to Friday, 9 AM - 6 PM IST
                        </p>
                      </div>
                      <div className="text-green-500">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Office Card */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-rotate shadow-lg">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-lg mb-1">Visit Our Office</h4>
                        <div className="text-muted-foreground leading-relaxed">
                          <p className="font-semibold text-foreground">TALPRO INDIA PRIVATE LIMITED</p>
                          <p>4th Floor No. 0741/A, B-BLOCK, 12th Main Road</p>
                          <p>Manipal County Rd, AECS Layout, Singasandra</p>
                          <p>Bengaluru, Karnataka 560114</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Global Presence Card */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-rotate shadow-lg">
                        <Globe className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-lg mb-1">Global Presence</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-500" />
                            🇮🇳 Bengaluru, India (Headquarters)
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-green-500" />
                            🌐 Global Remote Teams
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-purple-500" />
                            ⏰ 24/7 Support Coverage
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Trust & Performance Indicators */}
              <div className="space-y-6">
                {/* Performance Stats */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/50 dark:to-teal-950/50 backdrop-blur-lg border border-blue-200/30 dark:border-blue-800/30 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-foreground">Performance Metrics</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">8H</div>
                        <div className="text-xs text-muted-foreground">Avg Response</div>
                      </div>
                      <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">97%</div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Why Choose Talpro */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 backdrop-blur-lg border border-green-200/30 dark:border-green-800/30 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Why Choose Talpro?</h4>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center space-x-3 group/item">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-muted-foreground">15+ years of experience</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 group/item">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-muted-foreground">2500+ satisfied customers</span>
                          <div className="flex items-center gap-1 text-green-500">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs font-semibold">Growing</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 group/item">
                        <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <Target className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-muted-foreground">97% client satisfaction rate</span>
                          <div className="flex items-center gap-1 text-green-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold">Active</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 group/item">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground">ISO 9001:2015 certified</span>
                      </div>
                      <div className="flex items-center space-x-3 group/item">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground">24/7 support available</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">READY TO START?</span>
            Schedule Your Consultation
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Prefer to Schedule</span><br />
            a Free Consultation?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Book a free 30-minute consultation call with our technology experts to discuss your project requirements, 
            timeline, and get a detailed proposal with transparent pricing.
          </p>

          {/* Enhanced CTA Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Free 30-min Consultation</h3>
              <p className="text-sm text-white/70">No commitment, just expert guidance</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Detailed Proposal</h3>
              <p className="text-sm text-white/70">Custom solution with timeline & pricing</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Quick Start</h3>
              <p className="text-sm text-white/70">Begin your project within 48 hours</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg text-lg"
              onClick={() => {
                const formSection = document.getElementById('contact-form');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              data-testid="button-schedule-consultation"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button 
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 text-lg"
              onClick={() => {
                const formSection = document.getElementById('contact-form');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              data-testid="button-send-requirements"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Send Requirements
            </button>
          </div>

          <div className="mt-8 text-sm text-white/70">
            <p className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              Trusted by 2500+ businesses worldwide
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}