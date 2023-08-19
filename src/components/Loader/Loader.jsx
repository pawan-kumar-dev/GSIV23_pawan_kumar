import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ visible, styles = {} }) => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#6b7280"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ justifyContent: "center", ...styles }}
      visible={visible}
    />
  );
};

export default Loader