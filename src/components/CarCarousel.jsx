import gsap from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { blackBg, blackBgOl, dragHand, greenBgOl, whiteBgOl } from "../assets";

export default function CarCarousel({ data }) {
  const carRefs = useRef([]);
  const containerRef = useRef(null);
  const isAnimating = useRef(false);
  const hasAnimatedOnce = useRef(false);
  const bgRef = useRef([null, null]);
  const videoRef = useRef(null);
  const isInitialized = useRef(false);

  const [bgImage, setBgImage] = useState(blackBg);
  const [bgVideo, setBgVideo] = useState(blackBgOl);
  const [mainCarHeadlightsOn, setMainCarHeadlightsOn] = useState(true);
  const [screenSize, setScreenSize] = useState("lg");

  // Slides from backend
  const slides = useMemo(
    () => (Array.isArray(data?.bgImages) ? data.bgImages : []),
    [data]
  );

  const getOverlayForIndex = (idx) => {
    if (idx === 0) return blackBgOl;
    if (idx === 1) return whiteBgOl;
    if (idx === 2) return greenBgOl;
    return blackBgOl;
  };

  const [carOrder, setCarOrder] = useState([0, 1, 2]);
  const [visualOrder, setVisualOrder] = useState([2, 0, 1]);
  const [videoSrcs, setVideoSrcs] = useState([blackBgOl, blackBgOl]);
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRefs = useRef([null, null]);

  useEffect(() => {
    if (isInitialized.current || !slides.length) return;

    const n = slides.length;
    if (n < 3) return;

    const centerIndex = 0;
    const leftIndex = (n + centerIndex - 1) % n;
    const rightIndex = (centerIndex + 1) % n;

    const newCarOrder = [leftIndex, centerIndex, rightIndex];
    const newVisualOrder = [leftIndex, centerIndex, rightIndex];

    setCarOrder(newCarOrder);
    setVisualOrder(newVisualOrder);

    const initialBg = slides[centerIndex]?.url ?? blackBg;
    setBgImage(initialBg);

    const initialOverlay = getOverlayForIndex(centerIndex);
    setVideoSrcs([initialOverlay, initialOverlay]);
    setVideoIndex(0);

    isInitialized.current = true;
  }, [slides]);

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("lg");
      } else if (window.innerWidth >= 768) {
        setScreenSize("md");
      } else {
        setScreenSize("sm");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const getResponsiveDimensions = () => {
    switch (screenSize) {
      case "sm":
        return {
          carWidth: "350px",
          carHeight: "200px",
          mainScale: 1.2,
          sideScale: 0,
          leftPos: "-100%",
          centerPos: "50%",
          rightPos: "200%",
        };
      case "md":
        return {
          carWidth: "600px",
          carHeight: "240px",
          mainScale: 1.3,
          sideScale: 0.8,
          leftPos: "5%",
          centerPos: "50%",
          rightPos: "95%",
        };
      default: // lg
        return {
          carWidth: "1200px",
          carHeight: "300px",
          mainScale: 1.5,
          sideScale: 0.6,
          leftPos: "-5%",
          centerPos: "45%",
          rightPos: "95%",
        };
    }
  };

  const getCarImageForSlide = (slideIndex, isMain = false) => {
    const carImgs = slides?.[slideIndex]?.carImages ?? [];

    const highlight = carImgs?.[0]?.url;
    const normal = carImgs?.[1]?.url;

    if (isMain) {
      // Toggle "headlights" behavior by switching between index 0 and 1
      return mainCarHeadlightsOn ? highlight || normal : normal || highlight;
    }
    // Side cars look a bit "on" for depth; fallback if missing
    return highlight || normal || "";
  };

  const handleMainCarClick = () => {
    if (isAnimating.current) return;
    setMainCarHeadlightsOn((v) => !v);
  };

  const rotate = (direction = 1) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const [left, main, right] = carRefs.current;
    const dimensions = getResponsiveDimensions();
    gsap.killTweensOf([left, main, right]);

    let newOrder;
    if (direction === 1) {
      newOrder = [carOrder[1], carOrder[2], carOrder[0]];
    } else {
      newOrder = [carOrder[2], carOrder[0], carOrder[1]];
    }

    const nextMainIndex = newOrder[1];
    const nextBg = slides?.[nextMainIndex]?.url ?? blackBg;
    const nextOverlay = getOverlayForIndex(nextMainIndex);

    const nextIndex = videoIndex === 0 ? 1 : 0;
    setVideoSrcs((prev) => {
      const updated = [...prev];
      updated[nextIndex] = nextOverlay;
      return updated;
    });
    setVideoIndex(nextIndex);

    gsap.set(videoRefs.current[nextIndex], { opacity: 0 });
    gsap.to(videoRefs.current[nextIndex], {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
      onStart: () => {
        videoRefs.current[nextIndex]?.play();
        videoRefs.current[1 - nextIndex]?.pause();
      },
    });

    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: () => {
        setBgImage(nextBg);
        gsap.to(bgRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        });
      },
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setCarOrder(newOrder);
        setMainCarHeadlightsOn(true);
        setTimeout(() => {
          setVisualOrder(newOrder);
          isAnimating.current = false;
          hasAnimatedOnce.current = true;
        }, 200);
      },
    });

    if (direction === 1) {
      tl.to(left, {
        left: dimensions.rightPos,
        x: "-50%",
        scale: dimensions.sideScale,
        width: dimensions.carWidth,
        opacity: 0.5,
        zIndex: 10,
        duration: 1.2,
        ease: "power3.inOut",
      });
      tl.to(
        main,
        {
          left: dimensions.leftPos,
          x: "-50%",
          scale: dimensions.sideScale,
          width: dimensions.carWidth,
          opacity: 0.5,
          zIndex: 5,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0
      );
      tl.to(
        right,
        {
          left: dimensions.centerPos,
          x: "-50%",
          scale: dimensions.mainScale,
          width: dimensions.carWidth,
          opacity: 1,
          zIndex: 20,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0
      );
    } else {
      tl.to(right, {
        left: dimensions.leftPos,
        x: "-50%",
        scale: dimensions.sideScale,
        width: dimensions.carWidth,
        opacity: 0.5,
        zIndex: 10,
        duration: 1.2,
        ease: "power3.inOut",
      });
      tl.to(
        main,
        {
          left: dimensions.rightPos,
          x: "-50%",
          scale: dimensions.sideScale,
          width: dimensions.carWidth,
          opacity: 0.5,
          zIndex: 5,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0
      );
      tl.to(
        left,
        {
          left: dimensions.centerPos,
          x: "-50%",
          scale: dimensions.mainScale,
          width: dimensions.carWidth,
          opacity: 1,
          zIndex: 20,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0
      );
    }
  };

  useLayoutEffect(() => {
    const [left, center, right] = carRefs.current;
    const dimensions = getResponsiveDimensions();

    gsap.set(left, {
      left: dimensions.leftPos,
      x: "-50%",
      scale: dimensions.sideScale,
      width: dimensions.carWidth,
      opacity: 0.5,
      zIndex: 5,
    });
    gsap.set(center, {
      left: dimensions.centerPos,
      x: "-50%",
      scale: dimensions.mainScale,
      width: dimensions.carWidth,
      opacity: 1,
      zIndex: 20,
    });
    gsap.set(right, {
      left: dimensions.rightPos,
      x: "-50%",
      scale: dimensions.sideScale,
      width: dimensions.carWidth,
      opacity: 0.5,
      zIndex: 10,
    });
  }, [screenSize]);

  useEffect(() => {
    const [left, main, right] = carRefs.current;
    if (!left || !main || !right || !isInitialized.current) return;

    const dimensions = getResponsiveDimensions();

    // Kill leftover tweens
    gsap.killTweensOf([left, main, right]);

    // Place instantly (no animation)
    gsap.set(left, {
      left: dimensions.leftPos,
      x: "-50%",
      scale: dimensions.sideScale,
      width: dimensions.carWidth,
      opacity: 0.5,
      zIndex: 5,
    });

    gsap.set(main, {
      left: dimensions.centerPos,
      x: "-50%",
      scale: dimensions.mainScale,
      width: dimensions.carWidth,
      opacity: 1,
      zIndex: 20,
    });

    gsap.set(right, {
      left: dimensions.rightPos,
      x: "-50%",
      scale: dimensions.sideScale,
      width: dimensions.carWidth,
      opacity: 0.5,
      zIndex: 10,
    });
  }, [visualOrder, screenSize]);

  useEffect(() => {
    const container = containerRef.current;
    let startX = 0;
    let isDragging = false;
    let dragDistance = 0;
    let startTime = 0;

    const onPointerDown = (e) => {
      if (isAnimating.current) return;

      if (e.target.tagName === "IMG") {
        isDragging = true;
        startX = e.clientX || e.touches?.[0]?.clientX;
        startTime = Date.now();
        dragDistance = 0;

        container.style.cursor = "grabbing";
        container.style.userSelect = "none";
      }
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || e.touches?.[0]?.clientX;
      dragDistance = currentX - startX;

      // Only change cursor style if drag distance exceeds threshold
      if (Math.abs(dragDistance) > 20) {
        container.style.cursor = "grabbing";
      }
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      const endX = e.clientX ?? e.changedTouches?.[0]?.clientX;
      const delta = endX - startX;
      const endTime = Date.now();

      container.style.cursor = "grab";
      container.style.userSelect = "auto";

      // Determine the threshold based on screen size
      const threshold = screenSize === "sm" ? 50 : 80;

      // Rotate the cars based on the drag distance
      if (delta < -threshold && endTime - startTime > 100) {
        rotate(1); // Move right
      } else if (delta > threshold && endTime - startTime > 100) {
        rotate(-1); // Move left
      }

      isDragging = false;
      dragDistance = 0;
    };

    const onPointerLeave = () => {
      if (isDragging) {
        container.style.cursor = "grab";
        container.style.userSelect = "auto";
        isDragging = false;
        dragDistance = 0;
      }
    };

    if (container) {
      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerup", onPointerUp);
      container.addEventListener("pointerleave", onPointerLeave);
      container.addEventListener("touchstart", onPointerDown);
      container.addEventListener("touchmove", onPointerMove);
      container.addEventListener("touchend", onPointerUp);
    }

    return () => {
      if (container) {
        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerup", onPointerUp);
        container.removeEventListener("pointerleave", onPointerLeave);
        container.removeEventListener("touchstart", onPointerDown);
        container.removeEventListener("touchmove", onPointerMove);
        container.removeEventListener("touchend", onPointerUp);
      }
    };
  }, [carOrder, screenSize]);

  // Derive headline content from the main slide and the currently selected main car image index
  const mainSlideIndex = carOrder?.[1] ?? 0;
  const headlineIdx = mainCarHeadlightsOn ? 0 : 1; // match image pick
  const mainSlide = slides?.[mainSlideIndex];
  const headline =
    mainSlide?.carImages?.[headlineIdx] ?? mainSlide?.carImages?.[0];

  return (
    <section className="home-banner-main relative w-full max-w-full h-[100vh] p-[100px 0px 12px] overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Background Videos */}
      <video
        ref={(el) => (videoRefs.current[0] = el)}
        className="absolute inset-0 w-full h-full object-cover z-[0]"
        src={videoSrcs[0]}
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity: videoIndex === 0 ? 1 : 0, transition: "none" }}
      />
      <video
        ref={(el) => (videoRefs.current[1] = el)}
        className="absolute inset-0 w-full h-full object-cover z-[0]"
        src={videoSrcs[1]}
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity: videoIndex === 1 ? 1 : 0, transition: "none" }}
      />

      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center z-[11]"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 z-10 pointer-events-none" />

      {/* Headlines from current slide */}
      <div className="z-20 text-center relative flex flex-col justify-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-in-out fade-in-left">
        {!!headline?.title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide font-cinzel font-normal">
            {headline.title}
          </h1>
        )}
        {!!headline?.subtitle && (
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl tracking-wide font-cinzel font-normal">
            {headline.subtitle}
          </h2>
        )}
        {!!headline?.description && (
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl tracking-wide font-cinzel font-normal">
            {headline.description}
          </h3>
        )}
      </div>

      {/* Car Stage */}
      <div
        ref={containerRef}
        className="relative w-full z-20 overflow-hidden flex items-center justify-center cursor-grab
                   h-[250px] sm:h-[300px] md:h-[350px] lg:h-[420px]
                   mt-8 sm:mt-12 md:mt-16 lg:mt-[100px] banner-slider-div"
      >
        {(() => {
          carRefs.current = [];
          return visualOrder.map((slideIdx, index) => {
            const isMain = index === 1;
            const carImage = getCarImageForSlide(slideIdx, isMain);
            const dimensions = getResponsiveDimensions();

            // On mobile, only show the main car
            const shouldShow = screenSize !== "sm" || isMain;

            return (
              <img
                key={`car-${index}-${slideIdx}`}
                ref={(el) => (carRefs.current[index] = el)}
                src={carImage}
                alt={`Car ${index}`}
                className={`banner-car-images absolute top-1/2 transform -translate-y-1/2 object-contain ${
                  isMain ? "cursor-pointer" : ""
                } ${shouldShow ? "block" : "hidden"}`}
                style={{
                  objectFit: "contain",
                  width: "auto",
                  height: dimensions.carHeight,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserDrag: "none",
                  KhtmlUserSelect: "none",
                  opacity: shouldShow ? (isMain ? 1 : 0.5) : 0,
                }}
                draggable={false}
                onClick={isMain ? handleMainCarClick : undefined}
              />
            );
          });
        })()}
      </div>

      {/* Responsive Drag Hint */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer
                   ${
                     screenSize === "sm"
                       ? "bottom-4"
                       : "bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-8"
                   }`}
        onClick={() => rotate(1)}
      >
        <img
          src={dragHand}
          alt="Drag Hand"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 animate-bounce object-contain"
          style={{
            animation: "slideRight 2s ease-in-out infinite",
          }}
        />
        <span className="text-white text-xs sm:text-sm md:text-sm lg:text-sm font-normal mb-2">
          {screenSize === "sm" ? "Swipe" : "Drag it"}
        </span>
      </div>
    </section>
  );
}
