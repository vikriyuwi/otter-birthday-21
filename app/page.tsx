import BirthdayCountdownView from "./(countdown)/BirthdayCountdownView";
import ForOtterPage from "./(main)/ForOtterPage";

export default function Home() {
  const targetDate = new Date('2025-12-23T00:00:00+07:00').getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    return (
      <BirthdayCountdownView />
    )
  } else {
    return (
      <ForOtterPage />
    )
  }
}
