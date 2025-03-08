import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
      init={particlesInit}
      options={{
        autoPlay: true,
        background: {
          color: "#0A0A0C", // Match your bg-dark color
          opacity: 1,
        },
        fpsLimit: 60,
        interactivity: {
          detect_on: "window",
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#3B82F6", "#2563EB", "#1D4ED8"],
          },
          links: {
            color: "#3B82F6",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            bounce: false,
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 100,
          },
          opacity: {
            animation: {
              enable: true,
              minimumValue: 0.5,
              speed: 1,
              sync: false,
            },
            random: false,
            value: 1,
          },
          shape: {
            type: "circle",
          },
          size: {
            animation: {
              enable: true,
              minimumValue: 1,
              speed: 3,
              sync: false,
            },
            random: true,
            value: 3,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
