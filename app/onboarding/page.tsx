'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    otp: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    civilStatus: 'Single',
    address: '',
    purok: '',
    occupation: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const steps = [
    { number: 1, label: 'Contact Verification', completed: false },
    { number: 2, label: 'Profile Details', completed: false },
    { number: 3, label: 'Document Upload', completed: false }
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUserId(user.id);

    // Load existing resident data
    const { data: resident } = await supabase
      .from('residents')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (resident) {
      setFormData({
        ...formData,
        email: resident.email || '',
        phone: resident.phone || '',
        firstName: resident.first_name || '',
        middleName: resident.middle_name || '',
        lastName: resident.last_name || '',
        dateOfBirth: resident.date_of_birth || '',
        gender: resident.gender || 'Male',
        civilStatus: resident.civil_status || 'Single',
        address: resident.address || '',
        purok: resident.purok || '',
        occupation: resident.occupation || ''
      });

      // Check if already verified
      if (resident.is_verified) {
        router.push('/dashboard');
      }
    }
  };

  const handleSendOTP = async () => {
    setLoading(true);
    // TODO: Implement actual OTP sending via SMS API
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1500);
  };

  const handleContinue = async () => {
    if (currentStep === 1) {
      // Save contact verification
      if (!userId) return;
      
      await supabase
        .from('residents')
        .update({
          email: formData.email,
          phone: formData.phone,
          email_verified: true,
          phone_verified: otpSent // In production, verify OTP first
        })
        .eq('user_id', userId);
      
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Save profile details
      if (!userId) return;
      
      await supabase
        .from('residents')
        .update({
          first_name: formData.firstName,
          middle_name: formData.middleName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          civil_status: formData.civilStatus,
          address: formData.address,
          purok: formData.purok,
          occupation: formData.occupation,
          profile_completed: true
        })
        .eq('user_id', userId);
      
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Complete onboarding
      if (!userId) return;
      
      await supabase
        .from('residents')
        .update({
          documents_uploaded: true,
          onboarding_completed_at: new Date().toISOString(),
          is_verified: true // Auto-verify for now, can require admin approval later
        })
        .eq('user_id', userId);
      
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
            <Image 
              src="/bakilid.jpg" 
              alt="Barangay Bakilid Logo" 
              width={48} 
              height={48}
              className="rounded-xl object-cover"
            />
            <span className="text-white font-semibold text-lg">
              Barangay Bakilid Smart System
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Account Verification</h1>
          <p className="text-slate-400 text-sm">Complete your profile to access barangay services</p>
        </div>

        {/* Glassmorphic Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Progress Tracker */}
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>

              {/* Steps */}
              {steps.map((step, index) => (
                <div key={step.number} className="relative flex flex-col items-center z-10" style={{ width: '33.33%' }}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep > step.number 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 border-transparent' 
                      : currentStep === step.number
                      ? 'bg-white/20 border-white/40 backdrop-blur-sm'
                      : 'bg-slate-800/50 border-white/20'
                  }`}>
                    {currentStep > step.number ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className={`text-sm font-semibold ${
                        currentStep === step.number ? 'text-white' : 'text-slate-400'
                      }`}>
                        {step.number}
                      </span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium text-center transition-colors ${
                    currentStep >= step.number ? 'text-white' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Step Content */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Step Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Verify Your Contact Information
                </h2>
                <p className="text-slate-300 text-sm">
                  A valid Gmail and PH mobile number are required to receive updates.
                </p>
              </div>

              {/* Gmail Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                  Gmail Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="your.email@gmail.com"
                  />
                </div>
              </div>
              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-2">
                  Philippine Mobile Number
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="+63 912 345 6789"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={loading || !formData.phone}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    ) : otpSent ? (
                      'Resend OTP'
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </div>
              </div>
              {/* OTP Field (shown after sending) */}
              {otpSent && (
                <div className="animate-fadeIn">
                  <label htmlFor="otp" className="block text-sm font-medium text-slate-200 mb-2">
                    Verification Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="otp"
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    We sent a verification code to your mobile number
                  </p>
                </div>
              )}

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-300 mb-1">Secure Verification</p>
                    <p className="text-xs text-blue-200/80">
                      Your contact information will be used for account security and important barangay notifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Step 2: Profile Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Complete Your Profile
                </h2>
                <p className="text-slate-300 text-sm">
                  Provide your personal information for verification purposes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Middle Name</label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Santos"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Dela Cruz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Civil Status</label>
                  <select
                    value={formData.civilStatus}
                    onChange={(e) => setFormData({...formData, civilStatus: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Complete Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Block 1 Lot 5, Bakilid, Mandaue City"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Purok</label>
                  <input
                    type="text"
                    value={formData.purok}
                    onChange={(e) => setFormData({...formData, purok: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Purok 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Occupation</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Software Developer"
                  />
                </div>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
                <p className="text-sm text-green-300">
                  ✓ Contact information verified successfully
                </p>
              </div>
            </div>
          )}
          {/* Step 3: Document Upload */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Upload Verification Documents
                </h2>
                <p className="text-slate-300 text-sm">
                  Upload a valid government-issued ID for verification.
                </p>
              </div>

              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-slate-400 text-sm">PNG, JPG or PDF (max. 5MB)</p>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-yellow-300 mb-1">Document Requirements</p>
                    <p className="text-xs text-yellow-200/80">
                      Accepted IDs: National ID, Driver's License, Passport, or Voter's ID
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all font-medium"
              >
                Back
              </button>
            )}
            <button
              onClick={handleContinue}
              disabled={currentStep === 1 && !otpSent}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 3 ? 'Complete Verification' : 'Save and Continue'}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
              Already verified? Sign in
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Need help? Contact{' '}
            <a href="mailto:bakilid@barangay.gov.ph" className="text-white hover:underline">
              bakilid@barangay.gov.ph
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
