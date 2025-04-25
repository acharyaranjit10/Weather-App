import { motion } from 'framer-motion';

const UnitToggle = ({ unit, toggleUnit }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`flex items-center rounded-full p-1 ${unit === 'metric' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
      <button
        onClick={toggleUnit}
        className="px-3 py-1 text-sm font-medium text-white"
      >
        °{unit === 'metric' ? 'C' : 'F'}
      </button>
    </motion.div>
  );
};

export default UnitToggle;
