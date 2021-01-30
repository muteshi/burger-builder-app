import React from "react";

import Aux from "../Layout/Auxilliary/Auxilliary";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http.error-handler";

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axiosInstance);
    return (
      <Aux>
        <Modal modalClosed={clearError} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
