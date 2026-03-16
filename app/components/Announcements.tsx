import Link from 'next/link';

const announcements = [
  {
    title: 'Community Clean-Up Drive',
    date: 'March 20, 2026',
    preview: 'Join us for our monthly community clean-up drive. All residents are encouraged to participate in keeping our barangay clean and sustainable.',
    category: 'Event'
  },
  {
    title: 'New Document Request System',
    date: 'March 15, 2026',
    preview: 'We have launched our new online document request system. Residents can now request barangay clearances and certificates digitally.',
    category: 'Announcement'
  },
  {
    title: 'Barangay Assembly Meeting',
    date: 'March 10, 2026',
    preview: 'Monthly barangay assembly meeting scheduled for March 25, 2026. All residents are invited to attend and participate in community discussions.',
    category: 'Meeting'
  }
];

const categoryStyles: Record<string, string> = {
  Event: 'bg-[#1F7A63] text-white',
  Announcement: 'bg-[#2F6FED] text-white',
  Meeting: 'bg-gray-700 text-white'
};

export default function Announcements() {
  return (
    <section id="announcements" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Announcements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest news and updates from Barangay Bakilid
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {announcements.map((announcement, index) => (
            <article
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Category Badge & Date */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-md text-xs font-semibold ${categoryStyles[announcement.category]}`}>
                  {announcement.category}
                </span>
                <span className="text-sm text-gray-500">{announcement.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {announcement.title}
              </h3>

              {/* Preview */}
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {announcement.preview}
              </p>

              {/* Read More Link */}
              <Link
                href={`/announcements/${index + 1}`}
                className="inline-flex items-center text-[#1F7A63] font-semibold hover:text-[#196854] transition-colors text-sm"
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/announcements"
            className="inline-block px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#1F7A63] hover:text-[#1F7A63] transition-all font-semibold"
          >
            View All Announcements
          </Link>
        </div>
      </div>
    </section>
  );
}
