import { Sparkle } from "lucide-react";
import Image from "next/image";

export default function SecondView() {
    return (
        <div className="relative flex flex-col w-[100vw] bg-theme-green">
            <section className="relative sticky top-0 w-full min-h-[100vh] flex flex-col w-full gap-4 md:gap-10 py-10 md:py-32 px-10 md:px-36 lg:px-72 2xl:px-150 items-center justify-center text-black items-center overflow-hidden">
                <img
                    src="/images/bg/overlay-otter.svg"
                    className="absolute inset-0 top-0 bottom-0 left-0 right-0 w-full object-cover opacity-50 z-0 pointer-events-none"
                    alt=""
                />
                <div className="absolute inset-0 top-0 flex flex-row items-end justify-end p-10 lg:p-32 opacity-10 text-end">
                    <h1 className="text-8xl lg:text-9xl font-black font-serif">Happy<br />Birthday!</h1>
                </div>
                <div className="relative z-10 flex flex-col items-center gap-4 md:gap-10">
                    <div className="flex flex-col gap-2 w-full text-center">
                        <h1 className="text-2xl md:text-4xl 2xl:text-8xl font-serif color-theme-text">On your birthday,</h1>
                    </div>
                    <p className="md:text-xl 2xl:text-4xl">my heart is full of wishes for you. I wish for your life to be an endless stream of joy, love, and peace. I pray for your good health and that the universe grants you the very best of everything, just as you’ve asked in your own prayers. I want the days of feeling empty or downhearted to be over, replaced by a life that feels full and bright.</p>
                    <p className="md:text-xl 2xl:text-4xl w-full">Thank you for being my rock and my "Otter." I wish for us to walk this path together forevermore.</p>
                    <p className="md:text-xl 2xl:text-4xl font-serif italic">Happy Birthday, Daffa! I’m so incredibly lucky you’re mine. ❤️</p>
                </div>
            </section>
        </div>
    )
}