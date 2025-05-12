import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
}) => {  const baseClasses = "inline-flex items-center justify-center font-mono tracking-wide uppercase transition-colors focus:outline-none border m-1";
  
  const variantClasses = {
    primary: "bg-black border-terminal-green text-terminal-green hover:bg-terminal-green/10 hover:shadow-terminal",
    secondary: "bg-black border-terminal-green/70 text-terminal-green/90 hover:border-terminal-green hover:text-terminal-green",
    outline: "bg-transparent border-terminal-green/50 text-terminal-green hover:border-terminal-green hover:bg-terminal-green/10",
  };
  
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2",
    lg: "text-base px-6 py-2.5",
  };
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
