'use client'

import BackgroundMusic from "../components/BackgroundMusic";
import ButterSmoothGalery from "../components/ButterSmoothGalery";
import CinematicScroll from "../components/CinematicScrollView";
import ElegantView from "../components/ElegantView";
import FixedCenterGallery from "../components/FixedCenterGalery";
import ImageSlideShow from "../components/ImageSlideShow";
import OtterIntroView from "../components/OtterIntroView";
import ParallaxView from "../components/ParallaxView";
import ScaleOpacityGallery from "../components/ScaleOpacityGalery";
import ScrollGallery from "../components/ScrollGalery";
import ScrollView from "../components/ScrollView";
import ScrubberView from "../components/ScrubberView";
import SweetMovementView from "../components/SweetMovement";
import SweetScrollGallery from "../components/SweetScrollGalery";
import FirstView from "../components/Texts/FirstView";
import FooterView from "../components/Texts/FooterView";
import SecondView from "../components/Texts/SecondView";

export default function ForOtterPage() {
    return (
        <div className="flex flex-col w-dvw">
            <div className="h-[100vh] flex flex-col gap-10 items-center justify-center px-20 md:px-72 text-center">
                <p className="animate-bounce text-gray-300 tracking-widest uppercase">Dedicated for Mr. Otter!</p>
                {/* <BackgroundMusic src="/music/sweet_disposition.mp3" /> */}
                <BackgroundMusic src="/music/taylor_inivisble_string.mp3" />
            </div>
            <ScrollView />
            <OtterIntroView imageSrc="/images/otter/5.jpg">
                <div className="flex flex-col w-full h-full items-center justify-end pb-32">
                    <h1 className="text-7xl md:text-9xl font-serif italic text-theme-green font-black">Otter</h1>
                    <h1 className="text-2xl md:text-4xl font-serif italic text-theme-green">a.k.a. Daffa</h1>
                </div>
            </OtterIntroView>
            <FirstView />
            <OtterIntroView imageSrc="/images/otter/2.jpg">
                <div className="flex flex-col w-full h-full items-center bg-black/50 justify-center text-center gap-4 md:gap-10 px-10 md:px-20">
                    <h1 className="text-2xl md:text-4xl font-serif italic text-theme-green">On your birthday, my heart is full</h1>
                    <h1 className="text-4xl md:text-9xl font-serif italic text-theme-green font-black">Wishes for you</h1>
                </div>
            </OtterIntroView>
            {/* <FixedCenterGallery /> */}
            {/* <ScaleOpacityGallery /> */}
            {/* <ScrollGallery /> */}
            {/* <SweetScrollGallery /> */}
            {/* <ButterSmoothGalery /> */}
            <CinematicScroll />
            <SecondView />
            {/* <SweetMovementView />
            <ElegantView /> */}
            <ImageSlideShow />
        </div>
    )
}