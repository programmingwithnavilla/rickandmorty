import React, { useState } from "react";
import { WithLoadingProps } from "../infrastructure/interface";

// const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
//   class WithLoading extends React.Component<WithLoadingProps> {
//     render() {
//       const { loading, ...props }: any = this.props;
//       const [isLoading, setLoading] = useState(true);
//       return loading ? <div>isLoading...</div> : <Component {...props} />;
//     }
//   };

const withLoading =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & WithLoadingProps> =>
  ({ loading, ...props }: WithLoadingProps) => {
    const [isLoading, setLoading] = useState(true);
    const setloadingState = (isComponentLoading: boolean) => {
      setLoading(isComponentLoading);
    };
    // return (
    //   <>
    //     {isLoading && <div>isLoading...</div>}
    //     <Component {...(props as P)} setLoading={setloadingState} />
    //   </>
    // );
    return isLoading ? (
      <div>isLoading...</div>
    ) : (
      <Component {...(props as P)} setLoading={setloadingState} />
    );
  };

export default withLoading;

// const LoadingHoc = <P extends object>(Component: React.ComponentType<P>) => {
//   function HOC(props: any) {
//     const [isLoading, setLoading] = useState(true);
//     const setloadingState = (isComponentLoading: boolean) => {
//       setLoading(isComponentLoading);
//     };

//     return isLoading ? (
//       <div>loading ...</div>
//     ) : (
//       <Component {...props} setLoading={setloadingState} />
//     );
//   }
// };
// Our withLoading HOC can also be rewritten to return a function component rather than a class:

// const withLoading = <P extends object>(
//     Component: React.ComponentType<P>
//   ): React.FC<P & WithLoadingProps> => ({
//     loading,
//     ...props
//   }: WithLoadingProps) =>
//     loading ? <LoadingSpinner /> : <Component {...props as P} />;
