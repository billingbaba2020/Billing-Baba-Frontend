import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumb 
                        items={[
                            { label: 'About Us' }
                        ]} 
                    />
                    
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            About Billing Baba
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Empowering businesses with innovative software solutions to streamline 
                            operations and drive growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                To provide cutting-edge business management solutions that enable 
                                organizations to operate more efficiently, make data-driven decisions, 
                                and achieve sustainable growth in an increasingly competitive market.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We believe that every business, regardless of size, deserves access 
                                to professional-grade tools that were once only available to large corporations.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                Our Vision
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                To become the leading provider of integrated business solutions, 
                                helping millions of businesses worldwide transform their operations 
                                and achieve their full potential.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We envision a future where technology seamlessly integrates with 
                                business processes, making complex operations simple and intuitive.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Why Choose Billing Baba?
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Reliability</h3>
                                <p className="text-gray-600">
                                    Built with enterprise-grade technology ensuring 99.9% uptime and data security.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                                <p className="text-gray-600">
                                    Continuously evolving with the latest technology trends and user feedback.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Support</h3>
                                <p className="text-gray-600">
                                    24/7 customer support to ensure you never face any issues alone.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">
                                Ready to Transform Your Business?
                            </h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                Join thousands of businesses that have already transformed their operations 
                                with Billing Baba. Start your journey today.
                            </p>
                            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}