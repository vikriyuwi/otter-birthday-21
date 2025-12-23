import Particles from "../components/ParticlesBackground";
import BirthdayCountdown from "./BirthdayCountdown";

export default function BirthdayCountdownView() {
    return (
        <div className="relative">
            <div className="absolute text-white z-50 flex flex-col gap-20 h-[100vh] w-[100vw] items-center justify-center bg-transparent">
                <span className="text-xl md:text-2xl">SOMETHING AWESOME IS COMING</span>
                <BirthdayCountdown />
            </div>
            <Particles />
        </div>
    )
}