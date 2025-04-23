import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or sign in if you already have an account
          </p>
        </div>
        
        <div className="mt-8">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-sm normal-case',
                footerActionLink: 'text-blue-500 hover:text-blue-600',
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
}