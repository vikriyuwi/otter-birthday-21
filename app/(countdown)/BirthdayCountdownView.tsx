import Particles from "../components/ParticlesBackground";
import BirthdayCountdown from "./BirthdayCountdown";

export default function BirthdayCountdownView() {
    return (
        <div className="relative">
            <div className="absolute z-50 flex flex-col gap-20 h-dvh w-dvw items-center justify-center bg-transparent">
                SOMETHING AWESOME IS COMING
                <BirthdayCountdown />
            </div>
            <Particles />
        </div>
    )
}