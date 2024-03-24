import { useEffect, useRef } from "react";
import * as ROS3D from "ros3d";
import _debounce from "lodash/debounce";

export function Preview() {
  return <p>ROS3D</p>;
}

export function Component() {
  const containerRef: any = useRef(null);
  let viewer: any = useRef(null);

  useEffect(() => {
    if (!viewer.current && containerRef.current) {
      viewer.current = new ROS3D.Viewer({
        elem: containerRef.current,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        antialias: true,
      });
    }
    viewer.current.addObject(new ROS3D.Grid());

    const resize = () => {
      viewer.current.resize(
        containerRef.current?.offsetWidth,
        containerRef.current?.offsetHeight,
      );
    };
    new ResizeObserver(_debounce(resize, 1)).observe(containerRef.current);
  }, []);

  return <div ref={containerRef} className="w-full h-full"></div>;
}
