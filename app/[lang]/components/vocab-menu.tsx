"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Example() {
  const [open, setOpen] = useState(false);

  const openSlideOver = () => {
    setOpen(true);
  };

  const closeSlideOver = () => {
    setOpen(false);
  };

  return (
    <div className="relative z-10">
      <button
        type="button"
        className="fixed bottom-4 right-4 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        onClick={openSlideOver}
      >
        Open
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeSlideOver}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-2 bottom-6 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={closeSlideOver}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Panel title
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <ul>
                          <li>
                            <strong>English:</strong> Apple{" "}
                            <span>(Japanese: りんご)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Banana{" "}
                            <span>(Japanese: バナナ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Cat{" "}
                            <span>(Japanese: 猫)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Dog{" "}
                            <span>(Japanese: 犬)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Elephant{" "}
                            <span>(Japanese: 象)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Flower{" "}
                            <span>(Japanese: 花)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Guitar{" "}
                            <span>(Japanese: ギター)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Hat{" "}
                            <span>(Japanese: 帽子)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Ice Cream{" "}
                            <span>(Japanese: アイスクリーム)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Jellyfish{" "}
                            <span>(Japanese: クラゲ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Kangaroo{" "}
                            <span>(Japanese: カンガルー)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Lemon{" "}
                            <span>(Japanese: レモン)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Monkey{" "}
                            <span>(Japanese: 猿)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Notebook{" "}
                            <span>(Japanese: ノート)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Orange{" "}
                            <span>(Japanese: オレンジ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Penguin{" "}
                            <span>(Japanese: ペンギン)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Quokka{" "}
                            <span>(Japanese: クオッカ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Rabbit{" "}
                            <span>(Japanese: ウサギ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Strawberry{" "}
                            <span>(Japanese: いちご)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Tiger{" "}
                            <span>(Japanese: 虎)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Umbrella{" "}
                            <span>(Japanese: 傘)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Violin{" "}
                            <span>(Japanese: バイオリン)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Watermelon{" "}
                            <span>(Japanese: スイカ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Xylophone{" "}
                            <span>(Japanese: シロフォン)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Yak{" "}
                            <span>(Japanese: ヤク)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Zebra{" "}
                            <span>(Japanese: ゼブラ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Apple{" "}
                            <span>(Japanese: りんご)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Banana{" "}
                            <span>(Japanese: バナナ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Cat{" "}
                            <span>(Japanese: 猫)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Dog{" "}
                            <span>(Japanese: 犬)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Elephant{" "}
                            <span>(Japanese: 象)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Flower{" "}
                            <span>(Japanese: 花)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Guitar{" "}
                            <span>(Japanese: ギター)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Hat{" "}
                            <span>(Japanese: 帽子)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Ice Cream{" "}
                            <span>(Japanese: アイスクリーム)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Jellyfish{" "}
                            <span>(Japanese: クラゲ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Kangaroo{" "}
                            <span>(Japanese: カンガルー)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Lemon{" "}
                            <span>(Japanese: レモン)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Monkey{" "}
                            <span>(Japanese: 猿)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Notebook{" "}
                            <span>(Japanese: ノート)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Orange{" "}
                            <span>(Japanese: オレンジ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Penguin{" "}
                            <span>(Japanese: ペンギン)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Quokka{" "}
                            <span>(Japanese: クオッカ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Rabbit{" "}
                            <span>(Japanese: ウサギ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Strawberry{" "}
                            <span>(Japanese: いちご)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Tiger{" "}
                            <span>(Japanese: 虎)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Umbrella{" "}
                            <span>(Japanese: 傘)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Violin{" "}
                            <span>(Japanese: バイオリン)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Watermelon{" "}
                            <span>(Japanese: スイカ)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Xylophone{" "}
                            <span>(Japanese: シロフォン)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Yak{" "}
                            <span>(Japanese: ヤク)</span>
                          </li>
                          <li>
                            <strong>English:</strong> Zebra{" "}
                            <span>(Japanese: ゼブラ)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
