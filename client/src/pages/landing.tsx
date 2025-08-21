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
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Solutions</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Support</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/customer-portal">
                <button className="text-primary hover:text-secondary transition-colors flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </Link>
              <Link href="/customer-portal">
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
    </div>
  );
}
