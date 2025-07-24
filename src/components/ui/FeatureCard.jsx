const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-healthy-primary/20">
      <div className="flex items-center justify-center w-12 h-12 bg-healthy-primary/10 rounded-lg mb-4 group-hover:bg-healthy-primary group-hover:text-white transition-all duration-300">
        <div className="text-healthy-primary group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-healthy-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard; 