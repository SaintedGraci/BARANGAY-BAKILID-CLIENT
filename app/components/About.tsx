import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(15, 23, 42) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full mb-4">
            <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              About Us
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Barangay Bakilid
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl">
            A progressive community committed to digital transformation and excellent public service
          </p>
        </div>

        {/* Bento Grid Layout - 12 Column Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          
          {/* Large Card - Mission & Vision (Spans 8 columns) */}
          <div className="md:col-span-8 bg-white/70 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To provide accessible, efficient, and transparent barangay services through digital innovation, 
                  fostering a connected and empowered community where every resident can easily access the services 
                  they need, anytime and anywhere.
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  A progressive, digitally-enabled barangay where technology bridges the gap between government 
                  and citizens, creating a more responsive, inclusive, and sustainable community for all residents 
                  of Bakilid.
                </p>
              </div>
            </div>
          </div>

          {/* Logo Card (Spans 4 columns) */}
          <div className="md:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700/50 hover:scale-[1.02] transition-all duration-500 flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <Image 
                src="/bakilid.jpg" 
                alt="Barangay Bakilid Logo" 
                width={120} 
                height={120}
                className="rounded-2xl object-cover shadow-2xl ring-4 ring-white/10"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Barangay Bakilid</h3>
            <p className="text-slate-300 mb-6">Mandaue City, Cebu</p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6"></div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-slate-400">Residents</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-slate-400">Access</div>
              </div>
            </div>
          </div>

          {/* Statistics Cards (3 cards spanning 4 columns each) */}
          <div className="md:col-span-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-5xl font-bold text-white mb-2">24/7</div>
            <div className="text-lg text-white/90 font-medium">Online Availability</div>
            <p className="text-sm text-white/70 mt-2">Access services anytime, anywhere</p>
          </div>

          <div className="md:col-span-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="text-5xl font-bold text-white mb-2">100%</div>
            <div className="text-lg text-white/90 font-medium">Secure Platform</div>
            <p className="text-sm text-white/70 mt-2">Protected with encryption</p>
          </div>

          <div className="md:col-span-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="text-5xl font-bold text-white mb-2">Fast</div>
            <div className="text-lg text-white/90 font-medium">Quick Processing</div>
            <p className="text-sm text-white/70 mt-2">Efficient digital workflows</p>
          </div>

          {/* Leadership Section (Spans 12 columns) */}
          <div className="md:col-span-12 bg-white/70 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Barangay Leadership</h3>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Barangay Captain */}
              <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 hover:border-green-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-1">Barangay Captain</h4>
                    <p className="text-slate-600 mb-3">Chief Executive Officer</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Leading our community with dedication, transparency, and a commitment to digital transformation 
                      for better public service delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Barangay Council */}
              <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-1">Barangay Council</h4>
                    <p className="text-slate-600 mb-3">Legislative Body</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Collaborative governance working together for community development, policy-making, 
                      and ensuring responsive local government.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
