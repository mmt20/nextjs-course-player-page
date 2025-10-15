interface IProps {}

const Player = ({}: IProps) => {
  return (
    <div className="aspect-video bg-gray-200 rounded-lg shadow-sm flex items-center justify-center mb-2 relative">
      <span className="text-lg text-gray-400">[Video Player]</span>
    </div>
  );
};

export default Player;
