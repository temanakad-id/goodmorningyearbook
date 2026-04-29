import "@testing-library/jest-dom";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

// Mock framer-motion
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    ...jest.requireActual("framer-motion"),
    motion: {
      div: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => {
          return (
            <div
              ref={ref}
              {...props}
              data-testid={props["data-testid"]}
              data-initial={JSON.stringify(initial)}
              data-animate={JSON.stringify(animate)}
              data-transition={JSON.stringify(transition)}
              data-whileinview={JSON.stringify(whileInView)}
            />
          );
        },
      ),
      span: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <span
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
      section: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <section
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
      h1: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <h1
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
      h2: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <h2
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
      p: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <p
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
      a: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <a
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
      button: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <button
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
      ul: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <ul
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
      li: React.forwardRef(
        (
          {
            animate,
            initial,
            whileInView,
            whileHover,
            whileTap,
            transition,
            variants,
            custom,
            ...props
          },
          ref,
        ) => (
          <li
            ref={ref}
            {...props}
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-transition={JSON.stringify(transition)}
            data-whileinview={JSON.stringify(whileInView)}
          />
        ),
      ),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
    useAnimation: () => ({
      start: jest.fn(),
      set: jest.fn(),
      stop: jest.fn(),
    }),
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => ({ get: () => 0 }),
    useSpring: () => ({ get: () => 0 }),
  };
});
