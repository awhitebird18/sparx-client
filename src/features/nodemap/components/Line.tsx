import { Coordinates } from '../types/coordinates';
import { createAngledPath } from '../utils/createAngledPath';

type LineProps = {
  childCoordinates: Coordinates;
  parentCoordinates: Coordinates;
  isLineActivated?: boolean;
};

const Line = ({ childCoordinates, parentCoordinates, isLineActivated = true }: LineProps) => {
  const path = createAngledPath(childCoordinates, parentCoordinates);

  return (
    <g key={Math.random()}>
      <path
        d={path}
        fill="none"
        className={`${
          isLineActivated ? 'stroke-primary-light dark:stroke-primary' : 'stroke-border opacity-100'
        } ${!isLineActivated && 'stroke-transparent'}`}
        strokeWidth="4"
      />
    </g>
  );
};

export default Line;
