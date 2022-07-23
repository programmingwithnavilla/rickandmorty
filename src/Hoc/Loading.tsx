import React, { useState } from "react";
import { WithLoadingProps } from "../infrastructure/interface";

const withLoading =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & WithLoadingProps> =>
  ({ loading, ...props }: WithLoadingProps) => {
    const [isLoading, setLoading] = useState(true);
    const setloadingState = (isComponentLoading: boolean) => {
      setLoading(isComponentLoading);
    };
    return isLoading ? (
      <div>isLoading...</div>
    ) : (
      <Component {...(props as P)} setLoading={setloadingState} />
    );
  };

export default withLoading;
