import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faPersonRunning, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  completed: faDumbbell,
  calories: faPersonRunning,
  progress: faClipboardCheck,
};

export default async function CardWrapper() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}
      <Card title="Completed Workouts" value={1} type="completed" />
      <Card title="Calories Burned" value={2} type="calories" />
      <Card title="Workouts Tracked" value={3} type="progress" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "completed" | "calories" | "progress";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
      {Icon ? (
          <FontAwesomeIcon icon={Icon} className="h-5 w-5 text-gray-700" />
        ) : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
