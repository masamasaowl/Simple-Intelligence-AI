function Button({
  label,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary", // primary | secondary
  className = ""
}) {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
