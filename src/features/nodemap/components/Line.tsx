import { createAngledPath } from '../utils/createAngledPath';

type Coordinates = { x: number; y: number };

type LineProps = {
  childCoordinates: Coordinates;
  parentCoordinates: Coordinates;
  isLineActivated?: boolean;
};

const Line = ({ childCoordinates, parentCoordinates, isLineActivated = true }: LineProps) => {
  function calculatePath() {
    const pathD = createAngledPath(childCoordinates, parentCoordinates);

    return pathD;
  }

  const path = calculatePath();

  return (
    <g key={Math.random()}>
      <path
        d={path}
        fill="none"
        className={`${
          isLineActivated ? 'stroke-primary-light dark:stroke-primary' : 'stroke-border opacity-100'
        } ${!isLineActivated && 'stroke-transparent'}`}
        strokeWidth="4"
      ></path>

      <path d={path} fill="none" stroke="transparent" strokeWidth="10" />
    </g>
  );
};

export default Line;
