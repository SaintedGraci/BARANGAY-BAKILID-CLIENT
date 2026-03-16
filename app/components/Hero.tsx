import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1F7A63 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
            <div className="w-2 h-2 bg-[#1F7A63] rounded-full"></div>
            Digital Barangay Services
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Digital Services for{' '}
            <span className="text-[#1F7A63]">Barangay Bakilid</span>{' '}
            Residents
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Access government services online. Request official documents, stay informed with community announcements, 
            and manage your resident information through our secure digital platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/#services"
              className="px-8 py-4 bg-[#1F7A63] text-white rounded-lg hover:bg-[#196854] transition-all font-semibold text-center shadow-lg hover:shadow-xl"
            >
              Request a Document
            </Link>
            <Link 
              href="/#announcements"
              className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#1F7A63] hover:text-[#1F7A63] transition-all font-semibold text-center"
            >
              View Announcements
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1F7A63] mb-2">500+</div>
              <div className="text-sm text-gray-600 font-medium">Registered Residents</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-4xl font-bold text-[#2F6FED] mb-2">1,000+</div>
              <div className="text-sm text-gray-600 font-medium">Documents Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Online Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  );
}
