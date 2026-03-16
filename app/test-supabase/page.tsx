import { createClient } from '@/lib/supabase/server'

export default async function TestSupabasePage() {
  const supabase = await createClient()
  
  // Test connection by checking auth
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  // Test database connection
  let dbTest = null
  let dbError = null
  
  try {
    const { data, error } = await supabase
      .from('residents')
      .select('count')
      .limit(1)
    
    dbTest = data
    dbError = error
  } catch (e: any) {
    dbError = e
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Supabase Connection Test
          </h1>

          {/* Connection Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Connection Status
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-medium">
                Supabase client initialized successfully
              </span>
            </div>
          </div>

          {/* Configuration */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Configuration
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-gray-600 font-medium min-w-[120px]">Project URL:</span>
                <span className="text-gray-900 font-mono text-sm break-all">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 font-medium min-w-[120px]">Anon Key:</span>
                <span className="text-gray-900 font-mono text-sm break-all">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 50)}...
                </span>
              </div>
            </div>
          </div>

          {/* Auth Test */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Authentication Test
            </h2>
            {authError ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <span className="font-semibold">Status:</span> No user logged in (this is normal)
                </p>
              </div>
            ) : user ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  <span className="font-semibold">User ID:</span> {user.id}
                </p>
                <p className="text-green-800">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600">No user currently logged in</p>
              </div>
            )}
          </div>

          {/* Database Test */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Database Test
            </h2>
            {dbError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold mb-2">Database Error:</p>
                <p className="text-red-700 text-sm font-mono">
                  {dbError.message || JSON.stringify(dbError)}
                </p>
                <p className="text-red-600 text-sm mt-3">
                  This is expected if you haven't created the 'residents' table yet.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  ✓ Database connection successful!
                </p>
                {dbTest && (
                  <p className="text-green-700 text-sm mt-2">
                    Query executed successfully
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Next Steps
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Create your database tables in Supabase Dashboard</li>
              <li>Set up Row Level Security (RLS) policies</li>
              <li>Configure authentication providers</li>
              <li>Start building your application!</li>
            </ol>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <a 
                href="https://supabase.com/dashboard/project/poihxyhqtvkcvcstkyhe" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Open Supabase Dashboard
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <a 
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
