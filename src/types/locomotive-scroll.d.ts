declare module "locomotive-scroll" {
  const LocoScroll: any;
  export default LocoScroll;
}

declare global {
  interface Window {
    __loco_scroll?: {
      scrollTo: (
        target: number | string | Element,
        opts?: { duration?: number; offset?: number; disableLerp?: boolean }
      ) => void;
      update: () => void;
      stop: () => void;
      start: () => void;
      destroy: () => void;
      instance?: any;
    };
  }
}

export {};
