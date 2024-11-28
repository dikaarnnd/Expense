import { Link } from '@inertiajs/react';
export default function NavBar() {
    return (
        <header className="text-gray-600">
            <div className="container mx-auto flex flex-col items-center p-5 md:flex-row">
                <a className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-10 w-10 rounded-full bg-indigo-500 p-2 text-white"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">Tailblocks</span>
                </a>
                <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
                    <a className="mr-5 hover:text-gray-900">First Link</a>
                    <a className="mr-5 hover:text-gray-900">Second Link</a>
                    <a className="mr-5 hover:text-gray-900">Third Link</a>
                    <a className="mr-5 hover:text-gray-900">Fourth Link</a>
                </nav>
                <Link 
                  href={route('register')}
                  class="mt-4 inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none md:mt-0" >
                  Register
                </Link>
            </div>
        </header>
    );
}
