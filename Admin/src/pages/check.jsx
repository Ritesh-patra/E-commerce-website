<div className="flex flex-wrap gap-2">
  <div 
    className={`px-4 sm:px-6 py-2 border bg-slate-200 cursor-pointer transition rounded text-sm sm:text-base ${sizes.includes("S") ? "bg-pink-100 border-pink-400 text-black": "" }`}
    onClick={() =>
      sizes.includes("S")
        ? setSizes(sizes.filter((item) => item !== "S"))
        : setSizes((prev) => [...prev, "S"])
    }
  >
    S
  </div>
  <div
    className={`px-4 sm:px-6 py-2 border bg-slate-200 cursor-pointer transition rounded text-sm sm:text-base ${
      sizes.includes("M")
        ? "bg-pink-100 border-pink-400 text-black"
        : ""
    }`}
    onClick={() =>
      sizes.includes("M")
        ? setSizes(sizes.filter((item) => item !== "M"))
        : setSizes((prev) => [...prev, "M"])
    }
  >
    M
  </div>
  <div
    className={`px-4 sm:px-6 py-2 border bg-slate-200 cursor-pointer transition rounded text-sm sm:text-base ${
      sizes.includes("L")
        ? "bg-pink-100 border-pink-400 text-black"
        : ""
    }`}
    onClick={() =>
      sizes.includes("L")
        ? setSizes(sizes.filter((item) => item !== "L"))
        : setSizes((prev) => [...prev, "L"])
    }
  >
    L
  </div>
  <div
    className={`px-4 sm:px-6 py-2 border bg-slate-200 cursor-pointer transition rounded text-sm sm:text-base ${
      sizes.includes("XL")
        ? "bg-pink-100 border-pink-400 text-black"
        : ""
    }`}
    onClick={() =>
      sizes.includes("XL")
        ? setSizes(sizes.filter((item) => item !== "XL"))
        : setSizes((prev) => [...prev, "XL"])
    }
  >
    XL
  </div>
  <div
    className={`px-4 sm:px-6 py-2 border bg-slate-200 cursor-pointer transition rounded text-sm sm:text-base ${
      sizes.includes("XXL")
        ? "bg-pink-100 border-pink-400 text-black"
        : ""
    }`}
    onClick={() =>
      sizes.includes("XXL")
        ? setSizes(sizes.filter((item) => item !== "XXL"))
        : setSizes((prev) => [...prev, "XXL"])
    }
  >
    XXL
  </div>
</div>