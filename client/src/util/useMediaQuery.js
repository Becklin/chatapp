import react from 'react';
import { useMediaQuery as useReactResponsive } from 'react-responsive';

const useMediaQuery = () => {
  const isDesktopOrLaptop = useReactResponsive({ minDeviceWidth: 1224 });
  const isBigScreen = useReactResponsive({ minDeviceWidth: 1824 });
  const isTabletOrMobile = useReactResponsive({ maxWidth: 1224 });
  const isTabletOrMobileDevice = useReactResponsive({ maxDeviceWidth: 1224 });
  const isPortrait = useReactResponsive({ orientation: 'portrait' });
  const isRetina = useReactResponsive({ minResolution: '2dppx' });
  // console.log(
  //   'fff',
  //   isDesktopOrLaptop,
  //   isBigScreen,
  //   isTabletOrMobile,
  //   isTabletOrMobileDevice,
  //   isPortrait,
  //   isRetina
  // );
  return {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isTabletOrMobileDevice,
    isPortrait,
    isRetina,
  };
};

export default useMediaQuery;
