import { Link } from "wouter";
import { Signal, Shield, Clock, Lock, User, Building, BarChart3, Check, UserCheck } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Signal className="text-primary text-2xl" />
                <span className="text-xl font-bold text-primary">TeleConnect AI</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#solutions" className="text-gray-600 hover:text-primary transition-colors">Solutions</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <a href="#support" className="text-gray-600 hover:text-primary transition-colors">Support</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/customer">
                <button className="text-primary hover:text-secondary transition-colors flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </Link>
              <Link href="/customer">
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Telecom<br />
              <span className="text-primary">Onboarding Platform</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Complete KYC in 2 minutes with AI-powered document verification, face recognition, and instant SIM activation.
              Fraud detection and DigiLocker integration for seamless onboarding.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm">
                <Check className="text-success w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Real-time Document Verification</span>
              </div>
              <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm">
                <Shield className="text-primary w-5 h-5 mr-2" />
                <span className="text-sm font-medium">DigiLocker Integration</span>
              </div>
              <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm">
                <Clock className="text-secondary w-5 h-5 mr-2" />
                <span className="text-sm font-medium">AI Face Match & Liveness</span>
              </div>
              <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm">
                <Signal className="text-warning w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Instant SIM/eSIM/Dongle</span>
              </div>
              <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm">
                <Lock className="text-destructive w-5 h-5 mr-2" />
                <span className="text-sm font-medium">AI Fraud Shield</span>
              </div>
            </div>
          </div>

          {/* User Type Selection Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Customer Portal Card */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Customers (Retail)</h3>
                <p className="text-gray-600 mb-6">Buy SIM/eSIM online • Complete KYC in 2 mins • Get instant activation</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Buy SIM/eSIM online</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Complete KYC in 2 mins</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Get instant activation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">AI-powered fraud detection</span>
                  </li>
                </ul>
                <Link href="/customer">
                  <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors font-medium">
                    Start Personal Onboarding
                  </button>
                </Link>
              </div>
            </div>

            {/* Enterprise Portal Card */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Building className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Enterprises</h3>
                <p className="text-gray-600 mb-6">Bulk onboarding for employees • IoT SIMs for devices • Corporate dashboard</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Bulk onboarding for employees</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">IoT SIMs for devices</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Corporate dashboard for SIM management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Automated compliance reporting</span>
                  </li>
                </ul>
                <Link href="/enterprise">
                  <button className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-primary transition-colors font-medium">
                    Access Enterprise Portal
                  </button>
                </Link>
              </div>
            </div>

            {/* Operator Dashboard Card */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                  <BarChart3 className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Telecom Operators</h3>
                <p className="text-gray-600 mb-6">Faster customer acquisition • Fraud detection powered by AI • Regulatory compliance</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Faster customer acquisition</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Fraud detection powered by AI</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Regulatory compliance (DoT/TRAI)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-3" />
                    <span className="text-sm">Real-time monitoring dashboard</span>
                  </li>
                </ul>
                <Link href="/operator">
                  <button className="w-full bg-success text-white py-3 rounded-lg hover:bg-primary transition-colors font-medium">
                    Open Operator Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Telecom Solutions</h2>
            <p className="text-xl text-gray-600">End-to-end AI-powered platform for faster, secure customer onboarding</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Document Verification</h3>
              <p className="text-gray-600">Advanced OCR and fraud detection using Google Gemini Vision API</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Face Verification</h3>
              <p className="text-gray-600">Liveness detection and face matching for secure identity verification</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Signal className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Activation</h3>
              <p className="text-gray-600">Physical SIM, eSIM, and dongle activation with QR code generation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <div className="text-4xl font-bold text-primary mb-4">₹299<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />2GB daily data</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />Unlimited calls</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />100 SMS/day</li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg">Choose Plan</button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-primary">
              <div className="text-center mb-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold text-primary mb-4">₹499<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />5GB daily data</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />Unlimited calls & SMS</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />OTT benefits</li>
              </ul>
              <button className="w-full bg-primary text-white py-2 rounded-lg">Choose Plan</button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-primary mb-4">₹799<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />Unlimited data</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />Priority network</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-success mr-2" />Enterprise support</li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg">Choose Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">24/7 Support</h2>
            <p className="text-xl text-gray-600">Get help whenever you need it</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
              <p className="text-gray-600 mb-4">Get instant help with your SIM activation, plan changes, or technical issues.</p>
              <div className="space-y-2">
                <p className="flex items-center"><span className="font-medium mr-2">Phone:</span> 1800-XXX-XXXX</p>
                <p className="flex items-center"><span className="font-medium mr-2">Email:</span> support@teleconnect.ai</p>
                <p className="flex items-center"><span className="font-medium mr-2">Chat:</span> Available 24/7</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Enterprise Support</h3>
              <p className="text-gray-600 mb-4">Dedicated support for enterprise clients with priority handling and custom solutions.</p>
              <div className="space-y-2">
                <p className="flex items-center"><span className="font-medium mr-2">Dedicated Manager:</span> Available</p>
                <p className="flex items-center"><span className="font-medium mr-2">SLA:</span> 99.9% uptime</p>
                <p className="flex items-center"><span className="font-medium mr-2">Response:</span> &lt; 1 hour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Signal className="text-primary text-2xl" />
                <span className="text-xl font-bold">TeleConnect AI</span>
              </div>
              <p className="text-gray-400">AI-powered telecom onboarding platform for faster, secure customer acquisition.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Document Verification</li>
                <li>Face Recognition</li>
                <li>Fraud Detection</li>
                <li>SIM Activation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@teleconnect.ai</li>
                <li>1800-XXX-XXXX</li>
                <li>Live Chat</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TeleConnect AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
