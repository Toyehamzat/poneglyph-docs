import React from "react";
import { FaCaretDown } from "react-icons/fa";
const markers = Array.from({ length: 83 }, (_, i) => i);
import { useMutation, useStorage } from "@liveblocks/react/suspense";

export const Ruler = () => {
  const leftMargin = useStorage((root) => root.leftMargin) ?? 56;
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set("leftMargin", position);
  }, []);
  const rightMargin = useStorage((root) => root.rightMargin);
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set("rightMargin", position);
  }, []);

  const [isDraggingLeft, setIsDraggingLeft] = React.useState(false);
  const [isDraggingRight, setIsDraggingRight] = React.useState(false);

  const rulerRef = React.useRef<HTMLDivElement>(null);
  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MIN_SPACING = 56;
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector(
        "#ruler-container"
      ) as HTMLDivElement;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MIN_SPACING;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - (leftMargin + MIN_SPACING);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const contrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );
          setRightMargin(contrainedRightPosition);
        }
      }
    }
  };
  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };
  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };
  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      className="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div className="w-full h-full relative" id="ruler-container">
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onDoubleClick={handleLeftDoubleClick}
          onMouseDown={handleLeftMouseDown}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onDoubleClick={handleRightDoubleClick}
          onMouseDown={handleRightMouseDown}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                    </>
                  )}
                  {marker % 5 !== 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  isLeft?: boolean;
  position?: number;
  isDragging?: boolean;
  onMouseDown?: () => void;
  onDoubleClick?: () => void;
}

const Marker = ({
  isDragging,
  isLeft,
  onDoubleClick,
  onMouseDown,
  position,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 fill-blue-500 transform -translate-x-1/2" />
      <div
        className={`absolute left-1/2 top-4 w-px h-screen bg-blue-500 transform -translate-x-1/2 transition-opacity duration-100 ${
          isDragging ? "opacity-100" : "opacity-0"
        } [background-image:linear-gradient(to_bottom,#3b82f6_4px,transparent_4px)] [background-size:1px_8px] [background-repeat:repeat-y] bg-transparent`}
      />
    </div>
  );
};
