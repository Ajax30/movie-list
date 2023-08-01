import React from "react";
import { motion } from "framer-motion";

export const withTransition = (TransitioningComponent) => {
  class WithTransition extends React.Component {
    render() {
      return (
        <motion.div
          className="transition-container"
          initial={{ opacity: 0, x: '-100px' }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, x: 0, transition: { duration: 0.3 } }}
        >
          <TransitioningComponent {...this.props} />
        </motion.div>
      );
    }
  }

  WithTransition.displayName = `WithTransition(${
    TransitioningComponent.displayName || TransitioningComponent.name
  })`;

  return WithTransition;
};