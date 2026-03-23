import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <TailSpin
        height={100}
        width={200}
        color="#f5385d"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
