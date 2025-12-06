"use client";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-8 py-4 rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-[#ff5a36] text-white hover:bg-[#ff8a6c] hover:shadow-lg hover:shadow-[#ff5a36]/25",
    secondary:
      "bg-transparent border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
