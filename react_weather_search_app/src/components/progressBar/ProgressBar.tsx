import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProgressBar: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  return (
    <>
      <div className="mt-4">
        <div
          className="progress"
          role="progressbar"
          aria-label="Animated striped example"
          aria-valuenow={75}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            style={{ width: `${state?.progress}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
