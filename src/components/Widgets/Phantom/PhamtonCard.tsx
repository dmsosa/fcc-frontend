export default function PhantomCard({
  className = "",
}) {
  return (
    <div className={` card card-rounded
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-md
        shadow-sm
        transition-all duration-300
        hover:bg-white/10
        hover:shadow-lg
        hover:-translate-y-0.5
        ${className}
      `}
    >
      <div className="phantom phantom-y-sm phantom-x-fluid mw-80 mx-auto border-radius-1 p-3"></div>
      <div className="phantom phantom-y-sm phantom-x-fluid mw-80 mx-auto border-radius-1 p-3"></div>
      <div className="phantom phantom-y-sm phantom-x-fluid mw-80 mx-auto border-radius-1 p-3"></div>
    </div>
  );
}