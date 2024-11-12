import React, { useCallback, useState } from "react";

const Soal1 = () => {
  // 1. Buat kotak dibawah menjadi elemen drag and drop tanpa menggunakan plugin

  const DraggableComponent = () => {
    const [isDragging, setIsDragging] = useState(false);

    const [position, setPosition] = useState({ x: 100, y: 100 });

    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);

      setOffset({
        x: e.clientX - position.x,

        y: e.clientY - position.y,
      });
    };

    const handleMouseMove = useCallback(
      (e: { clientX: number; clientY: number }) => {
        if (isDragging) {
          setPosition({
            x: e.clientX - offset.x,

            y: e.clientY - offset.y,
          });
        }
      },
      [isDragging, offset]
    );

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    React.useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [handleMouseMove, isDragging]);

    return (
      <div
        className="draggable"
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: "40px",
          height: "40px",
          backgroundColor: "white",
          cursor: "grab",
          borderRadius: "8px",
        }}
      ></div>
    );
  };

  return (
    <>
      <DraggableComponent />
      {/* Ekspektasi hasil */}
      <iframe
        src="/soal1.mp4"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          border: "1px solid white",
        }}
      ></iframe>
    </>
  );
};

export default Soal1;
