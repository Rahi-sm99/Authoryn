import { motion, type HTMLMotionProps } from 'framer-motion';
import './Button.css';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'w-full' : '',
    className
  ].join(' ');

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={classes}
      disabled={isLoading || props.disabled}
      style={fullWidth ? { width: '100%' } : {}}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <div className="spinner" />
          <span>Loading...</span>
        </span>
      ) : children}
    </motion.button>
  );
};

export default Button;
