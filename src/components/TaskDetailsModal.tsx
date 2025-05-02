import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Task } from "../types";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  if (!task) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Task Details
                </Dialog.Title>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">ID</p>
                  <p className="text-gray-900">{task.id}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Title</p>
                  <p className="text-gray-900 font-medium">{task.title}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-gray-900">
                    {task.description || "No description"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="text-gray-900">{task.status}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Created At</p>
                  <p className="text-gray-900">
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskDetailsModal;
