'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const isUser = pathname.includes('/weatherflex');
  const isAdmin = pathname.includes('/adminDashboard');

  // Define navigation outside of the if-else block to make it accessible
  const navigation = isUser 
    ? [
      { name: 'Overview', href: '/weatherflex', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: 'Profile', href: '/weatherflex/profile', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
    ]
    : isAdmin 
    ? [
      { name: 'Overview', href: '/adminDashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }
    ]
    : []; // Default to empty array if neither user nor admin

  return (
    <div className="flex h-full flex-col justify-between border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-dark">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Dashboard</h2>
        <nav className="mt-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-dark">
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200"
        >
          <svg
            className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;