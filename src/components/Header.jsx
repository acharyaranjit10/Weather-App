import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center"
    >
      <h1 className="text-4xl font-bold mb-2 text font-serif">Weather Forecast</h1>
      <p className="text-lg font-sans">Find out if you need an umbrella or sunglasses</p>
    </motion.header>
  );
};

export default Header;