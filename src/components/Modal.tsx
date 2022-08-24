// import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Props } from '@headlessui/react/dist/types';
import { Fragment, useState, Dispatch, SetStateAction } from 'react'
interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title?: string;
    children?: React.ReactNode;
}

// const Modal: React.FC<IProps> = (props) => {
//     return (
//         <div className={`fixed left-0 top-0 w-full h-screen bg-black overflow-auto z-10 
//             place-items-center transition ease-in-out duration-1000
//              ${props.show ? "grid opacity-100" : "hidden opacity-0"}`} //active:opacity-100 active:visible
//         >
//             <div className={`min-h-0 w-auto m-5 bg-white rounded-lg ${props.show ? "opacity-1" : "opacity-0"}`}>
//                 {props.children}
//             </div>
//         </div>  
//     )
// }



const Modal: React.FC<IProps> = (props) => {

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => props.setIsOpen(false)}>
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
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {props.title}
                </Dialog.Title>
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent
                    you an email with all of the details of your order.
                  </p>
                </div> */}
                {props.children}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => props.setIsOpen(false)}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}


export default Modal