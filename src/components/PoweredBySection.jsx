import React, {
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ anticipatePin: 1 });

const PoweredBySection = ({ gotoNextSec, data }) => {
  const containerRef = useRef(null);
  const frameRef = useRef(null);

  const bgLayerRef = useRef(null);
  const newTextRef = useRef(null);
  const newTextRef1 = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const imagePaths = useMemo(
    () =>
      Array.from(
        { length: 253 },
        (_, index) =>
          new URL(
            `../assets/poweredbyAnimation/JPG_Sequence/octane office project${String(
              index + 36
            ).padStart(3, "0")}.webp`,
            import.meta.url
          ).href
      ),
    []
  );

  useEffect(() => {
    if (frameRef.current) {
      // only set the image, sizing handled by CSS classes
      frameRef.current.style.backgroundImage = `url(${imagePaths[0]})`;
      frameRef.current.style.backgroundRepeat = "no-repeat";
      frameRef.current.style.backgroundPosition = "center";
    }

    let loadedCount = 0;
    const totalImages = imagePaths.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) setImagesLoaded(true);
    };

    imagePaths.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = src;
    });
  }, [imagePaths]);

  useLayoutEffect(() => {
    if (!imagesLoaded) return;

    const container = containerRef.current;
    const frame = frameRef.current;
    const total = imagePaths.length;

    const imgs = imagePaths.map((src) => {
      const im = new Image();
      im.src = src;
      return im;
    });

    const setBG = gsap.quickSetter(frame, "backgroundImage");

    gsap.set(frame, {
      // background sizing via CSS classes (no JS here)
      willChange: "background-image",
      opacity: 1,
      // keep position repeat consistent
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    });

    gsap.set(bgLayerRef.current, { autoAlpha: 0 });

    const PX_PER_FRAME = 8;
    const endDistance = total * PX_PER_FRAME;

    let overlayShown = false;

    const st = ScrollTrigger.create({
      trigger: container,
      pin: true,
      start: "top top",
      end: `+=${endDistance}`,
      scrub: 0.5,
      pinSpacing: true,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const idx = Math.floor(self.progress * (total - 1));
        setBG(`url("${imagePaths[idx]}")`);

        const atSecondLast = idx === total - 2;
        const atLast = idx === total - 1;

        if ((atSecondLast || atLast) && !overlayShown) {
          overlayShown = true;

          bgLayerRef.current.style.backgroundImage = `url(${
            new URL(
              "../assets/poweredbyAnimation/JPG_Sequence/octane office project288.webp",
              import.meta.url
            ).href
          })`;

          bgLayerRef.current.style.backgroundSize = "cover";
          bgLayerRef.current.style.backgroundPosition = "center";
          bgLayerRef.current.style.backgroundRepeat = "no-repeat";

          gsap.to(bgLayerRef.current, {
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
          });

          gsap.fromTo(
            [newTextRef.current, newTextRef1.current],
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.15,
            }
          );
        } else if (!atSecondLast && !atLast && overlayShown) {
          overlayShown = false;

          gsap.to(bgLayerRef.current, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      },
    });

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    ScrollTrigger.refresh();

    return () => {
      st.kill();
      imgs.length = 0;
      clearTimeout(timeoutId);
    };
  }, [imagePaths, imagesLoaded]);

  return (
    <>
    <div className="overflow-hidden powered-sec-mobile" ref={gotoNextSec}>
      <section ref={containerRef} className="relative h-screen w-screen">
        <div
          ref={frameRef}
          className="
            absolute inset-0 -z-10
            bg-center bg-no-repeat
            bg-contain
            lg:bg-cover
          "
          style={{
            backgroundImage: `url(${imagePaths[0]})`,
          }}
        />

        <div
          className="bgImage absolute inset-0 z-20 flex flex-col items-center justify-between"
          ref={bgLayerRef}
        >
          <div className="bg-before"></div>

          <div className="text-center !px-4 sm:!px-6 lg:!px-8 !mt-8 sm:!mt-12 md:!mt-16 lg:!mt-[146px]">
            <h2
              ref={newTextRef}
              className="uppercase !text-white font-cinzel mt-4 sm:mt-6 md:mt-8 lg:mt-10 powered-text-gradient font-normal
                         !text-xl sm:!text-2xl md:!text-4xl lg:!text-[65px]
                         leading-tight sm:leading-8 md:leading-12 lg:leading-[55px]"
            >
              {data?.title}
            </h2>
            <h2
              ref={newTextRef1}
              className="uppercase !text-white font-cinzel mt-3 sm:mt-4 md:mt-6 lg:mt-10 powered-text-gradient font-normal
                         !text-xl sm:!text-2xl md:!text-4xl lg:!text-[65px]
                         leading-tight"
            >
              {data?.subtitle}
            </h2>
            <p
              className="text-white font-light mt-4 sm:mt-5 md:mt-6 lg:mt-8 mx-auto
                          text-xs sm:text-sm md:text-base lg:text-lg
                          max-w-sm sm:max-w-xl md:max-w-4xl lg:w-[1463px]
                          leading-relaxed px-2 sm:px-0"
            >
              {data?.description}
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-[25px] items-center
                          !mb-6 sm:!mb-8 md:!mb-10 lg:!mb-[45px] !px-4 sm:!px-6 lg:!px-0 w-full sm:w-auto"
          >
            {data?.icons?.map((iconContent, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-col rounded-lg w-full sm:w-auto
                         !px-6 sm:!px-8 md:!px-10 lg:!px-[45px] !py-4 sm:!py-3 lg:!py-[10px]
                         min-w-0 sm:min-w-[200px] md:min-w-[250px]"
                style={{
                  backgroundColor: "rgb(40, 41, 43)",
                  border: "1px solid #fff",
                }}
              >
                <img
                  src={iconContent?.icon}
                  alt="afford_cost"
                  className="w-6 sm:w-8 md:w-10 lg:w-auto h-6 sm:h-8 md:h-10 lg:h-auto object-contain"
                />
                <p className="powered-text-gradient font-cinzel mt-2 sm:mt-3 lg:mt-[15px] font-normal text-center text-xs sm:text-sm md:text-lg lg:text-[32px] mb-0">
                  {iconContent?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    
    <div className="overflow-hidden powered-sec-laptop" ref={gotoNextSec}>
      <section className="relative h-screen w-screen">
        <div
          className="PoweredbgImage bgImage absolute inset-0 z-20 flex flex-col items-center justify-between"
        >
          <div className="bg-before"></div>

          <div className="text-center !px-4 sm:!px-6 lg:!px-8 !mt-8 sm:!mt-12 md:!mt-16 lg:!mt-[146px]">
            <h2
              ref={newTextRef}
              className="uppercase !text-white font-cinzel mt-4 sm:mt-6 md:mt-8 lg:mt-10 powered-text-gradient font-normal
                         !text-xl sm:!text-2xl md:!text-4xl lg:!text-[65px]
                         leading-tight sm:leading-8 md:leading-12 lg:leading-[55px]"
            >
              {data?.title}
            </h2>
            <h2
              ref={newTextRef1}
              className="uppercase !text-white font-cinzel mt-3 sm:mt-4 md:mt-6 lg:mt-10 powered-text-gradient font-normal
                         !text-xl sm:!text-2xl md:!text-4xl lg:!text-[65px]
                         leading-tight"
            >
              {data?.subtitle}
            </h2>
            <p
              className="text-white font-light mt-4 sm:mt-5 md:mt-6 lg:mt-8 mx-auto
                          text-xs sm:text-sm md:text-base lg:text-lg
                          max-w-sm sm:max-w-xl md:max-w-4xl lg:w-[1463px]
                          leading-relaxed px-2 sm:px-0"
            >
              {data?.description}
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-[25px] items-center
                          !mb-6 sm:!mb-8 md:!mb-10 lg:!mb-[45px] !px-4 sm:!px-6 lg:!px-0 w-full sm:w-auto"
          >
            {data?.icons?.map((iconContent, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-col rounded-lg w-full sm:w-auto
                         !px-6 sm:!px-8 md:!px-10 lg:!px-[45px] !py-4 sm:!py-3 lg:!py-[10px]
                         min-w-0 sm:min-w-[200px] md:min-w-[250px]"
                style={{
                  backgroundColor: "rgb(40, 41, 43)",
                  border: "1px solid #fff",
                }}
              >
                <img
                  src={iconContent?.icon}
                  alt="afford_cost"
                  className="w-6 sm:w-8 md:w-10 lg:w-auto h-6 sm:h-8 md:h-10 lg:h-auto object-contain"
                />
                <p className="powered-text-gradient font-cinzel mt-2 sm:mt-3 lg:mt-[15px] font-normal text-center text-xs sm:text-sm md:text-lg lg:text-[32px] mb-0">
                  {iconContent?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default PoweredBySection;

// import React, {
//   useRef,
//   useLayoutEffect,
//   useMemo,
//   useEffect,
//   useState,
// } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.config({ anticipatePin: 1 });

// const PoweredBySection = ({ gotoNextSec, data }) => {
//   const containerRef = useRef(null);
//   const frameRef = useRef(null);

//   const bgLayerRef = useRef(null);
//   const newTextRef = useRef(null);
//   const newTextRef1 = useRef(null);

//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   const imagePaths = useMemo(
//     () =>
//       Array.from(
//         { length: 253 },
//         (_, index) =>
//           new URL(
//             `../assets/poweredbyAnimation/JPG_Sequence/octane office project${String(
//               index + 36
//             ).padStart(3, "0")}.webp`,
//             import.meta.url
//           ).href
//       ),
//     []
//   );

//   useEffect(() => {
//     if (frameRef.current) {
//       frameRef.current.style.backgroundImage = `url(${imagePaths[0]})`;
//       frameRef.current.style.backgroundSize = "cover";
//       frameRef.current.style.backgroundPosition = "center";
//     }

//     let loadedCount = 0;
//     const totalImages = imagePaths.length;

//     const checkAllLoaded = () => {
//       loadedCount++;
//       if (loadedCount === totalImages) {
//         setImagesLoaded(true);
//       }
//     };

//     imagePaths.forEach((src) => {
//       const img = new Image();
//       img.onload = checkAllLoaded;
//       img.onerror = checkAllLoaded;
//       img.src = src;
//     });
//   }, [imagePaths]);

//   useLayoutEffect(() => {
//     if (!imagesLoaded) return;

//     const container = containerRef.current;
//     const frame = frameRef.current;
//     const total = imagePaths.length;

//     const imgs = imagePaths.map((src) => {
//       const im = new Image();
//       im.src = src;
//       return im;
//     });

//     const setBG = gsap.quickSetter(frame, "backgroundImage");

//     gsap.set(frame, {
//       backgroundImage: `url(${imagePaths[0]})`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       willChange: "background-image",
//       opacity: 1,
//     });

//     gsap.set(bgLayerRef.current, { autoAlpha: 0 });

//     const PX_PER_FRAME = 8;
//     const endDistance = total * PX_PER_FRAME;

//     let overlayShown = false;

//     const st = ScrollTrigger.create({
//       trigger: container,
//       pin: true,
//       start: "top top",
//       end: `+=${endDistance}`,
//       scrub: 0.5,
//       pinSpacing: true,
//       invalidateOnRefresh: true,
//       onUpdate(self) {
//         const idx = Math.floor(self.progress * (total - 1));
//         setBG(`url("${imagePaths[idx]}")`);

//         const atSecondLast = idx === total - 2;
//         const atLast = idx === total - 1;

//         if ((atSecondLast || atLast) && !overlayShown) {
//           overlayShown = true;

//           gsap.to(bgLayerRef.current, {
//             autoAlpha: 1,
//             duration: 0.8,
//             ease: "power2.out",
//           });

//           gsap.fromTo(
//             [newTextRef.current, newTextRef1.current],
//             { y: 40, autoAlpha: 0 },
//             {
//               y: 0,
//               autoAlpha: 1,
//               duration: 1,
//               ease: "power3.out",
//               stagger: 0.15,
//             }
//           );
//         } else if (!atSecondLast && !atLast && overlayShown) {
//           overlayShown = false;

//           gsap.to(bgLayerRef.current, {
//             autoAlpha: 0,
//             duration: 0.5,
//             ease: "power2.in",
//           });
//         }
//       },
//     });

//     const timeoutId = setTimeout(() => {
//       ScrollTrigger.refresh();
//     }, 100);
//     ScrollTrigger.refresh();

//     return () => {
//       st.kill();
//       imgs.length = 0;
//       clearTimeout(timeoutId);
//     };
//   }, [imagePaths, imagesLoaded]);

//   return (
//     <div className="overflow-hidden" ref={gotoNextSec}>
//       <section ref={containerRef} className="relative h-screen w-screen">
//         <div
//           ref={frameRef}
//           className="absolute inset-0 -z-10"
//           style={{
//             backgroundImage: `url(${imagePaths[0]})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat"
//           }}
//         />

//         <div
//           className="bgImage absolute inset-0 z-20"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//           ref={bgLayerRef}
//         >
//           <div className="bg-before"></div>

//           <div className="text-center !px-4 sm:!px-6 lg:!px-8 !mt-8 sm:!mt-12 md:!mt-16 lg:!mt-[146px]">
//             <h2
//               ref={newTextRef}
//               className="uppercase !text-white font-cinzel mt-4 sm:mt-6 md:mt-8 lg:mt-10 powered-text-gradient font-normal
//                          !text-xl sm:!text-2xl md:!text-4xl lg:!text-[65px]
//                          leading-tight sm:leading-8 md:leading-12 lg:leading-[55px]"
//             >
//               {data?.title}
//             </h2>
//             <h2
//               ref={newTextRef1}
//               className="uppercase !text-white font-cinzel mt-3 sm:mt-4 md:mt-6 lg:mt-10 powered-text-gradient font-normal
//                          !text-xl sm:!text-2xl md:!text-4xl lg:!text-[65px]
//                          leading-tight"
//             >
//               {data?.subtitle}
//             </h2>
//             <p
//               className="text-white font-light mt-4 sm:mt-5 md:mt-6 lg:mt-8 mx-auto
//                           text-xs sm:text-sm md:text-base lg:text-lg
//                           max-w-sm sm:max-w-xl md:max-w-4xl lg:w-[1463px]
//                           leading-relaxed px-2 sm:px-0"
//             >
//               {data?.description}
//             </p>
//           </div>

//           <div
//             className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-[25px] items-center
//                           !mb-6 sm:!mb-8 md:!mb-10 lg:!mb-[45px] !px-4 sm:!px-6 lg:!px-0 w-full sm:w-auto"
//           >
//             {data?.icons?.map((iconContent, index) => {
//               return (
//                 <div
//                   key={index}
//                   className="flex items-center justify-center flex-col rounded-lg w-full sm:w-auto
//                          !px-6 sm:!px-8 md:!px-10 lg:!px-[45px] !py-4 sm:!py-3 lg:!py-[10px]
//                          min-w-0 sm:min-w-[200px] md:min-w-[250px]"
//                   style={{
//                     backgroundColor: "rgb(40, 41, 43)",
//                     border: "1px solid #fff",
//                   }}
//                 >
//                   <img
//                     src={iconContent?.icon}
//                     alt="afford_cost"
//                     className="w-6 sm:w-8 md:w-10 lg:w-auto h-6 sm:h-8 md:h-10 lg:h-auto object-contain"
//                   />
//                   <p
//                     className="powered-text-gradient font-cinzel mt-2 sm:mt-3 lg:mt-[15px] font-normal text-center
//                            text-xs sm:text-sm md:text-lg lg:text-[32px] mb-0"
//                   >
//                     {iconContent?.title}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PoweredBySection;
