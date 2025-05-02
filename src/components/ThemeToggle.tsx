import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import useTheme from "../hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {themes.map((themeOption) => (
              <Menu.Item key={themeOption.value}>
                {({ active }) => (
                  <button
                    onClick={() =>
                      setTheme(themeOption.value as "light" | "dark")
                    }
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } ${
                      theme === themeOption.value ? "font-bold" : ""
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    {themeOption.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ThemeToggle;
