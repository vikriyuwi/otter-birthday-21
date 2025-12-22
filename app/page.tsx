import BirthdayCountdownView from "./(countdown)/BirthdayCountdownView";

export default function Home() {
  const targetDate = new Date('2025-12-24T00:00:00+07:00').getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    return (
      <BirthdayCountdownView />
    )
  } else {
    return (
      "today is the day"
    )
  }
}
