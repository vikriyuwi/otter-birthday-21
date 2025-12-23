import { Sparkle } from "lucide-react";
import Image from "next/image";

export default function FirstView() {
    return (
        <div className="relative flex flex-col w-[100vw] bg-theme-green">
            <section className="relative sticky top-0 w-full min-h-[100vh] flex flex-col w-full gap-4 md:gap-10 py-10 md:py-32 px-10 md:px-36 lg:px-54 xl:px-100 2xl:px-100 items-center justify-center text-black items-center overflow-hidden">
                <img
                    src="/images/bg/overlay-otter.svg"
                    className="absolute inset-0 top-0 bottom-0 left-0 right-0 w-full object-cover opacity-50 z-0 pointer-events-none"
                    alt=""
                />
                <div className="relative z-10 flex flex-col items-center gap-4 md:gap-10">
                    <h1 className="text-4xl md:text-8xl 2xl:text-8xl">🦦</h1>
                    <div className="flex flex-col gap-2 w-full text-center">
                        <h1 className="text-2xl md:text-4xl 2xl:text-8xl font-serif color-theme-text">Dear, Otter.</h1>
                        <h1 className="md:text-xl 2xl:text-4xl opacity-50">the boy with the kindest soul and the biggest heart</h1>
                    </div>
                    <p className="md:text-xl 2xl:text-4xl">From the very first moment I met you, you left such a mark on me. I remember thinking how lovely and clever you were, you just had this way of moving through life knowing exactly what you were doing and where you were going. That confidence, mixed with your gentle nature, is what makes you so uniquely you.</p>
                    <div className="flex ps-10 2xl:px-20 md:text-xl 2xl:text-4xl">
                        Watching you move through the world with inspires me every day. But what I love most and what I know everyone around you feels is your soft heart. You give your absolute best to everything you do, and you carry a heart so big it feels like home.
                    </div>
                    <p className="md:text-xl 2xl:text-4xl font-serif italic">Look how cool you are!</p>
                </div>
            </section>
            <div className="z-10 grid grid-cols-3 w-full mb-[100vh] px-10 jutify-between">
                <div className="flex flex-col gap-20 items-start">
                    <Image src={"/images/square/2.jpg"} width={250} height={200} alt="Otter" />
                    <Image src={"/images/square/3.jpg"} width={150} height={200} alt="Otter" />
                    <Image src={"/images/square/1.jpg"} width={350} height={200} alt="Otter" className="ms-10" />
                    <Image src={"/images/square/4.jpg"} width={200} height={200} alt="Otter" className="ms-20" />
                </div>
                <div className="flex flex-col items-start">

                </div>
                <div className="flex flex-col gap-20 items-end">
                    <Image src={"/images/square/5.jpg"} width={350} height={200} alt="Otter" />
                    <Image src={"/images/square/6.jpg"} width={200} height={200} alt="Otter" className="me-10" />
                    <Image src={"/images/square/7.jpg"} width={200} height={200} alt="Otter" />
                    <Image src={"/images/square/8.jpg"} width={350} height={200} alt="Otter" className="me-20" />
                </div>
            </div>
        </div>
    )
}