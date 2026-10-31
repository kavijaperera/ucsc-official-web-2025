import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const TransitionLink = ({ children, href, className, props }) => {
  const router = useRouter();
  const pathname = usePathname();

  // On other pages, "#section" links should go to the homepage section.
  const target = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  const timeline = gsap.timeline();

  const handleAnimation = () => {
    if (pathname != target) {
      document.body.classList.add("no-scroll"); //Disable scrolling

      timeline.fromTo(
        "#transition",
        {
          y: "100%",
          duration: 0.75,
        },
        {
          y: "0%",
          duration: 0.75,
          ease: "power2.in",
        }
      );

      timeline.to("#transition", {
        delay: 0.5,
        y: "-100%",
        duration: 0.75,
        ease: "power2.out",
        onComplete: () => {
          document.body.classList.remove("no-scroll");
        }, //enable scrolling
      });
    }
  };

  const handleTransition = async (e) => {
    e.preventDefault();

    if (target.startsWith("#")) {
      const targetElement = document.querySelector(target);

      if (targetElement) {
        // Scroll to the element instead of reloading
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Regular page navigation
      handleAnimation();
      await sleep(1000);
      router.push(target);

      // Coming from another page: scroll to the section once the page has changed.
      if (target !== href) {
        await sleep(1200);
        document.getElementById(target.split("#")[1])?.scrollIntoView();
      }
    }
  };

  return (
    <>
      <Link
        onClick={handleTransition}
        href={target}
        prefetch={false}
        className={className}
        {...props}
      >
        {children}
      </Link>
    </>
  );
};

export default TransitionLink;
