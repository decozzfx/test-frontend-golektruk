import React, { useState } from "react";

const data = [
  { id: 1, country: "United States" },
  { id: 2, country: "Canada" },
  { id: 3, country: "Mexico" },
  { id: 4, country: "Brazil" },
  { id: 5, country: "Argentina" },
  { id: 6, country: "United Kingdom" },
  { id: 7, country: "France" },
  { id: 8, country: "Germany" },
  { id: 9, country: "Italy" },
  { id: 10, country: "Spain" },
  { id: 11, country: "Russia" },
  { id: 12, country: "China" },
  { id: 13, country: "Japan" },
  { id: 14, country: "South Korea" },
  { id: 15, country: "India" },
  { id: 16, country: "Australia" },
  { id: 17, country: "South Africa" },
  { id: 18, country: "Egypt" },
  { id: 19, country: "Nigeria" },
  { id: 20, country: "Kenya" },
];

function Soal2() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <div style={{ width: "30%" }}>
        <div>
          <p
            style={{
              fontSize: "18px",
              color: "white",
            }}
          >
            Selected Country: {selectedCountry}
          </p>
        </div>

        <div>
          <select
            value={selectedCountry}
            onChange={handleSelectChange}
            style={{
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer",
              width: "100%",
            }}
          >
            <option value="" disabled>
              Select a country
            </option>
            {data.map((item) => (
              <option key={item.id} value={item.country}>
                {item.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ekspektasi hasil */}
      <iframe
        src="/soal2.mp4"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          border: "1px solid white",
        }}
      ></iframe>
    </div>
  );
}

export default Soal2;
