const StepCard = ({ title, completed, onToggle, onClick }) => {
  return (
    <div
      className={`text-gray-600 border rounded-xl p-4 shadow-sm flex items-center justify-between ${
        completed ? "bg-green-100" : "bg-white"
      }`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <button
        className={`px-3 py-1 text-sm rounded ${
          completed ? "bg-green-600 text-white" : "bg-gray-300"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {completed ? "✓ Completed" : "Mark as Done"}
      </button>
    </div>
  );
};

export default StepCard;

