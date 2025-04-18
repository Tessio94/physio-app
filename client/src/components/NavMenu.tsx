import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "O nama", href: "#about", current: false },
  { name: "Naš tim", href: "#team", current: false },
  { name: "Suradnje", href: "#partners", current: false },
  { name: "Galerije", href: "#gallery", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavMenu() {
  const location = useLocation();
  // console.log(location.pathname);

  return (
    <header>
      <Disclosure as="nav" className="border-b-2 bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Otvori glavni meni</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <Link to="/" className="flex shrink-0 items-center gap-5">
                <img
                  alt="Company Icon"
                  src="/logo.svg"
                  className="h-8 w-auto"
                />
              </Link>
              {location.pathname === "/" ? (
                <div className="hidden grow sm:ml-6 sm:block">
                  <div className="flex space-x-2 justify-self-center md:space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-slate-700 text-white"
                            : "text-slate-800 hover:bg-slate-600 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Pogledaj notifikacije</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 p-1 text-sm text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Otvori korisnički meni</span>
                    <UserIcon aria-hidden="true" className="size-6" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      to=""
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Vaš profil
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="book-now"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Rezervacija
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="prijava"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Prijava
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
        {/* computer screen */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={`/${item.href}`}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-slate-700 text-white"
                    : "text-slate-800 hover:bg-slate-600 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium",
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </header>
  );
}

export default NavMenu;
