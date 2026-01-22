import React, { useState, useMemo } from "react";
import {
  Search,
  Droplet,
  Info,
  Download,
  Copy,
  Check,
  Palette,
  X,
  Menu,
  Share2,
  Sun,
  Moon,
  Ruler,
  Plus,
  Trash2,
  FileText,
  Calculator,
} from "lucide-react";

const PANTONE_COLORS = [
  {
    name: "Egret",
    hex: "#f3ece0",
    base: "ultra_pure_white",
  },
  {
    name: "Rain forest",
    hex: "#15463e",
    base: "deep_base",
  },
];

const SHINE_LEVELS = ["Matte", "Eggshell", "Satin", "Semi-Gloss", "High-Gloss"];

// Convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Convert RGB to HSL
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

// Convert RGB to CMYK
const rgbToCmyk = (r, g, b) => {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, m, y);

  c = (c - k) / (1 - k) || 0;
  m = (m - k) / (1 - k) || 0;
  y = (y - k) / (1 - k) || 0;

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
};

// Calculate paint needed for room
const calculatePaintForRoom = (dimensions) => {
  const { length, width, height, doors, windows, coats } = dimensions;

  // Convert to numbers
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const d = parseInt(doors) || 0;
  const win = parseInt(windows) || 0;
  const c = parseInt(coats) || 1;

  // Calculate wall area (all 4 walls)
  const wallArea = 2 * (l * h) + 2 * (w * h);

  // Subtract doors (average 20 sq ft each) and windows (average 15 sq ft each)
  const doorArea = d * 20;
  const windowArea = win * 15;

  // Total paintable area
  const paintableArea = wallArea - doorArea - windowArea;

  // Coverage: 1 gallon covers ~350 sq ft
  const gallonsNeeded = (paintableArea * c) / 350;
  const litersNeeded = gallonsNeeded * 3.78541;
  const quartsNeeded = gallonsNeeded * 4;

  return {
    wallArea: wallArea.toFixed(2),
    paintableArea: paintableArea.toFixed(2),
    gallons: gallonsNeeded.toFixed(2),
    liters: litersNeeded.toFixed(2),
    quarts: quartsNeeded.toFixed(2),
  };
};

// Calculate colorant ratios based on RGB values and base
const calculateColorants = (color, quantity, unit, shine) => {
  const rgb = hexToRgb(color.hex);
  const colorants = {};

  // Convert quantity to ml for calculation
  let volumeInMl = quantity;
  if (unit === "gallons") volumeInMl = quantity * 3785.41;
  else if (unit === "quarts") volumeInMl = quantity * 946.353;
  else volumeInMl = quantity * 1000; // liters to ml

  // Base colorant ratios per 1000ml based on RGB values
  const intensity = (rgb.r + rgb.g + rgb.b) / 3 / 255;
  const baseMultiplier = volumeInMl / 1000;

  // Red channel colorants
  if (rgb.r > 50) {
    const redRatio = (rgb.r / 255) * baseMultiplier;
    colorants["RL"] = (redRatio * 80).toFixed(2);
    if (rgb.r > 200) {
      colorants["RUL"] = (redRatio * 40).toFixed(2);
    }
  }

  // Yellow channel colorants
  if (rgb.g > 50 && rgb.r > 100) {
    const yellowRatio = ((rgb.r + rgb.g) / 510) * baseMultiplier;
    colorants["YL"] = (yellowRatio * 70).toFixed(2);
    if (rgb.g > rgb.b && rgb.r > rgb.b) {
      colorants["JL"] = (yellowRatio * 30).toFixed(2);
    }
  }

  // Blue channel colorants
  if (rgb.b > 50) {
    const blueRatio = (rgb.b / 255) * baseMultiplier;
    colorants["BL"] = (blueRatio * 75).toFixed(2);
    if (rgb.b > 150) {
      colorants["KXL"] = (blueRatio * 35).toFixed(2);
    }
  }

  // Green adjustment
  if (rgb.g > rgb.r && rgb.g > rgb.b) {
    const greenRatio = (rgb.g / 255) * baseMultiplier;
    colorants["YL"] = (greenRatio * 60).toFixed(2);
    colorants["BL"] = (greenRatio * 40).toFixed(2);
  }

  // Black/Gray colorants for dark colors
  if (intensity < 0.3) {
    const blackRatio = (1 - intensity) * baseMultiplier;
    colorants["CL"] = (blackRatio * 90).toFixed(2);
  } else if (intensity < 0.6) {
    const grayRatio = (0.6 - intensity) * baseMultiplier;
    colorants["IL"] = (grayRatio * 50).toFixed(2);
  }

  // Magenta/Purple adjustment
  if (rgb.r > 100 && rgb.b > 100 && rgb.g < 100) {
    const magentaRatio = ((rgb.r + rgb.b) / 510) * baseMultiplier;
    colorants["DL"] = (magentaRatio * 55).toFixed(2);
    colorants["VUL"] = (magentaRatio * 25).toFixed(2);
  }

  // Brown/Earth tones
  if (rgb.r > rgb.g && rgb.g > rgb.b && rgb.r < 200) {
    const brownRatio = ((rgb.r + rgb.g) / 510) * baseMultiplier;
    colorants["EL"] = (brownRatio * 45).toFixed(2);
    colorants["TL"] = (brownRatio * 30).toFixed(2);
  }

  // Orange tones
  if (rgb.r > 200 && rgb.g > 100 && rgb.g < 200 && rgb.b < 50) {
    const orangeRatio = ((rgb.r + rgb.g) / 510) * baseMultiplier;
    colorants["LL"] = (orangeRatio * 65).toFixed(2);
    colorants["AXL"] = (orangeRatio * 35).toFixed(2);
  }

  // White/Light colors
  if (intensity > 0.8) {
    colorants["FL"] = ((1 - (1 - intensity) * 2) * baseMultiplier * 20).toFixed(
      2
    );
  }

  // Shine level adjustment
  const shineMultipliers = {
    Matte: 0.8,
    Eggshell: 0.9,
    Satin: 1.0,
    "Semi-Gloss": 1.15,
    "High-Gloss": 1.3,
  };

  // Apply shine multiplier
  Object.keys(colorants).forEach((key) => {
    colorants[key] = (
      parseFloat(colorants[key]) * shineMultipliers[shine]
    ).toFixed(2);
  });

  // Remove very small values
  Object.keys(colorants).forEach((key) => {
    if (parseFloat(colorants[key]) < 0.5) {
      delete colorants[key];
    }
  });

  return colorants;
};

export default function PantoneColorMixer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("liters");
  const [shine, setShine] = useState("Satin");
  const [comparisonColors, setComparisonColors] = useState([]);
  const [comparisonCount, setComparisonCount] = useState(2);
  const [copiedHex, setCopiedHex] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [filterBase, setFilterBase] = useState("all");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  // Calculator state
  const [roomDimensions, setRoomDimensions] = useState({
    length: "",
    width: "",
    height: "",
    doors: 1,
    windows: 1,
    coats: 2,
  });
  const [calculatedPaint, setCalculatedPaint] = useState(null);

  const filteredColors = useMemo(() => {
    let colors = PANTONE_COLORS.filter((color) =>
      color.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterBase !== "all") {
      colors = colors.filter((color) => color.base === filterBase);
    }

    if (showFavorites) {
      colors = colors.filter((color) => favorites.includes(color.name));
    }

    if (sortBy === "name") {
      colors.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "lightness") {
      colors.sort((a, b) => {
        const rgbA = hexToRgb(a.hex);
        const rgbB = hexToRgb(b.hex);
        const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
        const hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
        return hslB.l - hslA.l;
      });
    } else if (sortBy === "saturation") {
      colors.sort((a, b) => {
        const rgbA = hexToRgb(a.hex);
        const rgbB = hexToRgb(b.hex);
        const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
        const hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
        return hslB.s - hslA.s;
      });
    }

    return colors;
  }, [searchTerm, sortBy, filterBase, showFavorites, favorites]);

  const toggleComparisonColor = (color) => {
    if (comparisonColors.find((c) => c.name === color.name)) {
      setComparisonColors(
        comparisonColors.filter((c) => c.name !== color.name)
      );
    } else if (comparisonColors.length < comparisonCount) {
      setComparisonColors([...comparisonColors, color]);
    }
  };

  const toggleFavorite = (colorName) => {
    if (favorites.includes(colorName)) {
      setFavorites(favorites.filter((name) => name !== colorName));
    } else {
      setFavorites([...favorites, colorName]);
    }
  };

  const getColorProperties = (color) => {
    const rgb = hexToRgb(color.hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    return { rgb, hsl, cmyk };
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleCalculatePaint = () => {
    const result = calculatePaintForRoom(roomDimensions);
    setCalculatedPaint(result);
  };

  const downloadColorData = (color) => {
    const props = getColorProperties(color);
    const colorants = calculateColorants(color, quantity, unit, shine);

    let content = `Pantone Color Specification\n`;
    content += `============================\n\n`;
    content += `Color Name: ${color.name}\n`;
    content += `HEX: ${color.hex}\n`;
    content += `RGB: ${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}\n`;
    content += `HSL: ${props.hsl.h}°, ${props.hsl.s}%, ${props.hsl.l}%\n`;
    content += `CMYK: ${props.cmyk.c}%, ${props.cmyk.m}%, ${props.cmyk.y}%, ${props.cmyk.k}%\n`;
    content += `Base: ${color.base}\n`;
    content += `Brightness: ${props.hsl.l}%\n`;
    content += `Saturation: ${props.hsl.s}%\n\n`;
    content += `Mix Configuration:\n`;
    content += `------------------\n`;
    content += `Quantity: ${quantity} ${unit}\n`;
    content += `Shine Level: ${shine}\n\n`;
    content += `Colorant Ratios:\n`;
    content += `----------------\n`;
    Object.entries(colorants).forEach(([colorant, amount]) => {
      content += `${colorant}: ${amount} ml\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${color.name.replace(/\s+/g, "_")}_specs.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPalette = () => {
    if (comparisonColors.length === 0) return;

    let content = `Color Palette Specification\n`;
    content += `============================\n\n`;
    content += `Number of Colors: ${comparisonColors.length}\n`;
    content += `Date: ${new Date().toLocaleDateString()}\n\n`;

    comparisonColors.forEach((color, idx) => {
      const props = getColorProperties(color);
      content += `\nColor ${idx + 1}: ${color.name}\n`;
      content += `${"=".repeat(40)}\n`;
      content += `HEX: ${color.hex}\n`;
      content += `RGB: ${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}\n`;
      content += `HSL: ${props.hsl.h}°, ${props.hsl.s}%, ${props.hsl.l}%\n`;
      content += `CMYK: ${props.cmyk.c}%, ${props.cmyk.m}%, ${props.cmyk.y}%, ${props.cmyk.k}%\n`;
      content += `Base: ${color.base}\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `color_palette_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addToProject = () => {
    if (!selectedColor) return;

    const projectItem = {
      id: Date.now(),
      color: selectedColor,
      quantity: quantity,
      unit: unit,
      shine: shine,
      area: calculatedPaint ? calculatedPaint.paintableArea : "",
      roomName: "",
    };

    if (currentProject) {
      setProjects(
        projects.map((p) =>
          p.id === currentProject.id
            ? { ...p, items: [...p.items, projectItem] }
            : p
        )
      );
    } else {
      const newProject = {
        id: Date.now(),
        name: `Project ${projects.length + 1}`,
        date: new Date().toISOString(),
        items: [projectItem],
      };
      setProjects([...projects, newProject]);
      setCurrentProject(newProject);
    }
  };

  const removeFromProject = (projectId, itemId) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? { ...p, items: p.items.filter((i) => i.id !== itemId) }
          : p
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
  };

  const downloadProjectReport = (project) => {
    let content = `Paint Project Report\n`;
    content += `====================\n\n`;
    content += `Project Name: ${project.name}\n`;
    content += `Date Created: ${new Date(project.date).toLocaleDateString()}\n`;
    content += `Total Items: ${project.items.length}\n`;
    content += `Report Generated: ${new Date().toLocaleString()}\n\n`;

    project.items.forEach((item, idx) => {
      const props = getColorProperties(item.color);
      const colorants = calculateColorants(
        item.color,
        item.quantity,
        item.unit,
        item.shine
      );

      content += `\nItem ${idx + 1}${
        item.roomName ? ` - ${item.roomName}` : ""
      }\n`;
      content += `${"-".repeat(50)}\n`;
      content += `Color: ${item.color.name}\n`;
      content += `HEX: ${item.color.hex}\n`;
      content += `RGB: ${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}\n`;
      content += `Base Required: ${item.color.base}\n`;
      content += `Quantity: ${item.quantity} ${item.unit}\n`;
      content += `Shine Level: ${item.shine}\n`;
      if (item.area) {
        content += `Area to Cover: ${item.area} sq ft\n`;
      }
      content += `\nColorant Formula:\n`;
      Object.entries(colorants).forEach(([colorant, amount]) => {
        content += `  ${colorant}: ${amount} ml\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, "_")}_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadFormula = () => {
    if (!selectedColor) return;
    downloadColorData(selectedColor);
  };

  const shareFormula = async () => {
    if (!selectedColor) return;

    const colorants = calculateColorants(selectedColor, quantity, unit, shine);
    const shareText = `${selectedColor.name} (${selectedColor.hex})\n${quantity} ${unit} • ${shine} finish\nBase: ${selectedColor.base}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pantone Color: ${selectedColor.name}`,
          text: shareText,
        });
      } catch (err) {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const textClass = darkMode ? "text-gray-100" : "text-gray-800";
  const textSecondaryClass = darkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = darkMode ? "border-gray-700" : "border-gray-200";
  const inputBgClass = darkMode ? "bg-gray-700 text-white" : "bg-white";

  return (
    <div
      className={`min-h-screen ${bgClass} flex flex-col transition-colors duration-200`}
    >
      {/* Mobile Header */}
      <div
        className={`lg:hidden ${cardBgClass} border-b ${borderClass} sticky top-0 z-20`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-xl font-serif ${textClass}`}>Pantone Mixer</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Calculator className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowProjects(!showProjects)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`border-t ${borderClass} p-4 space-y-3`}>
            <div>
              <label
                className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
              >
                View Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : `${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        } ${textSecondaryClass}`
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white"
                      : `${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        } ${textSecondaryClass}`
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
              >
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg text-sm`}
              >
                <option value="name">Name</option>
                <option value="lightness">Lightness</option>
                <option value="saturation">Saturation</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
              >
                Filter Base
              </label>
              <select
                value={filterBase}
                onChange={(e) => setFilterBase(e.target.value)}
                className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg text-sm`}
              >
                <option value="all">All Bases</option>
                <option value="ultra_pure_white">Ultra Pure White</option>
                <option value="deep_base">Deep Base</option>
              </select>
            </div>

            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`w-full px-3 py-2 rounded-lg text-sm ${
                showFavorites
                  ? "bg-yellow-500 text-white"
                  : `${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } ${textSecondaryClass}`
              }`}
            >
              {showFavorites
                ? "Show All Colors"
                : `Show Favorites (${favorites.length})`}
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 max-w-7xl mx-auto p-4 lg:p-6 w-full">
        {/* Desktop Header */}
        <header className="mb-6 lg:mb-8 hidden lg:block">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-3xl lg:text-4xl font-serif ${textClass} mb-2`}
              >
                Pantone Color Mixer
              </h1>
              <p className={textSecondaryClass}>
                Built for Home Depot Store - 7153
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className={`p-3 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } ${showCalculator ? "ring-2 ring-blue-500" : ""}`}
              >
                <Calculator className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowProjects(!showProjects)}
                className={`p-3 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } ${showProjects ? "ring-2 ring-blue-500" : ""}`}
              >
                <FileText className="w-6 h-6" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Paint Calculator Modal */}
        {showCalculator && (
          <div
            className={`mb-6 lg:mb-8 ${cardBgClass} rounded-lg shadow-lg p-4 lg:p-6 border-2 border-blue-500`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-lg lg:text-xl font-serif ${textClass} flex items-center gap-2`}
              >
                <Ruler className="w-5 h-5" />
                Paint Quantity Calculator
              </h2>
              <button
                onClick={() => setShowCalculator(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                >
                  Room Length (ft)
                </label>
                <input
                  type="number"
                  value={roomDimensions.length}
                  onChange={(e) =>
                    setRoomDimensions({
                      ...roomDimensions,
                      length: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg`}
                  placeholder="12"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                >
                  Room Width (ft)
                </label>
                <input
                  type="number"
                  value={roomDimensions.width}
                  onChange={(e) =>
                    setRoomDimensions({
                      ...roomDimensions,
                      width: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg`}
                  placeholder="10"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                >
                  Wall Height (ft)
                </label>
                <input
                  type="number"
                  value={roomDimensions.height}
                  onChange={(e) =>
                    setRoomDimensions({
                      ...roomDimensions,
                      height: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg`}
                  placeholder="8"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                >
                  Number of Doors
                </label>
                <input
                  type="number"
                  value={roomDimensions.doors}
                  onChange={(e) =>
                    setRoomDimensions({
                      ...roomDimensions,
                      doors: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                >
                  Number of Windows
                </label>
                <input
                  type="number"
                  value={roomDimensions.windows}
                  onChange={(e) =>
                    setRoomDimensions({
                      ...roomDimensions,
                      windows: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                >
                  Number of Coats
                </label>
                <input
                  type="number"
                  value={roomDimensions.coats}
                  onChange={(e) =>
                    setRoomDimensions({
                      ...roomDimensions,
                      coats: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg`}
                />
              </div>
            </div>

            <button
              onClick={handleCalculatePaint}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Calculate Paint Needed
            </button>

            {calculatedPaint && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h3 className={`font-semibold ${textClass} mb-2`}>Results:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className={textSecondaryClass}>Total Wall Area:</p>
                    <p className={`font-medium ${textClass}`}>
                      {calculatedPaint.wallArea} sq ft
                    </p>
                  </div>
                  <div>
                    <p className={textSecondaryClass}>Paintable Area:</p>
                    <p className={`font-medium ${textClass}`}>
                      {calculatedPaint.paintableArea} sq ft
                    </p>
                  </div>
                  <div>
                    <p className={textSecondaryClass}>Gallons Needed:</p>
                    <p className={`font-medium ${textClass}`}>
                      {calculatedPaint.gallons}
                    </p>
                  </div>
                  <div>
                    <p className={textSecondaryClass}>Liters Needed:</p>
                    <p className={`font-medium ${textClass}`}>
                      {calculatedPaint.liters}
                    </p>
                  </div>
                  <div>
                    <p className={textSecondaryClass}>Quarts Needed:</p>
                    <p className={`font-medium ${textClass}`}>
                      {calculatedPaint.quarts}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Projects Section */}
        {showProjects && (
          <div
            className={`mb-6 lg:mb-8 ${cardBgClass} rounded-lg shadow-lg p-4 lg:p-6 border-2 border-green-500`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-lg lg:text-xl font-serif ${textClass} flex items-center gap-2`}
              >
                <FileText className="w-5 h-5" />
                Paint Projects
              </h2>
              <button
                onClick={() => setShowProjects(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {projects.length === 0 ? (
              <p className={`text-center ${textSecondaryClass} py-8`}>
                No projects yet. Add colors to create your first project!
              </p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`border ${borderClass} rounded-lg p-4`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className={`font-semibold ${textClass}`}>
                          {project.name}
                        </h3>
                        <p className={`text-sm ${textSecondaryClass}`}>
                          {new Date(project.date).toLocaleDateString()} •{" "}
                          {project.items.length} items
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadProjectReport(project)}
                          className={`p-2 ${
                            darkMode ? "bg-gray-700" : "bg-gray-100"
                          } rounded hover:bg-opacity-80`}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {project.items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 p-2 rounded ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${textClass}`}>
                              {item.color.name}
                            </p>
                            <p className={`text-xs ${textSecondaryClass}`}>
                              {item.quantity} {item.unit} • {item.shine}
                              {item.area && ` • ${item.area} sq ft`}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeFromProject(project.id, item.id)
                            }
                            className="p-1 hover:bg-red-500 hover:text-white rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Color Comparison */}
        {comparisonColors.length > 0 && (
          <div
            className={`mb-6 lg:mb-8 ${cardBgClass} rounded-lg shadow-sm p-4 lg:p-6`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <h2 className={`text-lg lg:text-xl font-serif ${textClass}`}>
                Color Comparison
              </h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label
                  className={`text-sm ${textSecondaryClass} whitespace-nowrap`}
                >
                  Compare up to:
                </label>
                <select
                  value={comparisonCount}
                  onChange={(e) => {
                    const newCount = parseInt(e.target.value);
                    setComparisonCount(newCount);
                    if (comparisonColors.length > newCount) {
                      setComparisonColors(comparisonColors.slice(0, newCount));
                    }
                  }}
                  className={`flex-1 sm:flex-none px-3 py-1 border ${borderClass} ${inputBgClass} rounded text-sm`}
                >
                  {[2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} colors
                    </option>
                  ))}
                </select>
                <button
                  onClick={downloadPalette}
                  className={`p-2 ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  } rounded hover:bg-opacity-80`}
                  title="Download Palette"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              className={`flex h-24 lg:h-32 rounded-lg overflow-hidden border ${borderClass}`}
            >
              {comparisonColors.map((color, idx) => (
                <div
                  key={idx}
                  className="flex-1 relative group cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => toggleComparisonColor(color)}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-xs lg:text-sm font-medium px-2 py-1 bg-black bg-opacity-50 rounded">
                      Remove
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex mt-2 text-xs ${textSecondaryClass}">
              {comparisonColors.map((color, idx) => (
                <div key={idx} className="flex-1 text-center px-1 truncate">
                  {color.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Color Selection */}
          <div
            className={`lg:col-span-2 ${cardBgClass} rounded-lg shadow-sm p-4 lg:p-6`}
          >
            <div className="mb-4 lg:mb-6 space-y-3">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-3 ${textSecondaryClass} w-5 h-5`}
                />
                <input
                  type="text"
                  placeholder="Search Pantone colors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex gap-2 flex-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="name">Sort: Name</option>
                  <option value="lightness">Sort: Lightness</option>
                  <option value="saturation">Sort: Saturation</option>
                </select>

                <select
                  value={filterBase}
                  onChange={(e) => setFilterBase(e.target.value)}
                  className={`px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="all">All Bases</option>
                  <option value="ultra_pure_white">Ultra Pure White</option>
                  <option value="deep_base">Deep Base</option>
                </select>

                <button
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className={`px-3 py-2 ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  } rounded-lg text-sm ${textSecondaryClass} hover:bg-opacity-80`}
                >
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </button>

                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    showFavorites
                      ? "bg-yellow-500 text-white"
                      : `${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        } ${textSecondaryClass}`
                  }`}
                >
                  Favorites ({favorites.length})
                </button>
              </div>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-96 lg:max-h-[500px] overflow-y-auto pr-2"
                  : "space-y-2 max-h-96 lg:max-h-[500px] overflow-y-auto pr-2"
              }
            >
              {filteredColors.map((color) => {
                const isSelected = selectedColor?.name === color.name;
                const isInComparison = comparisonColors.find(
                  (c) => c.name === color.name
                );
                const isFavorite = favorites.includes(color.name);

                if (viewMode === "list") {
                  return (
                    <div
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`cursor-pointer rounded-lg border-2 transition-all p-3 ${
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : `${borderClass} hover:border-gray-400`
                      } ${isInComparison ? "ring-2 ring-green-300" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-16 h-16 rounded flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${textClass} truncate`}>
                            {color.name}
                          </p>
                          <p
                            className={`text-sm ${textSecondaryClass} font-mono`}
                          >
                            {color.hex}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(color.name);
                          }}
                          className="flex-shrink-0"
                        >
                          <Palette
                            className={`w-5 h-5 ${
                              isFavorite
                                ? "text-yellow-500 fill-yellow-500"
                                : textSecondaryClass
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`cursor-pointer rounded border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                        : `${borderClass} hover:border-gray-400`
                    } ${isInComparison ? "ring-2 ring-green-300" : ""}`}
                  >
                    <div
                      className="h-12 sm:h-14 lg:h-16 rounded-t relative"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isInComparison && (
                        <div className="absolute top-0.5 right-0.5 bg-green-500 text-white text-xs px-1 rounded">
                          ✓
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(color.name);
                        }}
                        className="absolute top-0.5 left-0.5"
                      >
                        <Palette
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            isFavorite
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-white opacity-0 hover:opacity-100"
                          }`}
                        />
                      </button>
                    </div>
                    <div className={`p-1 sm:p-1.5 ${cardBgClass} rounded-b`}>
                      <p
                        className={`text-xs ${textClass} truncate font-medium leading-tight`}
                      >
                        {color.name.replace("PANTONE ", "")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Details & Configuration */}
          <div className="space-y-4 lg:space-y-6">
            {/* Color Preview & Details */}
            {selectedColor && (
              <div className={`${cardBgClass} rounded-lg shadow-sm p-4 lg:p-6`}>
                <h2
                  className={`text-lg lg:text-xl font-serif ${textClass} mb-4`}
                >
                  Color Details
                </h2>

                <div
                  className={`w-full h-32 lg:h-40 rounded-lg border ${borderClass} mb-4`}
                  style={{ backgroundColor: selectedColor.hex }}
                />

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-base lg:text-lg font-semibold ${textClass}`}
                      >
                        {selectedColor.name}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(selectedColor.name)}
                        className="p-1"
                      >
                        <Palette
                          className={`w-5 h-5 ${
                            favorites.includes(selectedColor.name)
                              ? "text-yellow-500 fill-yellow-500"
                              : textSecondaryClass
                          }`}
                        />
                      </button>
                    </div>
                    <p className={`text-sm ${textSecondaryClass} mt-1`}>
                      Paint Base:{" "}
                      <span className={`font-medium ${textClass}`}>
                        {selectedColor.base}
                      </span>
                    </p>
                  </div>

                  {(() => {
                    const props = getColorProperties(selectedColor);
                    return (
                      <div className={`space-y-2 pt-2 border-t ${borderClass}`}>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className={`${textSecondaryClass} text-xs`}>
                              HEX
                            </p>
                            <div className="flex items-center gap-1">
                              <p className="font-mono font-medium text-xs sm:text-sm">
                                {selectedColor.hex}
                              </p>
                              <button
                                onClick={() =>
                                  copyToClipboard(selectedColor.hex)
                                }
                                className={`p-1 rounded hover:bg-opacity-10 ${
                                  darkMode ? "hover:bg-white" : "hover:bg-black"
                                }`}
                              >
                                {copiedHex ? (
                                  <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className={`${textSecondaryClass} text-xs`}>
                              RGB
                            </p>
                            <p className="font-mono text-xs">
                              {props.rgb.r}, {props.rgb.g}, {props.rgb.b}
                            </p>
                          </div>
                          <div>
                            <p className={`${textSecondaryClass} text-xs`}>
                              HSL
                            </p>
                            <p className="font-mono text-xs">
                              {props.hsl.h}°, {props.hsl.s}%, {props.hsl.l}%
                            </p>
                          </div>
                          <div>
                            <p className={`${textSecondaryClass} text-xs`}>
                              CMYK
                            </p>
                            <p className="font-mono text-xs">
                              {props.cmyk.c}, {props.cmyk.m}, {props.cmyk.y},{" "}
                              {props.cmyk.k}
                            </p>
                          </div>
                          <div>
                            <p className={`${textSecondaryClass} text-xs`}>
                              Brightness
                            </p>
                            <p className="font-mono text-xs">{props.hsl.l}%</p>
                          </div>
                          <div>
                            <p className={`${textSecondaryClass} text-xs`}>
                              Saturation
                            </p>
                            <p className="font-mono text-xs">{props.hsl.s}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => toggleComparisonColor(selectedColor)}
                    className="flex-1 px-3 lg:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    {comparisonColors.find((c) => c.name === selectedColor.name)
                      ? "Remove"
                      : "Compare"}
                  </button>
                  <button
                    onClick={() => downloadColorData(selectedColor)}
                    className={`px-3 py-2 ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } rounded-lg transition-colors`}
                    title="Download Color Data"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={shareFormula}
                    className={`px-3 py-2 ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } rounded-lg transition-colors`}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Configuration */}
            <div className={`${cardBgClass} rounded-lg shadow-sm p-4 lg:p-6`}>
              <h2 className={`text-lg lg:text-xl font-serif ${textClass} mb-4`}>
                Configuration
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                  >
                    Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="liters">Liters</option>
                    <option value="gallons">Gallons</option>
                    <option value="quarts">Quarts</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                  >
                    Shine Level
                  </label>
                  <select
                    value={shine}
                    onChange={(e) => setShine(e.target.value)}
                    className={`w-full px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {SHINE_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedColor && (
                  <button
                    onClick={addToProject}
                    className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Project
                  </button>
                )}
              </div>
            </div>

            {/* Colorant Formula */}
            {selectedColor && (
              <div className={`${cardBgClass} rounded-lg shadow-sm p-4 lg:p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg lg:text-xl font-serif ${textClass}`}>
                    Colorant Formula
                  </h2>
                  <button
                    onClick={downloadFormula}
                    className={`p-2 ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } rounded-lg hover:bg-opacity-80 transition-colors`}
                    title="Download Formula"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div
                  className={`mb-4 p-3 rounded-lg ${
                    darkMode
                      ? "bg-blue-900 border-blue-700"
                      : "bg-blue-50 border-blue-200"
                  } border`}
                >
                  <p
                    className={`text-sm ${
                      darkMode ? "text-blue-100" : "text-blue-900"
                    }`}
                  >
                    <Info className="w-4 h-4 inline mr-1" />
                    <strong>Base Required:</strong> {selectedColor.base}
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-blue-200" : "text-blue-700"
                    } mt-1`}
                  >
                    {quantity} {unit} • {shine} finish
                  </p>
                </div>

                <div className="space-y-2">
                  <p
                    className={`text-sm font-medium ${textSecondaryClass} mb-3 flex items-center gap-2`}
                  >
                    <Droplet className="w-4 h-4" />
                    Colorant Ratios:
                  </p>
                  {Object.entries(
                    calculateColorants(selectedColor, quantity, unit, shine)
                  ).map(([colorant, amount]) => (
                    <div
                      key={colorant}
                      className={`flex justify-between items-center py-2 px-3 ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      } rounded`}
                    >
                      <span
                        className={`font-mono text-sm font-medium ${textClass}`}
                      >
                        {colorant}
                      </span>
                      <span className={`text-sm ${textSecondaryClass}`}>
                        {amount} ml
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`${cardBgClass} border-t ${borderClass} mt-8 lg:mt-12 py-4`}
      >
        <p className={`text-center text-sm ${textSecondaryClass}`}>
          Created by Akhil Antony Joseph
        </p>
      </footer>
    </div>
  );
}
