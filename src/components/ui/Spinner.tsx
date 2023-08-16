const Spinner = ({ size = 14 }: { size?: number }) => (
  <div className="flex justify-center items-center">
    <div
      className={`w-${size} h-${size} border-t-4 border-primary rounded-full animate-spin`}
    ></div>
  </div>
);

export default Spinner;
