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
    name: "Snow white",
    hex: "#f2f0eb",
    base: "ultra_pure_white",
  },
  {
    name: "Bright white",
    hex: "#f4f5f0",
    base: "ultra_pure_white",
  },
  {
    name: "Cloud dancer",
    hex: "#f0eee9",
    base: "ultra_pure_white",
  },
  {
    name: "Gardenia",
    hex: "#f1e8df",
    base: "ultra_pure_white",
  },
  {
    name: "Marshmallow",
    hex: "#f0eee4",
    base: "ultra_pure_white",
  },
  {
    name: "Blanc de blanc",
    hex: "#e7e9e7",
    base: "ultra_pure_white",
  },
  {
    name: "Pristine",
    hex: "#f2e8da",
    base: "ultra_pure_white",
  },
  {
    name: "Whisper white",
    hex: "#ede6db",
    base: "ultra_pure_white",
  },
  {
    name: "White asparagus",
    hex: "#e1dbc8",
    base: "ultra_pure_white",
  },
  {
    name: "Birch",
    hex: "#ddd5c7",
    base: "ultra_pure_white",
  },
  {
    name: "Turtledove",
    hex: "#ded7c8",
    base: "ultra_pure_white",
  },
  {
    name: "Bone white",
    hex: "#d7d0c0",
    base: "ultra_pure_white",
  },
  {
    name: "Silver birch",
    hex: "#d2cfc4",
    base: "ultra_pure_white",
  },
  {
    name: "Vanilla ice",
    hex: "#f0eada",
    base: "ultra_pure_white",
  },
  {
    name: "Papyrus",
    hex: "#f5edd6",
    base: "ultra_pure_white",
  },
  {
    name: "Antique white",
    hex: "#ede3d2",
    base: "ultra_pure_white",
  },
  {
    name: "Winter white",
    hex: "#f5ecd2",
    base: "ultra_pure_white",
  },
  {
    name: "Cloud cream",
    hex: "#e6ddc5",
    base: "ultra_pure_white",
  },
  {
    name: "Angora",
    hex: "#dfd1bb",
    base: "ultra_pure_white",
  },
  {
    name: "Seedpearl",
    hex: "#e6dac4",
    base: "ultra_pure_white",
  },
  {
    name: "Vanilla custard",
    hex: "#f3e0be",
    base: "ultra_pure_white",
  },
  {
    name: "Almond oil",
    hex: "#f4efc1",
    base: "ultra_pure_white",
  },
  {
    name: "Alabaster gleam",
    hex: "#f0debd",
    base: "ultra_pure_white",
  },
  {
    name: "Vanilla",
    hex: "#f4e1c1",
    base: "ultra_pure_white",
  },
  {
    name: "Rutabaga",
    hex: "#ecddbe",
    base: "ultra_pure_white",
  },
  {
    name: "Banana crepe",
    hex: "#e7d3ad",
    base: "ultra_pure_white",
  },
  {
    name: "Italian straw",
    hex: "#e7d1a1",
    base: "ultra_pure_white",
  },
  {
    name: "Whitecap gray",
    hex: "#e0d5c6",
    base: "ultra_pure_white",
  },
  {
    name: "Fog",
    hex: "#d0c5b1",
    base: "ultra_pure_white",
  },
  {
    name: "White swan",
    hex: "#e4d7c5",
    base: "ultra_pure_white",
  },
  {
    name: "Sandshell",
    hex: "#d8ccbb",
    base: "ultra_pure_white",
  },
  {
    name: "Tapioca",
    hex: "#dccdbc",
    base: "ultra_pure_white",
  },
  {
    name: "Creme brulee",
    hex: "#dbccb5",
    base: "ultra_pure_white",
  },
  {
    name: "Parchment",
    hex: "#dfd1be",
    base: "ultra_pure_white",
  },
  {
    name: "Sheer pink",
    hex: "#f6e5db",
    base: "ultra_pure_white",
  },
  {
    name: "Dew",
    hex: "#eeded1",
    base: "ultra_pure_white",
  },
  {
    name: "Powder puff",
    hex: "#f3e0d6",
    base: "ultra_pure_white",
  },
  {
    name: "Pearled ivory",
    hex: "#f0dfcc",
    base: "ultra_pure_white",
  },
  {
    name: "White smoke",
    hex: "#eddcc9",
    base: "ultra_pure_white",
  },
  {
    name: "Ecru",
    hex: "#f3dfca",
    base: "ultra_pure_white",
  },
  {
    name: "Navajo",
    hex: "#efdcc3",
    base: "ultra_pure_white",
  },
  {
    name: "Almost mauve",
    hex: "#e7dcd9",
    base: "ultra_pure_white",
  },
  {
    name: "Delicacy",
    hex: "#f5e3e2",
    base: "ultra_pure_white",
  },
  {
    name: "Petal pink",
    hex: "#f2e2e0",
    base: "ultra_pure_white",
  },
  {
    name: "Bridal blush",
    hex: "#eee2dd",
    base: "ultra_pure_white",
  },
  {
    name: "Cream pink",
    hex: "#f6e4d9",
    base: "ultra_pure_white",
  },
  {
    name: "Angel wing",
    hex: "#f3dfd7",
    base: "ultra_pure_white",
  },
  {
    name: "Pastel parchment",
    hex: "#e5d9d3",
    base: "ultra_pure_white",
  },
  {
    name: "Star white",
    hex: "#efefe8",
    base: "ultra_pure_white",
  },
  {
    name: "Lily white",
    hex: "#e2e2da",
    base: "ultra_pure_white",
  },
  {
    name: "Vaporous gray",
    hex: "#dfddd7",
    base: "ultra_pure_white",
  },
  {
    name: "Summer shower",
    hex: "#e5ebe3",
    base: "ultra_pure_white",
  },
  {
    name: "Ice",
    hex: "#e0e4d9",
    base: "ultra_pure_white",
  },
  {
    name: "Frost",
    hex: "#dde2d6",
    base: "ultra_pure_white",
  },
  {
    name: "Icicle",
    hex: "#dadcd0",
    base: "ultra_pure_white",
  },
  {
    name: "Bit of blue",
    hex: "#e2eaeb",
    base: "ultra_pure_white",
  },
  {
    name: "Mystic blue",
    hex: "#e1e3de",
    base: "ultra_pure_white",
  },
  {
    name: "Bluewash",
    hex: "#e2e6e0",
    base: "ultra_pure_white",
  },
  {
    name: "Spa blue",
    hex: "#d3dedf",
    base: "ultra_pure_white",
  },
  {
    name: "Lightest sky",
    hex: "#e4eadf",
    base: "ultra_pure_white",
  },
  {
    name: "Hint of mint",
    hex: "#d8e8e6",
    base: "ultra_pure_white",
  },
  {
    name: "Murmur",
    hex: "#d2d8d2",
    base: "ultra_pure_white",
  },
  {
    name: "Barely blue",
    hex: "#dde0df",
    base: "ultra_pure_white",
  },
  {
    name: "Blue blush",
    hex: "#d6dbd9",
    base: "ultra_pure_white",
  },
  {
    name: "Zephyr blue",
    hex: "#d3d9d1",
    base: "ultra_pure_white",
  },
  {
    name: "Blue flower",
    hex: "#d0d9d4",
    base: "ultra_pure_white",
  },
  {
    name: "Sprout green",
    hex: "#cbd7d2",
    base: "ultra_pure_white",
  },
  {
    name: "Billowing sail",
    hex: "#d8e7e7",
    base: "ultra_pure_white",
  },
  {
    name: "Hushed green",
    hex: "#d8e9e5",
    base: "ultra_pure_white",
  },
  {
    name: "Lamb's wool",
    hex: "#e5d0b1",
    base: "ultra_pure_white",
  },
  {
    name: "Winter wheat",
    hex: "#dfc09f",
    base: "ultra_pure_white",
  },
  {
    name: "Summer melon",
    hex: "#ead3ae",
    base: "ultra_pure_white",
  },
  {
    name: "Chamomile",
    hex: "#e8d0a7",
    base: "ultra_pure_white",
  },
  {
    name: "Cornhusk",
    hex: "#f2d6ae",
    base: "ultra_pure_white",
  },
  {
    name: "Apricot gelato",
    hex: "#f5d7af",
    base: "ultra_pure_white",
  },
  {
    name: "Biscotti",
    hex: "#dac7ab",
    base: "ultra_pure_white",
  },
  {
    name: "Asparagus green",
    hex: "#d2cdb4",
    base: "ultra_pure_white",
  },
  {
    name: "Oyster white",
    hex: "#d2caaf",
    base: "ultra_pure_white",
  },
  {
    name: "Putty",
    hex: "#d4cab0",
    base: "ultra_pure_white",
  },
  {
    name: "Moth",
    hex: "#d2cbaf",
    base: "ultra_pure_white",
  },
  {
    name: "Wood ash",
    hex: "#d7cab0",
    base: "ultra_pure_white",
  },
  {
    name: "Gravel",
    hex: "#cbbfa2",
    base: "ultra_pure_white",
  },
  {
    name: "Pale khaki",
    hex: "#bfaf92",
    base: "ultra_pure_white",
  },
  {
    name: "Light gray",
    hex: "#dad8c9",
    base: "ultra_pure_white",
  },
  {
    name: "Silver green",
    hex: "#d7d7c7",
    base: "ultra_pure_white",
  },
  {
    name: "Pelican",
    hex: "#c1bcac",
    base: "ultra_pure_white",
  },
  {
    name: "Overcast",
    hex: "#c3bdab",
    base: "ultra_pure_white",
  },
  {
    name: "Tidal foam",
    hex: "#bfb9a3",
    base: "ultra_pure_white",
  },
  {
    name: "Agate gray",
    hex: "#b1b09f",
    base: "ultra_pure_white",
  },
  {
    name: "Alfalfa",
    hex: "#b7b59f",
    base: "ultra_pure_white",
  },
  {
    name: "Castle wall",
    hex: "#c8c1ab",
    base: "ultra_pure_white",
  },
  {
    name: "Oyster gray",
    hex: "#cbc1ae",
    base: "ultra_pure_white",
  },
  {
    name: "Cement",
    hex: "#c4b6a6",
    base: "ultra_pure_white",
  },
  {
    name: "Spray green",
    hex: "#aea692",
    base: "ultra_pure_white",
  },
  {
    name: "Eucalyptus",
    hex: "#b1a992",
    base: "ultra_pure_white",
  },
  {
    name: "Twill",
    hex: "#a79b82",
    base: "ultra_pure_white",
  },
  {
    name: "Olive gray",
    hex: "#a6997a",
    base: "ultra_pure_white",
  },
  {
    name: "Chinchilla",
    hex: "#9c8e7b",
    base: "ultra_pure_white",
  },
  {
    name: "Seneca rock",
    hex: "#9a927f",
    base: "ultra_pure_white",
  },
  {
    name: "Laurel oak",
    hex: "#918c7e",
    base: "ultra_pure_white",
  },
  {
    name: "Coriander",
    hex: "#938772",
    base: "ultra_pure_white",
  },
  {
    name: "Dune",
    hex: "#998978",
    base: "ultra_pure_white",
  },
  {
    name: "Lead gray",
    hex: "#8a7963",
    base: "medium_base",
  },
  {
    name: "Covert green",
    hex: "#80765f",
    base: "medium_base",
  },
  {
    name: "Oxford tan",
    hex: "#b8a99a",
    base: "ultra_pure_white",
  },
  {
    name: "Plaza taupe",
    hex: "#aea393",
    base: "ultra_pure_white",
  },
  {
    name: "Tuffet",
    hex: "#a59788",
    base: "ultra_pure_white",
  },
  {
    name: "Silver mink",
    hex: "#9f8d7c",
    base: "ultra_pure_white",
  },
  {
    name: "Timber wolf",
    hex: "#8d8070",
    base: "medium_base",
  },
  {
    name: "Taupe gray",
    hex: "#8e7c71",
    base: "medium_base",
  },
  {
    name: "Pine bark",
    hex: "#827064",
    base: "medium_base",
  },
  {
    name: "Pumice stone",
    hex: "#cac2b9",
    base: "ultra_pure_white",
  },
  {
    name: "Simply taupe",
    hex: "#ad9f93",
    base: "ultra_pure_white",
  },
  {
    name: "Aluminum",
    hex: "#9f9586",
    base: "ultra_pure_white",
  },
  {
    name: "Cobblestone",
    hex: "#a89a8e",
    base: "ultra_pure_white",
  },
  {
    name: "Brindle",
    hex: "#82776b",
    base: "medium_base",
  },
  {
    name: "Walnut",
    hex: "#776a5f",
    base: "medium_base",
  },
  {
    name: "Bungee cord",
    hex: "#696156",
    base: "medium_base",
  },
  {
    name: "Oatmeal",
    hex: "#cbc3b4",
    base: "ultra_pure_white",
  },
  {
    name: "Moonbeam",
    hex: "#cdc6bd",
    base: "ultra_pure_white",
  },
  {
    name: "Rainy day",
    hex: "#cfc8bd",
    base: "ultra_pure_white",
  },
  {
    name: "Gray morn",
    hex: "#cabeb5",
    base: "ultra_pure_white",
  },
  {
    name: "Peyote",
    hex: "#c5bbae",
    base: "ultra_pure_white",
  },
  {
    name: "Feather gray",
    hex: "#b8ad9e",
    base: "ultra_pure_white",
  },
  {
    name: "Goat",
    hex: "#a89a91",
    base: "ultra_pure_white",
  },
  {
    name: "White sand",
    hex: "#dbd5d1",
    base: "ultra_pure_white",
  },
  {
    name: "Silver gray",
    hex: "#c1b7b0",
    base: "ultra_pure_white",
  },
  {
    name: "Chateau gray",
    hex: "#bbb1a8",
    base: "ultra_pure_white",
  },
  {
    name: "String",
    hex: "#aa9f96",
    base: "ultra_pure_white",
  },
  {
    name: "Atmosphere",
    hex: "#a89c94",
    base: "ultra_pure_white",
  },
  {
    name: "Moon rock",
    hex: "#958b84",
    base: "ultra_pure_white",
  },
  {
    name: "Fungi",
    hex: "#8f8177",
    base: "ultra_pure_white",
  },
  {
    name: "Silver lining",
    hex: "#bdb6ab",
    base: "ultra_pure_white",
  },
  {
    name: "Moonstruck",
    hex: "#c2beb6",
    base: "ultra_pure_white",
  },
  {
    name: "Pussywillow gray",
    hex: "#aeaca1",
    base: "ultra_pure_white",
  },
  {
    name: "London fog",
    hex: "#a29e92",
    base: "ultra_pure_white",
  },
  {
    name: "Rock ridge",
    hex: "#918c86",
    base: "ultra_pure_white",
  },
  {
    name: "Moon mist",
    hex: "#80817d",
    base: "medium_base",
  },
  {
    name: "Castor gray",
    hex: "#646762",
    base: "medium_base",
  },
  {
    name: "Glacier gray",
    hex: "#c5c6c7",
    base: "ultra_pure_white",
  },
  {
    name: "Lunar rock",
    hex: "#c5c5c5",
    base: "ultra_pure_white",
  },
  {
    name: "Dawn blue",
    hex: "#cacccb",
    base: "ultra_pure_white",
  },
  {
    name: "Gray violet",
    hex: "#bbbcbc",
    base: "ultra_pure_white",
  },
  {
    name: "Vapor blue",
    hex: "#bebdbd",
    base: "ultra_pure_white",
  },
  {
    name: "High-rise",
    hex: "#aeb2b5",
    base: "ultra_pure_white",
  },
  {
    name: "Limestone",
    hex: "#989a98",
    base: "ultra_pure_white",
  },
  {
    name: "Silver cloud",
    hex: "#beb7b0",
    base: "ultra_pure_white",
  },
  {
    name: "Dove",
    hex: "#b3ada7",
    base: "ultra_pure_white",
  },
  {
    name: "Flint gray",
    hex: "#a09c98",
    base: "ultra_pure_white",
  },
  {
    name: "Drizzle",
    hex: "#a09f9c",
    base: "ultra_pure_white",
  },
  {
    name: "Elephant skin",
    hex: "#8f8982",
    base: "ultra_pure_white",
  },
  {
    name: "Cinder",
    hex: "#8a7e78",
    base: "ultra_pure_white",
  },
  {
    name: "Steeple gray",
    hex: "#827e7c",
    base: "medium_base",
  },
  {
    name: "Metal",
    hex: "#babfbc",
    base: "ultra_pure_white",
  },
  {
    name: "Blue fox",
    hex: "#b9bcb6",
    base: "ultra_pure_white",
  },
  {
    name: "Storm gray",
    hex: "#b5bab6",
    base: "ultra_pure_white",
  },
  {
    name: "Pigeon",
    hex: "#a9afaa",
    base: "ultra_pure_white",
  },
  {
    name: "Mirage gray",
    hex: "#abafae",
    base: "ultra_pure_white",
  },
  {
    name: "Puritan gray",
    hex: "#a8b0ae",
    base: "ultra_pure_white",
  },
  {
    name: "Wrought iron",
    hex: "#999e98",
    base: "ultra_pure_white",
  },
  {
    name: "Opal gray",
    hex: "#a49e9e",
    base: "ultra_pure_white",
  },
  {
    name: "Wild dove",
    hex: "#8b8c89",
    base: "ultra_pure_white",
  },
  {
    name: "Neutral gray",
    hex: "#8e918f",
    base: "ultra_pure_white",
  },
  {
    name: "Gargoyle",
    hex: "#686767",
    base: "medium_base",
  },
  {
    name: "Smoked pearl",
    hex: "#656466",
    base: "medium_base",
  },
  {
    name: "Sedona sage",
    hex: "#686d6c",
    base: "medium_base",
  },
  {
    name: "Gunmetal",
    hex: "#5c5d5b",
    base: "medium_base",
  },
  {
    name: "Wind chime",
    hex: "#cac5c2",
    base: "ultra_pure_white",
  },
  {
    name: "Paloma",
    hex: "#9f9c99",
    base: "ultra_pure_white",
  },
  {
    name: "Charcoal gray",
    hex: "#6c6868",
    base: "medium_base",
  },
  {
    name: "Steel gray",
    hex: "#726f70",
    base: "medium_base",
  },
  {
    name: "Pewter",
    hex: "#666564",
    base: "medium_base",
  },
  {
    name: "Castlerock",
    hex: "#5f5e62",
    base: "medium_base",
  },
  {
    name: "Nine iron",
    hex: "#46434a",
    base: "medium_base",
  },
  {
    name: "Ash",
    hex: "#a09998",
    base: "ultra_pure_white",
  },
  {
    name: "Cloudburst",
    hex: "#837f7f",
    base: "ultra_pure_white",
  },
  {
    name: "Frost gray",
    hex: "#848283",
    base: "ultra_pure_white",
  },
  {
    name: "Excalibur",
    hex: "#676168",
    base: "medium_base",
  },
  {
    name: "Dark gull gray",
    hex: "#625d5d",
    base: "medium_base",
  },
  {
    name: "Rabbit",
    hex: "#5f575c",
    base: "medium_base",
  },
  {
    name: "Shale",
    hex: "#4a3f41",
    base: "medium_base",
  },
  {
    name: "Fossil",
    hex: "#806f63",
    base: "medium_base",
  },
  {
    name: "Major brown",
    hex: "#5b5149",
    base: "medium_base",
  },
  {
    name: "Chocolate chip",
    hex: "#685a4e",
    base: "medium_base",
  },
  {
    name: "Canteen",
    hex: "#5e5347",
    base: "medium_base",
  },
  {
    name: "Stone gray",
    hex: "#685e4f",
    base: "medium_base",
  },
  {
    name: "Capers",
    hex: "#695e4b",
    base: "medium_base",
  },
  {
    name: "Beech",
    hex: "#5b4f3b",
    base: "medium_base",
  },
  {
    name: "Tarmac",
    hex: "#5a5348",
    base: "medium_base",
  },
  {
    name: "Wren",
    hex: "#4a4139",
    base: "medium_base",
  },
  {
    name: "Black olive",
    hex: "#48413b",
    base: "medium_base",
  },
  {
    name: "Beluga",
    hex: "#4a4843",
    base: "medium_base",
  },
  {
    name: "Black ink",
    hex: "#44413c",
    base: "medium_base",
  },
  {
    name: "Peat",
    hex: "#3b3a36",
    base: "deep_base",
  },
  {
    name: "Jet set",
    hex: "#262c2a",
    base: "deep_base",
  },
  {
    name: "Iron",
    hex: "#736460",
    base: "medium_base",
  },
  {
    name: "Plum kitten",
    hex: "#625b5c",
    base: "medium_base",
  },
  {
    name: "Turkish coffee",
    hex: "#483f39",
    base: "medium_base",
  },
  {
    name: "Black coffee",
    hex: "#3b302f",
    base: "deep_base",
  },
  {
    name: "After dark",
    hex: "#3c3535",
    base: "deep_base",
  },
  {
    name: "Licorice",
    hex: "#3a3536",
    base: "deep_base",
  },
  {
    name: "Raven",
    hex: "#413e3d",
    base: "deep_base",
  },
  {
    name: "Jet black",
    hex: "#2d2c2f",
    base: "deep_base",
  },
  {
    name: "Phantom",
    hex: "#39373b",
    base: "deep_base",
  },
  {
    name: "Stretch limo",
    hex: "#2b2c30",
    base: "deep_base",
  },
  {
    name: "Moonless night",
    hex: "#2f2d30",
    base: "deep_base",
  },
  {
    name: "Caviar",
    hex: "#292a2d",
    base: "deep_base",
  },
  {
    name: "Pirate black",
    hex: "#363838",
    base: "deep_base",
  },
  {
    name: "Anthracite",
    hex: "#28282d",
    base: "deep_base",
  },
  {
    name: "Vanilla cream",
    hex: "#f4d8c6",
    base: "ultra_pure_white",
  },
  {
    name: "Dawn",
    hex: "#ebd2b7",
    base: "ultra_pure_white",
  },
  {
    name: "Gray sand",
    hex: "#e5ccaf",
    base: "ultra_pure_white",
  },
  {
    name: "Autumn blonde",
    hex: "#eed0ae",
    base: "ultra_pure_white",
  },
  {
    name: "Apricot illusion",
    hex: "#e2c4a6",
    base: "ultra_pure_white",
  },
  {
    name: "Mellow buff",
    hex: "#d8b998",
    base: "ultra_pure_white",
  },
  {
    name: "Sheepskin",
    hex: "#dab58f",
    base: "ultra_pure_white",
  },
  {
    name: "Almond buff",
    hex: "#ccb390",
    base: "ultra_pure_white",
  },
  {
    name: "Beige",
    hex: "#d5ba98",
    base: "ultra_pure_white",
  },
  {
    name: "Sand",
    hex: "#cca67f",
    base: "ultra_pure_white",
  },
  {
    name: "Latte",
    hex: "#c5a582",
    base: "ultra_pure_white",
  },
  {
    name: "Tan",
    hex: "#b69574",
    base: "ultra_pure_white",
  },
  {
    name: "Doe",
    hex: "#b98e68",
    base: "ultra_pure_white",
  },
  {
    name: "Indian tan",
    hex: "#ad8567",
    base: "ultra_pure_white",
  },
  {
    name: "Safari",
    hex: "#baaa91",
    base: "ultra_pure_white",
  },
  {
    name: "Candied ginger",
    hex: "#bfa387",
    base: "ultra_pure_white",
  },
  {
    name: "Warm sand",
    hex: "#c5ae91",
    base: "ultra_pure_white",
  },
  {
    name: "Cuban sand",
    hex: "#c1a68d",
    base: "ultra_pure_white",
  },
  {
    name: "Nougat",
    hex: "#b69885",
    base: "ultra_pure_white",
  },
  {
    name: "Natural",
    hex: "#aa907d",
    base: "ultra_pure_white",
  },
  {
    name: "Nomad",
    hex: "#b49f89",
    base: "ultra_pure_white",
  },
  {
    name: "Frozen dew",
    hex: "#d8cfb2",
    base: "ultra_pure_white",
  },
  {
    name: "Bleached sand",
    hex: "#daccb4",
    base: "ultra_pure_white",
  },
  {
    name: "Pebble",
    hex: "#cab698",
    base: "ultra_pure_white",
  },
  {
    name: "Croissant",
    hex: "#c4ab86",
    base: "ultra_pure_white",
  },
  {
    name: "Incense",
    hex: "#af9a7e",
    base: "ultra_pure_white",
  },
  {
    name: "Cornstalk",
    hex: "#a9947a",
    base: "ultra_pure_white",
  },
  {
    name: "Tannin",
    hex: "#a68a6d",
    base: "ultra_pure_white",
  },
  {
    name: "Green haze",
    hex: "#cac4a4",
    base: "ultra_pure_white",
  },
  {
    name: "Mojave desert",
    hex: "#c7b595",
    base: "ultra_pure_white",
  },
  {
    name: "Taos taupe",
    hex: "#bfa77f",
    base: "ultra_pure_white",
  },
  {
    name: "Lark",
    hex: "#b89b72",
    base: "ultra_pure_white",
  },
  {
    name: "Kelp",
    hex: "#988467",
    base: "medium_base",
  },
  {
    name: "Antique bronze",
    hex: "#907954",
    base: "medium_base",
  },
  {
    name: "Dull gold",
    hex: "#8a6f48",
    base: "medium_base",
  },
  {
    name: "Brown sugar",
    hex: "#a17249",
    base: "medium_base",
  },
  {
    name: "Chipmunk",
    hex: "#976f4c",
    base: "medium_base",
  },
  {
    name: "Tobacco brown",
    hex: "#9a7352",
    base: "medium_base",
  },
  {
    name: "Bison",
    hex: "#6e4f3a",
    base: "medium_base",
  },
  {
    name: "Monk's robe",
    hex: "#704822",
    base: "medium_base",
  },
  {
    name: "Dachshund",
    hex: "#704f37",
    base: "medium_base",
  },
  {
    name: "Toffee",
    hex: "#755139",
    base: "medium_base",
  },
  {
    name: "Aztec",
    hex: "#7a5747",
    base: "medium_base",
  },
  {
    name: "Cocoa brown",
    hex: "#6c5043",
    base: "medium_base",
  },
  {
    name: "Partridge",
    hex: "#725440",
    base: "medium_base",
  },
  {
    name: "Friar brown",
    hex: "#6e493a",
    base: "medium_base",
  },
  {
    name: "Mustang",
    hex: "#684b40",
    base: "medium_base",
  },
  {
    name: "Pinecone",
    hex: "#61473b",
    base: "medium_base",
  },
  {
    name: "Potting soil",
    hex: "#54392d",
    base: "deep_base",
  },
  {
    name: "Ermine",
    hex: "#836b4f",
    base: "medium_base",
  },
  {
    name: "Otter",
    hex: "#7f674f",
    base: "medium_base",
  },
  {
    name: "Kangaroo",
    hex: "#725e43",
    base: "medium_base",
  },
  {
    name: "Sepia",
    hex: "#6b543e",
    base: "medium_base",
  },
  {
    name: "Coffee liqueur",
    hex: "#6a513b",
    base: "medium_base",
  },
  {
    name: "Desert palm",
    hex: "#5a4632",
    base: "medium_base",
  },
  {
    name: "Teak",
    hex: "#655341",
    base: "medium_base",
  },
  {
    name: "Shitake",
    hex: "#736253",
    base: "medium_base",
  },
  {
    name: "Cub",
    hex: "#6e5c4b",
    base: "medium_base",
  },
  {
    name: "Carafe",
    hex: "#5d473a",
    base: "medium_base",
  },
  {
    name: "Dark earth",
    hex: "#5c4939",
    base: "medium_base",
  },
  {
    name: "Slate black",
    hex: "#4b3d33",
    base: "deep_base",
  },
  {
    name: "Chocolate brown",
    hex: "#4e403b",
    base: "medium_base",
  },
  {
    name: "Demitasse",
    hex: "#40342b",
    base: "deep_base",
  },
  {
    name: "Deep taupe",
    hex: "#7b6660",
    base: "medium_base",
  },
  {
    name: "Shopping bag",
    hex: "#5a4743",
    base: "medium_base",
  },
  {
    name: "Chestnut",
    hex: "#584039",
    base: "medium_base",
  },
  {
    name: "Bracken",
    hex: "#4f3f3b",
    base: "medium_base",
  },
  {
    name: "Seal brown",
    hex: "#493b39",
    base: "deep_base",
  },
  {
    name: "Java",
    hex: "#433331",
    base: "deep_base",
  },
  {
    name: "Coffee bean",
    hex: "#40312f",
    base: "deep_base",
  },
  {
    name: "Mother of pearl",
    hex: "#e9d4c3",
    base: "ultra_pure_white",
  },
  {
    name: "Pastel rose tan",
    hex: "#e9d1bf",
    base: "ultra_pure_white",
  },
  {
    name: "Novelle peach",
    hex: "#e7cfbd",
    base: "ultra_pure_white",
  },
  {
    name: "Sun kiss",
    hex: "#ebd1bb",
    base: "ultra_pure_white",
  },
  {
    name: "Ivory cream",
    hex: "#dac0a7",
    base: "ultra_pure_white",
  },
  {
    name: "Shifting sand",
    hex: "#d8c0ad",
    base: "ultra_pure_white",
  },
  {
    name: "Appleblossom",
    hex: "#ddbca0",
    base: "ultra_pure_white",
  },
  {
    name: "Eggnog",
    hex: "#ece1d3",
    base: "ultra_pure_white",
  },
  {
    name: "Cream tan",
    hex: "#e4c7b8",
    base: "ultra_pure_white",
  },
  {
    name: "Sand dollar",
    hex: "#decdbe",
    base: "ultra_pure_white",
  },
  {
    name: "Smoke gray",
    hex: "#cebaa8",
    base: "ultra_pure_white",
  },
  {
    name: "Doeskin",
    hex: "#bdab9b",
    base: "ultra_pure_white",
  },
  {
    name: "Sesame",
    hex: "#baa38b",
    base: "ultra_pure_white",
  },
  {
    name: "Light taupe",
    hex: "#b19d8d",
    base: "ultra_pure_white",
  },
  {
    name: "Warm taupe",
    hex: "#af9483",
    base: "ultra_pure_white",
  },
  {
    name: "Stucco",
    hex: "#a58d7f",
    base: "ultra_pure_white",
  },
  {
    name: "Almondine",
    hex: "#a78c8b",
    base: "ultra_pure_white",
  },
  {
    name: "Chanterelle",
    hex: "#a28776",
    base: "ultra_pure_white",
  },
  {
    name: "Ginger snap",
    hex: "#977d70",
    base: "ultra_pure_white",
  },
  {
    name: "Woodsmoke",
    hex: "#947764",
    base: "medium_base",
  },
  {
    name: "Amphora",
    hex: "#9f8672",
    base: "ultra_pure_white",
  },
  {
    name: "Moonlight",
    hex: "#c5b1a0",
    base: "ultra_pure_white",
  },
  {
    name: "Frappe",
    hex: "#d1b7a0",
    base: "ultra_pure_white",
  },
  {
    name: "Rugby tan",
    hex: "#c2a594",
    base: "ultra_pure_white",
  },
  {
    name: "Roebuck",
    hex: "#b09080",
    base: "ultra_pure_white",
  },
  {
    name: "Praline",
    hex: "#ad8b75",
    base: "ultra_pure_white",
  },
  {
    name: "Burro",
    hex: "#947764",
    base: "medium_base",
  },
  {
    name: "Beaver fur",
    hex: "#997867",
    base: "medium_base",
  },
  {
    name: "Toasted almond",
    hex: "#d2b49c",
    base: "ultra_pure_white",
  },
  {
    name: "Tawny birch",
    hex: "#ae856c",
    base: "ultra_pure_white",
  },
  {
    name: "Macaroon",
    hex: "#b38b71",
    base: "ultra_pure_white",
  },
  {
    name: "Tawny brown",
    hex: "#ab856f",
    base: "ultra_pure_white",
  },
  {
    name: "Camel",
    hex: "#b0846a",
    base: "ultra_pure_white",
  },
  {
    name: "Toast",
    hex: "#ca9978",
    base: "ultra_pure_white",
  },
  {
    name: "Toasted nut",
    hex: "#c08768",
    base: "ultra_pure_white",
  },
  {
    name: "Nude",
    hex: "#f2d3bc",
    base: "ultra_pure_white",
  },
  {
    name: "Tender peach",
    hex: "#f8d5b8",
    base: "ultra_pure_white",
  },
  {
    name: "Alesan",
    hex: "#f1ceb3",
    base: "ultra_pure_white",
  },
  {
    name: "Pale peach",
    hex: "#fed1bd",
    base: "ultra_pure_white",
  },
  {
    name: "Peach puree",
    hex: "#efcfba",
    base: "ultra_pure_white",
  },
  {
    name: "Bellini",
    hex: "#f4c9b1",
    base: "ultra_pure_white",
  },
  {
    name: "Amberlight",
    hex: "#e2bea2",
    base: "ultra_pure_white",
  },
  {
    name: "Peach dust",
    hex: "#f0d8cc",
    base: "ultra_pure_white",
  },
  {
    name: "Linen",
    hex: "#edd2c0",
    base: "ultra_pure_white",
  },
  {
    name: "Scallop shell",
    hex: "#fbd8c9",
    base: "ultra_pure_white",
  },
  {
    name: "Soft pink",
    hex: "#f2d8cd",
    base: "ultra_pure_white",
  },
  {
    name: "Pale dogwood",
    hex: "#edcdc2",
    base: "ultra_pure_white",
  },
  {
    name: "Silver peony",
    hex: "#e7cfc7",
    base: "ultra_pure_white",
  },
  {
    name: "Rose dust",
    hex: "#cdb2a5",
    base: "ultra_pure_white",
  },
  {
    name: "Shell",
    hex: "#e1cfc6",
    base: "ultra_pure_white",
  },
  {
    name: "Whisper pink",
    hex: "#dacbbe",
    base: "ultra_pure_white",
  },
  {
    name: "Pink tint",
    hex: "#dbcbbd",
    base: "ultra_pure_white",
  },
  {
    name: "Evening sand",
    hex: "#ddb6ab",
    base: "ultra_pure_white",
  },
  {
    name: "Sirocco",
    hex: "#c39d88",
    base: "ultra_pure_white",
  },
  {
    name: "Brush",
    hex: "#b99984",
    base: "ultra_pure_white",
  },
  {
    name: "Cafe au lait",
    hex: "#ae8774",
    base: "ultra_pure_white",
  },
  {
    name: "Cameo rose",
    hex: "#d7b8ab",
    base: "ultra_pure_white",
  },
  {
    name: "Pale blush",
    hex: "#e4bfb3",
    base: "ultra_pure_white",
  },
  {
    name: "Rose cloud",
    hex: "#dbb0a2",
    base: "ultra_pure_white",
  },
  {
    name: "Spanish villa",
    hex: "#dfbaa9",
    base: "ultra_pure_white",
  },
  {
    name: "Maple sugar",
    hex: "#c9a38d",
    base: "ultra_pure_white",
  },
  {
    name: "Tuscany",
    hex: "#be9785",
    base: "ultra_pure_white",
  },
  {
    name: "Cork",
    hex: "#ba8671",
    base: "ultra_pure_white",
  },
  {
    name: "Bisque",
    hex: "#edcab5",
    base: "ultra_pure_white",
  },
  {
    name: "Almost apricot",
    hex: "#e5b39b",
    base: "ultra_pure_white",
  },
  {
    name: "Pink sand",
    hex: "#dfb19b",
    base: "ultra_pure_white",
  },
  {
    name: "Peach nougat",
    hex: "#e6af91",
    base: "ultra_pure_white",
  },
  {
    name: "Peach bloom",
    hex: "#d99b7c",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty coral",
    hex: "#d29b83",
    base: "ultra_pure_white",
  },
  {
    name: "Cafe creme",
    hex: "#c79685",
    base: "ultra_pure_white",
  },
  {
    name: "Sandstorm",
    hex: "#bd8b69",
    base: "ultra_pure_white",
  },
  {
    name: "Butterum",
    hex: "#c68f65",
    base: "ultra_pure_white",
  },
  {
    name: "Biscuit",
    hex: "#b4835b",
    base: "ultra_pure_white",
  },
  {
    name: "Cashew",
    hex: "#a47149",
    base: "medium_base",
  },
  {
    name: "Almond",
    hex: "#a7754d",
    base: "medium_base",
  },
  {
    name: "Lion",
    hex: "#a0714f",
    base: "medium_base",
  },
  {
    name: "Thrush",
    hex: "#936b4f",
    base: "medium_base",
  },
  {
    name: "Mocha mousse",
    hex: "#a47864",
    base: "medium_base",
  },
  {
    name: "Pecan brown",
    hex: "#a36e51",
    base: "medium_base",
  },
  {
    name: "Hazel",
    hex: "#ae7250",
    base: "medium_base",
  },
  {
    name: "Bran",
    hex: "#a66e4a",
    base: "medium_base",
  },
  {
    name: "Adobe",
    hex: "#a3623b",
    base: "medium_base",
  },
  {
    name: "Leather brown",
    hex: "#97572b",
    base: "medium_base",
  },
  {
    name: "Glazed ginger",
    hex: "#91552b",
    base: "medium_base",
  },
  {
    name: "Sandstone",
    hex: "#c48a69",
    base: "ultra_pure_white",
  },
  {
    name: "Caramel",
    hex: "#c37c54",
    base: "medium_base",
  },
  {
    name: "Amber brown",
    hex: "#a66646",
    base: "medium_base",
  },
  {
    name: "Sierra",
    hex: "#985c41",
    base: "medium_base",
  },
  {
    name: "Ginger bread",
    hex: "#8c4a2f",
    base: "medium_base",
  },
  {
    name: "Mocha bisque",
    hex: "#8c543a",
    base: "medium_base",
  },
  {
    name: "Tortoise shell",
    hex: "#754734",
    base: "medium_base",
  },
  {
    name: "Pheasant",
    hex: "#c68463",
    base: "ultra_pure_white",
  },
  {
    name: "Sunburn",
    hex: "#b37256",
    base: "medium_base",
  },
  {
    name: "Raw sienna",
    hex: "#b9714f",
    base: "medium_base",
  },
  {
    name: "Autumn leaf",
    hex: "#b56a4c",
    base: "medium_base",
  },
  {
    name: "Mecca orange",
    hex: "#bd5745",
    base: "medium_base",
  },
  {
    name: "Rust",
    hex: "#b55a30",
    base: "medium_base",
  },
  {
    name: "Bombay brown",
    hex: "#9f5130",
    base: "medium_base",
  },
  {
    name: "Frosted almond",
    hex: "#d2c2ac",
    base: "ultra_pure_white",
  },
  {
    name: "Gilded beige",
    hex: "#b39f8d",
    base: "ultra_pure_white",
  },
  {
    name: "Pale gold",
    hex: "#bd9865",
    base: "ultra_pure_white",
  },
  {
    name: "Rich gold",
    hex: "#c8b273",
    base: "ultra_pure_white",
  },
  {
    name: "Copper",
    hex: "#c47e5a",
    base: "ultra_pure_white",
  },
  {
    name: "Copper coin",
    hex: "#ba6b57",
    base: "medium_base",
  },
  {
    name: "Silver",
    hex: "#a2a2a1",
    base: "ultra_pure_white",
  },
  {
    name: "Raw umber",
    hex: "#92705f",
    base: "medium_base",
  },
  {
    name: "Brownie",
    hex: "#8f7265",
    base: "medium_base",
  },
  {
    name: "Acorn",
    hex: "#7e5e52",
    base: "medium_base",
  },
  {
    name: "Clove",
    hex: "#876155",
    base: "medium_base",
  },
  {
    name: "Carob brown",
    hex: "#855c4c",
    base: "medium_base",
  },
  {
    name: "Russet",
    hex: "#8f5f50",
    base: "medium_base",
  },
  {
    name: "Rawhide",
    hex: "#865e49",
    base: "medium_base",
  },
  {
    name: "Chutney",
    hex: "#98594b",
    base: "medium_base",
  },
  {
    name: "Baked clay",
    hex: "#9c5642",
    base: "medium_base",
  },
  {
    name: "Copper brown",
    hex: "#9a6051",
    base: "medium_base",
  },
  {
    name: "Brown patina",
    hex: "#834f3d",
    base: "medium_base",
  },
  {
    name: "Rustic brown",
    hex: "#855141",
    base: "medium_base",
  },
  {
    name: "Coconut shell",
    hex: "#874e3c",
    base: "medium_base",
  },
  {
    name: "Sequoia",
    hex: "#804839",
    base: "medium_base",
  },
  {
    name: "Root beer",
    hex: "#714a41",
    base: "medium_base",
  },
  {
    name: "Brunette",
    hex: "#664238",
    base: "medium_base",
  },
  {
    name: "Sable",
    hex: "#6e403c",
    base: "medium_base",
  },
  {
    name: "Cinnamon",
    hex: "#6b4139",
    base: "medium_base",
  },
  {
    name: "Fudgesickle",
    hex: "#63403a",
    base: "medium_base",
  },
  {
    name: "Mink",
    hex: "#734b42",
    base: "medium_base",
  },
  {
    name: "Cappuccino",
    hex: "#633f33",
    base: "medium_base",
  },
  {
    name: "Cognac",
    hex: "#8b645a",
    base: "medium_base",
  },
  {
    name: "Nutmeg",
    hex: "#7e5c54",
    base: "medium_base",
  },
  {
    name: "French roast",
    hex: "#58423f",
    base: "medium_base",
  },
  {
    name: "Deep mahogany",
    hex: "#553b39",
    base: "medium_base",
  },
  {
    name: "Rum raisin",
    hex: "#583432",
    base: "deep_base",
  },
  {
    name: "Brown stone",
    hex: "#593c39",
    base: "medium_base",
  },
  {
    name: "Bitter chocolate",
    hex: "#503130",
    base: "deep_base",
  },
  {
    name: "Mahogany",
    hex: "#824d46",
    base: "medium_base",
  },
  {
    name: "Henna",
    hex: "#7c423c",
    base: "medium_base",
  },
  {
    name: "Arabian spice",
    hex: "#884332",
    base: "medium_base",
  },
  {
    name: "Hot chocolate",
    hex: "#683b39",
    base: "medium_base",
  },
  {
    name: "Russet brown",
    hex: "#743332",
    base: "medium_base",
  },
  {
    name: "Madder brown",
    hex: "#6a3331",
    base: "medium_base",
  },
  {
    name: "Andorra",
    hex: "#603535",
    base: "medium_base",
  },
  {
    name: "Afterglow",
    hex: "#f3e6c9",
    base: "ultra_pure_white",
  },
  {
    name: "Transparent yellow",
    hex: "#f4ecc2",
    base: "ultra_pure_white",
  },
  {
    name: "Double cream",
    hex: "#f3e0ac",
    base: "ultra_pure_white",
  },
  {
    name: "Sunlight",
    hex: "#edd59e",
    base: "ultra_pure_white",
  },
  {
    name: "Straw",
    hex: "#e0c992",
    base: "ultra_pure_white",
  },
  {
    name: "Jojoba",
    hex: "#dabe81",
    base: "ultra_pure_white",
  },
  {
    name: "Rattan",
    hex: "#d1b272",
    base: "ultra_pure_white",
  },
  {
    name: "Boulder",
    hex: "#d1be9b",
    base: "ultra_pure_white",
  },
  {
    name: "Sea mist",
    hex: "#d8c9a3",
    base: "ultra_pure_white",
  },
  {
    name: "Reed yellow",
    hex: "#dcc99e",
    base: "ultra_pure_white",
  },
  {
    name: "Chino green",
    hex: "#d9caa5",
    base: "ultra_pure_white",
  },
  {
    name: "Parsnip",
    hex: "#d6c69a",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty yellow",
    hex: "#d4cc9a",
    base: "ultra_pure_white",
  },
  {
    name: "Silver fern",
    hex: "#bbaa7e",
    base: "ultra_pure_white",
  },
  {
    name: "Lemon grass",
    hex: "#dcd494",
    base: "ultra_pure_white",
  },
  {
    name: "Raffia",
    hex: "#dac483",
    base: "ultra_pure_white",
  },
  {
    name: "Golden mist",
    hex: "#d5cd94",
    base: "ultra_pure_white",
  },
  {
    name: "Pampas",
    hex: "#cfbb7b",
    base: "ultra_pure_white",
  },
  {
    name: "Bamboo",
    hex: "#d2b04c",
    base: "ultra_pure_white",
  },
  {
    name: "Cress green",
    hex: "#bca949",
    base: "ultra_pure_white",
  },
  {
    name: "Olive oil",
    hex: "#a98b2d",
    base: "medium_base",
  },
  {
    name: "Dried moss",
    hex: "#ccb97e",
    base: "ultra_pure_white",
  },
  {
    name: "Celery",
    hex: "#cec153",
    base: "ultra_pure_white",
  },
  {
    name: "Acacia",
    hex: "#dacd65",
    base: "ultra_pure_white",
  },
  {
    name: "Sulphur",
    hex: "#ddb614",
    base: "medium_base",
  },
  {
    name: "Oil yellow",
    hex: "#c4a647",
    base: "ultra_pure_white",
  },
  {
    name: "Green sulphur",
    hex: "#ae8e2c",
    base: "medium_base",
  },
  {
    name: "Golden palm",
    hex: "#aa8805",
    base: "medium_base",
  },
  {
    name: "Cocoon",
    hex: "#c9b27c",
    base: "ultra_pure_white",
  },
  {
    name: "Hemp",
    hex: "#c0ad7c",
    base: "ultra_pure_white",
  },
  {
    name: "Southern moss",
    hex: "#bca66a",
    base: "ultra_pure_white",
  },
  {
    name: "Olivenite",
    hex: "#c1a65c",
    base: "ultra_pure_white",
  },
  {
    name: "Golden green",
    hex: "#bdb369",
    base: "ultra_pure_white",
  },
  {
    name: "Antique gold",
    hex: "#b59e5f",
    base: "ultra_pure_white",
  },
  {
    name: "Burnished gold",
    hex: "#aa9855",
    base: "ultra_pure_white",
  },
  {
    name: "French vanilla",
    hex: "#efe1a7",
    base: "ultra_pure_white",
  },
  {
    name: "Pastel yellow",
    hex: "#f2e6b1",
    base: "ultra_pure_white",
  },
  {
    name: "Tender yellow",
    hex: "#ededb7",
    base: "ultra_pure_white",
  },
  {
    name: "Wax yellow",
    hex: "#ede9ad",
    base: "ultra_pure_white",
  },
  {
    name: "Lemonade",
    hex: "#f0e79d",
    base: "ultra_pure_white",
  },
  {
    name: "Elfin yellow",
    hex: "#eeea97",
    base: "ultra_pure_white",
  },
  {
    name: "Limelight",
    hex: "#f0e87d",
    base: "ultra_pure_white",
  },
  {
    name: "Dusky citron",
    hex: "#e3cc81",
    base: "ultra_pure_white",
  },
  {
    name: "Muted lime",
    hex: "#d1c87c",
    base: "ultra_pure_white",
  },
  {
    name: "Endive",
    hex: "#d2cc81",
    base: "ultra_pure_white",
  },
  {
    name: "Custard",
    hex: "#e5d68e",
    base: "ultra_pure_white",
  },
  {
    name: "Canary yellow",
    hex: "#dfd87e",
    base: "ultra_pure_white",
  },
  {
    name: "Yellow cream",
    hex: "#efdc75",
    base: "ultra_pure_white",
  },
  {
    name: "Cream gold",
    hex: "#dec05f",
    base: "ultra_pure_white",
  },
  {
    name: "Aurora",
    hex: "#eddd59",
    base: "ultra_pure_white",
  },
  {
    name: "Green sheen",
    hex: "#d9ce52",
    base: "ultra_pure_white",
  },
  {
    name: "Maize",
    hex: "#eec843",
    base: "ultra_pure_white",
  },
  {
    name: "Blazing yellow",
    hex: "#fee715",
    base: "medium_base",
  },
  {
    name: "Buttercup",
    hex: "#fae03c",
    base: "ultra_pure_white",
  },
  {
    name: "Empire yellow",
    hex: "#f7d000",
    base: "medium_base",
  },
  {
    name: "Lemon",
    hex: "#f3bf08",
    base: "medium_base",
  },
  {
    name: "Mimosa",
    hex: "#f0c05a",
    base: "ultra_pure_white",
  },
  {
    name: "Aspen gold",
    hex: "#ffd662",
    base: "ultra_pure_white",
  },
  {
    name: "Dandelion",
    hex: "#ffd02e",
    base: "ultra_pure_white",
  },
  {
    name: "Vibrant yellow",
    hex: "#ffda29",
    base: "ultra_pure_white",
  },
  {
    name: "Cyber yellow",
    hex: "#ffd400",
    base: "medium_base",
  },
  {
    name: "Freesia",
    hex: "#f3c12c",
    base: "ultra_pure_white",
  },
  {
    name: "Lemon chrome",
    hex: "#ffc300",
    base: "medium_base",
  },
  {
    name: "Mellow yellow",
    hex: "#f0dd9d",
    base: "ultra_pure_white",
  },
  {
    name: "Pale banana",
    hex: "#fae199",
    base: "ultra_pure_white",
  },
  {
    name: "Popcorn",
    hex: "#f8de8d",
    base: "ultra_pure_white",
  },
  {
    name: "Sunshine",
    hex: "#fade85",
    base: "ultra_pure_white",
  },
  {
    name: "Lemon drop",
    hex: "#fdd878",
    base: "ultra_pure_white",
  },
  {
    name: "Primrose yellow",
    hex: "#f6d155",
    base: "ultra_pure_white",
  },
  {
    name: "Super lemon",
    hex: "#e4bf45",
    base: "ultra_pure_white",
  },
  {
    name: "Misted yellow",
    hex: "#dab965",
    base: "ultra_pure_white",
  },
  {
    name: "Sauterne",
    hex: "#c5a253",
    base: "ultra_pure_white",
  },
  {
    name: "Honey",
    hex: "#ba9238",
    base: "medium_base",
  },
  {
    name: "Arrowwood",
    hex: "#bc8d1f",
    base: "medium_base",
  },
  {
    name: "Tawny olive",
    hex: "#c4962c",
    base: "medium_base",
  },
  {
    name: "Ceylon yellow",
    hex: "#d4ae40",
    base: "ultra_pure_white",
  },
  {
    name: "Lemon curry",
    hex: "#cda323",
    base: "medium_base",
  },
  {
    name: "Fall leaf",
    hex: "#c9a86a",
    base: "ultra_pure_white",
  },
  {
    name: "Antelope",
    hex: "#b19664",
    base: "ultra_pure_white",
  },
  {
    name: "Mustard gold",
    hex: "#b08e51",
    base: "medium_base",
  },
  {
    name: "Harvest gold",
    hex: "#b68a3a",
    base: "medium_base",
  },
  {
    name: "Nugget gold",
    hex: "#c89720",
    base: "medium_base",
  },
  {
    name: "Golden spice",
    hex: "#c6973f",
    base: "medium_base",
  },
  {
    name: "Golden yellow",
    hex: "#cb8e16",
    base: "medium_base",
  },
  {
    name: "Ochre",
    hex: "#d6af66",
    base: "ultra_pure_white",
  },
  {
    name: "Tinsel",
    hex: "#c3964d",
    base: "ultra_pure_white",
  },
  {
    name: "Bright gold",
    hex: "#cf9f52",
    base: "ultra_pure_white",
  },
  {
    name: "Honey gold",
    hex: "#d1a054",
    base: "ultra_pure_white",
  },
  {
    name: "Amber gold",
    hex: "#c19552",
    base: "ultra_pure_white",
  },
  {
    name: "Mineral yellow",
    hex: "#d39c43",
    base: "ultra_pure_white",
  },
  {
    name: "Narcissus",
    hex: "#c39449",
    base: "ultra_pure_white",
  },
  {
    name: "Marzipan",
    hex: "#d8c09d",
    base: "ultra_pure_white",
  },
  {
    name: "Curry",
    hex: "#be9e6f",
    base: "ultra_pure_white",
  },
  {
    name: "Prairie sand",
    hex: "#b59a6a",
    base: "ultra_pure_white",
  },
  {
    name: "Honey mustard",
    hex: "#b68f52",
    base: "ultra_pure_white",
  },
  {
    name: "Wood thrush",
    hex: "#a47d43",
    base: "medium_base",
  },
  {
    name: "Golden brown",
    hex: "#91672f",
    base: "medium_base",
  },
  {
    name: "Bronze brown",
    hex: "#825e2f",
    base: "medium_base",
  },
  {
    name: "Apple cinnamon",
    hex: "#b0885a",
    base: "ultra_pure_white",
  },
  {
    name: "Bone brown",
    hex: "#9d7446",
    base: "medium_base",
  },
  {
    name: "Dijon",
    hex: "#97754c",
    base: "medium_base",
  },
  {
    name: "Bistre",
    hex: "#98754a",
    base: "medium_base",
  },
  {
    name: "Medal bronze",
    hex: "#977547",
    base: "medium_base",
  },
  {
    name: "Cumin",
    hex: "#927240",
    base: "medium_base",
  },
  {
    name: "Breen",
    hex: "#795d34",
    base: "medium_base",
  },
  {
    name: "Snapdragon",
    hex: "#fed777",
    base: "ultra_pure_white",
  },
  {
    name: "Banana cream",
    hex: "#ffcf73",
    base: "ultra_pure_white",
  },
  {
    name: "Daffodil",
    hex: "#fdc04e",
    base: "ultra_pure_white",
  },
  {
    name: "Yolk yellow",
    hex: "#e2b051",
    base: "ultra_pure_white",
  },
  {
    name: "Golden rod",
    hex: "#e2a829",
    base: "medium_base",
  },
  {
    name: "Old gold",
    hex: "#eca825",
    base: "medium_base",
  },
  {
    name: "Spectra yellow",
    hex: "#f7b718",
    base: "medium_base",
  },
  {
    name: "Golden haze",
    hex: "#fbd897",
    base: "ultra_pure_white",
  },
  {
    name: "Sahara sun",
    hex: "#dfc08a",
    base: "ultra_pure_white",
  },
  {
    name: "New wheat",
    hex: "#d7b57f",
    base: "ultra_pure_white",
  },
  {
    name: "Cornsilk",
    hex: "#edc373",
    base: "ultra_pure_white",
  },
  {
    name: "Buff yellow",
    hex: "#f1bf70",
    base: "ultra_pure_white",
  },
  {
    name: "Sunset gold",
    hex: "#f7c46c",
    base: "ultra_pure_white",
  },
  {
    name: "Golden cream",
    hex: "#f7b768",
    base: "ultra_pure_white",
  },
  {
    name: "Impala",
    hex: "#f8ce97",
    base: "ultra_pure_white",
  },
  {
    name: "Flax",
    hex: "#ffc87d",
    base: "ultra_pure_white",
  },
  {
    name: "Pale marigold",
    hex: "#ffc66e",
    base: "ultra_pure_white",
  },
  {
    name: "Amber yellow",
    hex: "#fab75a",
    base: "ultra_pure_white",
  },
  {
    name: "Amber",
    hex: "#efad55",
    base: "ultra_pure_white",
  },
  {
    name: "Golden apricot",
    hex: "#dda758",
    base: "ultra_pure_white",
  },
  {
    name: "Beeswax",
    hex: "#eba851",
    base: "ultra_pure_white",
  },
  {
    name: "Banana",
    hex: "#fcb953",
    base: "ultra_pure_white",
  },
  {
    name: "Citrus",
    hex: "#f9ac2f",
    base: "medium_base",
  },
  {
    name: "Golden glow",
    hex: "#d99938",
    base: "medium_base",
  },
  {
    name: "Artisan's gold",
    hex: "#f2ab46",
    base: "ultra_pure_white",
  },
  {
    name: "Sunflower",
    hex: "#d39237",
    base: "medium_base",
  },
  {
    name: "Buckthorn brown",
    hex: "#a76f1f",
    base: "medium_base",
  },
  {
    name: "Cathay spice",
    hex: "#99642c",
    base: "medium_base",
  },
  {
    name: "Taffy",
    hex: "#c39b6a",
    base: "ultra_pure_white",
  },
  {
    name: "Oak buff",
    hex: "#cf9c63",
    base: "ultra_pure_white",
  },
  {
    name: "Honey yellow",
    hex: "#ca9456",
    base: "ultra_pure_white",
  },
  {
    name: "Spruce yellow",
    hex: "#be8a4a",
    base: "medium_base",
  },
  {
    name: "Inca gold",
    hex: "#bb7a2c",
    base: "medium_base",
  },
  {
    name: "Sudan brown",
    hex: "#ac6b29",
    base: "medium_base",
  },
  {
    name: "Rubber",
    hex: "#815b37",
    base: "medium_base",
  },
  {
    name: "Wheat",
    hex: "#dec5a5",
    base: "ultra_pure_white",
  },
  {
    name: "Honey peach",
    hex: "#dcbd9e",
    base: "ultra_pure_white",
  },
  {
    name: "Desert dust",
    hex: "#e3bc8e",
    base: "ultra_pure_white",
  },
  {
    name: "Golden straw",
    hex: "#e6bd8f",
    base: "ultra_pure_white",
  },
  {
    name: "Buff",
    hex: "#ebc396",
    base: "ultra_pure_white",
  },
  {
    name: "Desert mist",
    hex: "#e0b589",
    base: "ultra_pure_white",
  },
  {
    name: "Clay",
    hex: "#d2a172",
    base: "ultra_pure_white",
  },
  {
    name: "Golden fleece",
    hex: "#f2d1a0",
    base: "ultra_pure_white",
  },
  {
    name: "Apricot sherbet",
    hex: "#facd9e",
    base: "ultra_pure_white",
  },
  {
    name: "Sunburst",
    hex: "#f6c289",
    base: "ultra_pure_white",
  },
  {
    name: "Apricot cream",
    hex: "#f1bd89",
    base: "ultra_pure_white",
  },
  {
    name: "Buff orange",
    hex: "#ffbb7c",
    base: "ultra_pure_white",
  },
  {
    name: "Chamois",
    hex: "#f7b26a",
    base: "ultra_pure_white",
  },
  {
    name: "Warm apricot",
    hex: "#ffb865",
    base: "ultra_pure_white",
  },
  {
    name: "Marigold",
    hex: "#fadc53",
    base: "ultra_pure_white",
  },
  {
    name: "Golden nugget",
    hex: "#db9b59",
    base: "ultra_pure_white",
  },
  {
    name: "Butterscotch",
    hex: "#e19640",
    base: "ultra_pure_white",
  },
  {
    name: "Nugget",
    hex: "#cf8848",
    base: "medium_base",
  },
  {
    name: "Buckskin",
    hex: "#d18e54",
    base: "ultra_pure_white",
  },
  {
    name: "Yam",
    hex: "#d0893f",
    base: "medium_base",
  },
  {
    name: "Golden oak",
    hex: "#be752d",
    base: "medium_base",
  },
  {
    name: "Gold fusion",
    hex: "#ffb000",
    base: "medium_base",
  },
  {
    name: "Saffron",
    hex: "#ffa500",
    base: "medium_base",
  },
  {
    name: "Cadmium yellow",
    hex: "#ee9626",
    base: "medium_base",
  },
  {
    name: "Zinnia",
    hex: "#ffa010",
    base: "medium_base",
  },
  {
    name: "Radiant yellow",
    hex: "#fc9e21",
    base: "medium_base",
  },
  {
    name: "Apricot",
    hex: "#f19035",
    base: "medium_base",
  },
  {
    name: "Dark cheddar",
    hex: "#e08119",
    base: "medium_base",
  },
  {
    name: "Apricot ice",
    hex: "#fbbe99",
    base: "ultra_pure_white",
  },
  {
    name: "Apricot nectar",
    hex: "#ecaa79",
    base: "ultra_pure_white",
  },
  {
    name: "Gold earth",
    hex: "#dd9c6b",
    base: "ultra_pure_white",
  },
  {
    name: "Apricot tan",
    hex: "#dd9760",
    base: "ultra_pure_white",
  },
  {
    name: "Topaz",
    hex: "#d08344",
    base: "medium_base",
  },
  {
    name: "Golden ochre",
    hex: "#c77943",
    base: "medium_base",
  },
  {
    name: "Apricot buff",
    hex: "#cd7e4d",
    base: "medium_base",
  },
  {
    name: "Peach cobbler",
    hex: "#ffb181",
    base: "ultra_pure_white",
  },
  {
    name: "Salmon buff",
    hex: "#feaa7b",
    base: "ultra_pure_white",
  },
  {
    name: "Pumpkin",
    hex: "#f5a26f",
    base: "ultra_pure_white",
  },
  {
    name: "Mock orange",
    hex: "#ffa368",
    base: "ultra_pure_white",
  },
  {
    name: "Muskmelon",
    hex: "#ec935e",
    base: "ultra_pure_white",
  },
  {
    name: "Copper tan",
    hex: "#de8e65",
    base: "ultra_pure_white",
  },
  {
    name: "Coral gold",
    hex: "#d27d56",
    base: "ultra_pure_white",
  },
  {
    name: "Russet orange",
    hex: "#e47127",
    base: "medium_base",
  },
  {
    name: "Orange ochre",
    hex: "#dc793a",
    base: "medium_base",
  },
  {
    name: "Amberglow",
    hex: "#dc793e",
    base: "medium_base",
  },
  {
    name: "Jaffa orange",
    hex: "#d86d39",
    base: "medium_base",
  },
  {
    name: "Apricot orange",
    hex: "#c86b3c",
    base: "medium_base",
  },
  {
    name: "Burnt orange",
    hex: "#c86733",
    base: "medium_base",
  },
  {
    name: "Harvest pumpkin",
    hex: "#d56231",
    base: "medium_base",
  },
  {
    name: "Blazing orange",
    hex: "#ffa64f",
    base: "ultra_pure_white",
  },
  {
    name: "Flame orange",
    hex: "#fb8b23",
    base: "medium_base",
  },
  {
    name: "Bright marigold",
    hex: "#ff8d00",
    base: "medium_base",
  },
  {
    name: "Autumn glory",
    hex: "#ff8812",
    base: "medium_base",
  },
  {
    name: "Sun orange",
    hex: "#f48037",
    base: "medium_base",
  },
  {
    name: "Persimmon orange",
    hex: "#f47327",
    base: "medium_base",
  },
  {
    name: "Orange popsicle",
    hex: "#ff7913",
    base: "medium_base",
  },
  {
    name: "Autumn sunset",
    hex: "#f38554",
    base: "ultra_pure_white",
  },
  {
    name: "Tangerine",
    hex: "#f88f58",
    base: "ultra_pure_white",
  },
  {
    name: "Bird of paradise",
    hex: "#ff8c55",
    base: "ultra_pure_white",
  },
  {
    name: "Orange peel",
    hex: "#fa7a35",
    base: "medium_base",
  },
  {
    name: "Mandarin orange",
    hex: "#ec6a37",
    base: "medium_base",
  },
  {
    name: "Golden poppy",
    hex: "#f56733",
    base: "medium_base",
  },
  {
    name: "Vibrant orange",
    hex: "#ff7420",
    base: "medium_base",
  },
  {
    name: "Nectarine",
    hex: "#ff8656",
    base: "ultra_pure_white",
  },
  {
    name: "Coral rose",
    hex: "#f3774d",
    base: "medium_base",
  },
  {
    name: "Carrot",
    hex: "#fd6f3b",
    base: "medium_base",
  },
  {
    name: "Firecracker",
    hex: "#f36944",
    base: "medium_base",
  },
  {
    name: "Red orange",
    hex: "#f05627",
    base: "medium_base",
  },
  {
    name: "Vermillion orange",
    hex: "#f9633b",
    base: "medium_base",
  },
  {
    name: "Flame",
    hex: "#f2552c",
    base: "medium_base",
  },
  {
    name: "Creampuff",
    hex: "#ffcda8",
    base: "ultra_pure_white",
  },
  {
    name: "Bleached apricot",
    hex: "#fccaac",
    base: "ultra_pure_white",
  },
  {
    name: "Almond cream",
    hex: "#f4c29f",
    base: "ultra_pure_white",
  },
  {
    name: "Beach sand",
    hex: "#fbb995",
    base: "ultra_pure_white",
  },
  {
    name: "Cream blush",
    hex: "#f8c19a",
    base: "ultra_pure_white",
  },
  {
    name: "Caramel cream",
    hex: "#f4ba94",
    base: "ultra_pure_white",
  },
  {
    name: "Peach fuzz",
    hex: "#ffbe98",
    base: "ultra_pure_white",
  },
  {
    name: "Prairie sunset",
    hex: "#ffbb9e",
    base: "ultra_pure_white",
  },
  {
    name: "Coral sands",
    hex: "#edaa86",
    base: "ultra_pure_white",
  },
  {
    name: "Apricot wash",
    hex: "#fbac82",
    base: "ultra_pure_white",
  },
  {
    name: "Canyon sunset",
    hex: "#e1927a",
    base: "ultra_pure_white",
  },
  {
    name: "Brandied melon",
    hex: "#ce7b5b",
    base: "ultra_pure_white",
  },
  {
    name: "Carnelian",
    hex: "#ce785d",
    base: "ultra_pure_white",
  },
  {
    name: "Mango",
    hex: "#b75e41",
    base: "medium_base",
  },
  {
    name: "Peach",
    hex: "#f2a987",
    base: "ultra_pure_white",
  },
  {
    name: "Cantaloupe",
    hex: "#ffa177",
    base: "ultra_pure_white",
  },
  {
    name: "Coral reef",
    hex: "#faa181",
    base: "ultra_pure_white",
  },
  {
    name: "Shell coral",
    hex: "#ea9575",
    base: "ultra_pure_white",
  },
  {
    name: "Cadmium orange",
    hex: "#f99471",
    base: "ultra_pure_white",
  },
  {
    name: "Melon",
    hex: "#fe8863",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty orange",
    hex: "#e27a53",
    base: "ultra_pure_white",
  },
  {
    name: "Arabesque",
    hex: "#d16f52",
    base: "medium_base",
  },
  {
    name: "Langoustino",
    hex: "#ca6c56",
    base: "medium_base",
  },
  {
    name: "Ginger",
    hex: "#c96551",
    base: "medium_base",
  },
  {
    name: "Flamingo",
    hex: "#df7253",
    base: "medium_base",
  },
  {
    name: "Orange rust",
    hex: "#c25a3c",
    base: "medium_base",
  },
  {
    name: "Burnt ochre",
    hex: "#bb4f35",
    base: "medium_base",
  },
  {
    name: "Chili",
    hex: "#be5141",
    base: "medium_base",
  },
  {
    name: "Ginger spice",
    hex: "#b65d48",
    base: "medium_base",
  },
  {
    name: "Autumn glaze",
    hex: "#b3573f",
    base: "medium_base",
  },
  {
    name: "Auburn",
    hex: "#a15843",
    base: "medium_base",
  },
  {
    name: "Picante",
    hex: "#8d3f2d",
    base: "medium_base",
  },
  {
    name: "Tandori spice",
    hex: "#9f4440",
    base: "medium_base",
  },
  {
    name: "Cinnabar",
    hex: "#9c453b",
    base: "medium_base",
  },
  {
    name: "Bossa nova",
    hex: "#973a36",
    base: "medium_base",
  },
  {
    name: "Tropical peach",
    hex: "#ffc4b2",
    base: "ultra_pure_white",
  },
  {
    name: "Peach parfait",
    hex: "#f8bfa8",
    base: "ultra_pure_white",
  },
  {
    name: "Coral pink",
    hex: "#e8a798",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty pink",
    hex: "#deaa9b",
    base: "ultra_pure_white",
  },
  {
    name: "Muted clay",
    hex: "#d29380",
    base: "ultra_pure_white",
  },
  {
    name: "Shrimp",
    hex: "#e29a86",
    base: "ultra_pure_white",
  },
  {
    name: "Tawny orange",
    hex: "#d37f6f",
    base: "ultra_pure_white",
  },
  {
    name: "Coral haze",
    hex: "#e38e84",
    base: "ultra_pure_white",
  },
  {
    name: "Canyon clay",
    hex: "#ce8477",
    base: "ultra_pure_white",
  },
  {
    name: "Terra cotta",
    hex: "#d38377",
    base: "ultra_pure_white",
  },
  {
    name: "Desert sand",
    hex: "#bd7b74",
    base: "ultra_pure_white",
  },
  {
    name: "Light mahogany",
    hex: "#ad6d68",
    base: "medium_base",
  },
  {
    name: "Cedar wood",
    hex: "#a1655b",
    base: "medium_base",
  },
  {
    name: "Withered rose",
    hex: "#a26666",
    base: "medium_base",
  },
  {
    name: "Rose dawn",
    hex: "#c2877b",
    base: "ultra_pure_white",
  },
  {
    name: "Ash rose",
    hex: "#b5817d",
    base: "ultra_pure_white",
  },
  {
    name: "Old rose",
    hex: "#b47b77",
    base: "ultra_pure_white",
  },
  {
    name: "Brick dust",
    hex: "#b07069",
    base: "medium_base",
  },
  {
    name: "Canyon rose",
    hex: "#af6c67",
    base: "medium_base",
  },
  {
    name: "Dusty cedar",
    hex: "#ad5d5d",
    base: "medium_base",
  },
  {
    name: "Marsala",
    hex: "#964f4c",
    base: "medium_base",
  },
  {
    name: "Apricot brandy",
    hex: "#c26a5a",
    base: "medium_base",
  },
  {
    name: "Aragon",
    hex: "#b06455",
    base: "medium_base",
  },
  {
    name: "Hot sauce",
    hex: "#ab4f41",
    base: "medium_base",
  },
  {
    name: "Bruschetta",
    hex: "#a75949",
    base: "medium_base",
  },
  {
    name: "Etruscan red",
    hex: "#a2574b",
    base: "medium_base",
  },
  {
    name: "Redwood",
    hex: "#a6594c",
    base: "medium_base",
  },
  {
    name: "Burnt brick",
    hex: "#a14d3a",
    base: "medium_base",
  },
  {
    name: "Faded rose",
    hex: "#bf6464",
    base: "medium_base",
  },
  {
    name: "Baked apple",
    hex: "#b34646",
    base: "medium_base",
  },
  {
    name: "Pompeian red",
    hex: "#a4292e",
    base: "medium_base",
  },
  {
    name: "Ketchup",
    hex: "#9a382d",
    base: "medium_base",
  },
  {
    name: "Red ochre",
    hex: "#913832",
    base: "medium_base",
  },
  {
    name: "Barn red",
    hex: "#8f423b",
    base: "medium_base",
  },
  {
    name: "Burnt henna",
    hex: "#7e392f",
    base: "medium_base",
  },
  {
    name: "Peach pearl",
    hex: "#ffb2a5",
    base: "ultra_pure_white",
  },
  {
    name: "Peach melba",
    hex: "#fbbdaf",
    base: "ultra_pure_white",
  },
  {
    name: "Apricot blush",
    hex: "#feaea5",
    base: "ultra_pure_white",
  },
  {
    name: "Peach bud",
    hex: "#fdb2ab",
    base: "ultra_pure_white",
  },
  {
    name: "Coral almond",
    hex: "#e29d94",
    base: "ultra_pure_white",
  },
  {
    name: "Lobster bisque",
    hex: "#dd9289",
    base: "ultra_pure_white",
  },
  {
    name: "Lantana",
    hex: "#da7e7a",
    base: "ultra_pure_white",
  },
  {
    name: "Peach nectar",
    hex: "#ffb59b",
    base: "ultra_pure_white",
  },
  {
    name: "Salmon",
    hex: "#faaa94",
    base: "ultra_pure_white",
  },
  {
    name: "Peach amber",
    hex: "#fb9f93",
    base: "ultra_pure_white",
  },
  {
    name: "Desert flower",
    hex: "#ff9687",
    base: "ultra_pure_white",
  },
  {
    name: "Peach pink",
    hex: "#fa9a85",
    base: "ultra_pure_white",
  },
  {
    name: "Burnt coral",
    hex: "#e9897e",
    base: "ultra_pure_white",
  },
  {
    name: "Crabapple",
    hex: "#d77e70",
    base: "ultra_pure_white",
  },
  {
    name: "Papaya punch",
    hex: "#fca289",
    base: "ultra_pure_white",
  },
  {
    name: "Fusion coral",
    hex: "#ff8576",
    base: "ultra_pure_white",
  },
  {
    name: "Fresh salmon",
    hex: "#ff7f6a",
    base: "ultra_pure_white",
  },
  {
    name: "Persimmon",
    hex: "#f67866",
    base: "ultra_pure_white",
  },
  {
    name: "Coral",
    hex: "#ed7464",
    base: "ultra_pure_white",
  },
  {
    name: "Living coral",
    hex: "#ff6f61",
    base: "ultra_pure_white",
  },
  {
    name: "Hot coral",
    hex: "#f35b53",
    base: "medium_base",
  },
  {
    name: "Shell pink",
    hex: "#f88180",
    base: "ultra_pure_white",
  },
  {
    name: "Georgia peach",
    hex: "#f97272",
    base: "ultra_pure_white",
  },
  {
    name: "Sugar coral",
    hex: "#f56c73",
    base: "ultra_pure_white",
  },
  {
    name: "Dubarry",
    hex: "#f25f66",
    base: "medium_base",
  },
  {
    name: "Porcelain rose",
    hex: "#ea6b6a",
    base: "ultra_pure_white",
  },
  {
    name: "Spiced coral",
    hex: "#d75c5d",
    base: "medium_base",
  },
  {
    name: "Deep sea coral",
    hex: "#d9615b",
    base: "medium_base",
  },
  {
    name: "Rose of sharon",
    hex: "#dc5b62",
    base: "medium_base",
  },
  {
    name: "Cayenne",
    hex: "#e04951",
    base: "medium_base",
  },
  {
    name: "Hibiscus",
    hex: "#dd3848",
    base: "medium_base",
  },
  {
    name: "Poinsettia",
    hex: "#cb3441",
    base: "medium_base",
  },
  {
    name: "Chrysanthemum",
    hex: "#be454f",
    base: "medium_base",
  },
  {
    name: "Cranberry",
    hex: "#bb4a4d",
    base: "medium_base",
  },
  {
    name: "Cardinal",
    hex: "#ad3e48",
    base: "medium_base",
  },
  {
    name: "Tigerlily",
    hex: "#e2583e",
    base: "medium_base",
  },
  {
    name: "Grenadine",
    hex: "#df3f32",
    base: "medium_base",
  },
  {
    name: "Mandarin red",
    hex: "#e74a33",
    base: "medium_base",
  },
  {
    name: "Fiesta",
    hex: "#dd4132",
    base: "medium_base",
  },
  {
    name: "Cherry tomato",
    hex: "#eb3c27",
    base: "medium_base",
  },
  {
    name: "Orange.com",
    hex: "#da321c",
    base: "medium_base",
  },
  {
    name: "Spicy orange",
    hex: "#d73c26",
    base: "medium_base",
  },
  {
    name: "Camellia",
    hex: "#f6745f",
    base: "ultra_pure_white",
  },
  {
    name: "Nasturtium",
    hex: "#fe6347",
    base: "medium_base",
  },
  {
    name: "Emberglow",
    hex: "#ea6759",
    base: "medium_base",
  },
  {
    name: "Burnt sienna",
    hex: "#c65d52",
    base: "medium_base",
  },
  {
    name: "Paprika",
    hex: "#ce4d42",
    base: "medium_base",
  },
  {
    name: "Red clay",
    hex: "#c2452d",
    base: "medium_base",
  },
  {
    name: "Molten lava",
    hex: "#b5332e",
    base: "medium_base",
  },
  {
    name: "Bittersweet",
    hex: "#d93744",
    base: "medium_base",
  },
  {
    name: "Poppy red",
    hex: "#dc343b",
    base: "medium_base",
  },
  {
    name: "Tomato",
    hex: "#ce2939",
    base: "medium_base",
  },
  {
    name: "Fiery red",
    hex: "#d01c1f",
    base: "medium_base",
  },
  {
    name: "Flame scarlet",
    hex: "#cd212a",
    base: "medium_base",
  },
  {
    name: "High risk red",
    hex: "#c71f2d",
    base: "medium_base",
  },
  {
    name: "Aurora red",
    hex: "#b93a32",
    base: "medium_base",
  },
  {
    name: "Rococco red",
    hex: "#bb363f",
    base: "medium_base",
  },
  {
    name: "Tomato puree",
    hex: "#c53346",
    base: "medium_base",
  },
  {
    name: "Lollipop",
    hex: "#cc1c3b",
    base: "medium_base",
  },
  {
    name: "Ski patrol",
    hex: "#bb1237",
    base: "medium_base",
  },
  {
    name: "Scarlet",
    hex: "#bc2b3d",
    base: "medium_base",
  },
  {
    name: "Lipstick red",
    hex: "#b31a38",
    base: "medium_base",
  },
  {
    name: "Crimson",
    hex: "#ae0e36",
    base: "medium_base",
  },
  {
    name: "Racing red",
    hex: "#bd162c",
    base: "medium_base",
  },
  {
    name: "Mars red",
    hex: "#bc2731",
    base: "medium_base",
  },
  {
    name: "Tango red",
    hex: "#ac0e2e",
    base: "medium_base",
  },
  {
    name: "Chinese red",
    hex: "#be132d",
    base: "medium_base",
  },
  {
    name: "Ribbon red",
    hex: "#b92636",
    base: "medium_base",
  },
  {
    name: "True red",
    hex: "#bf1932",
    base: "medium_base",
  },
  {
    name: "Chili pepper",
    hex: "#9b1b30",
    base: "medium_base",
  },
  {
    name: "Quartz pink",
    hex: "#efa6aa",
    base: "ultra_pure_white",
  },
  {
    name: "Pink icing",
    hex: "#eea0a6",
    base: "ultra_pure_white",
  },
  {
    name: "Blossom",
    hex: "#f2b2ae",
    base: "ultra_pure_white",
  },
  {
    name: "Peaches n' cream",
    hex: "#f4a6a3",
    base: "ultra_pure_white",
  },
  {
    name: "Candlelight peach",
    hex: "#f8a39d",
    base: "ultra_pure_white",
  },
  {
    name: "Strawberry ice",
    hex: "#e78b90",
    base: "ultra_pure_white",
  },
  {
    name: "Peach blossom",
    hex: "#de8286",
    base: "ultra_pure_white",
  },
  {
    name: "Flamingo pink",
    hex: "#f7969e",
    base: "ultra_pure_white",
  },
  {
    name: "Confetti",
    hex: "#e6798e",
    base: "ultra_pure_white",
  },
  {
    name: "Bubblegum",
    hex: "#ea738d",
    base: "ultra_pure_white",
  },
  {
    name: "Pink lemonade",
    hex: "#ee6d8a",
    base: "ultra_pure_white",
  },
  {
    name: "Camellia rose",
    hex: "#eb6081",
    base: "ultra_pure_white",
  },
  {
    name: "Rapture rose",
    hex: "#d16277",
    base: "ultra_pure_white",
  },
  {
    name: "Desert rose",
    hex: "#cf6977",
    base: "ultra_pure_white",
  },
  {
    name: "Geranium pink",
    hex: "#f6909d",
    base: "ultra_pure_white",
  },
  {
    name: "Conch shell",
    hex: "#fc8f9b",
    base: "ultra_pure_white",
  },
  {
    name: "Salmon rose",
    hex: "#ff8d94",
    base: "ultra_pure_white",
  },
  {
    name: "Strawberry pink",
    hex: "#f57f8e",
    base: "ultra_pure_white",
  },
  {
    name: "Sunkist coral",
    hex: "#ea6676",
    base: "ultra_pure_white",
  },
  {
    name: "Calypso coral",
    hex: "#ee5c6c",
    base: "ultra_pure_white",
  },
  {
    name: "Tea rose",
    hex: "#dc7178",
    base: "ultra_pure_white",
  },
  {
    name: "Geranium",
    hex: "#da3d58",
    base: "medium_base",
  },
  {
    name: "Paradise pink",
    hex: "#e4445e",
    base: "medium_base",
  },
  {
    name: "Teaberry",
    hex: "#dc3855",
    base: "medium_base",
  },
  {
    name: "Rouge red",
    hex: "#e24666",
    base: "medium_base",
  },
  {
    name: "Raspberry",
    hex: "#d32e5e",
    base: "medium_base",
  },
  {
    name: "Azalea",
    hex: "#d42e5b",
    base: "medium_base",
  },
  {
    name: "Virtual pink",
    hex: "#c6174e",
    base: "medium_base",
  },
  {
    name: "Claret red",
    hex: "#c84c61",
    base: "medium_base",
  },
  {
    name: "Raspberry wine",
    hex: "#b63753",
    base: "medium_base",
  },
  {
    name: "Rose red",
    hex: "#c92351",
    base: "medium_base",
  },
  {
    name: "Barberry",
    hex: "#bf1945",
    base: "medium_base",
  },
  {
    name: "Bright rose",
    hex: "#c51959",
    base: "medium_base",
  },
  {
    name: "Persian red",
    hex: "#a21441",
    base: "medium_base",
  },
  {
    name: "Cerise",
    hex: "#a41247",
    base: "medium_base",
  },
  {
    name: "Pink lady",
    hex: "#efc1d6",
    base: "ultra_pure_white",
  },
  {
    name: "Lilac sachet",
    hex: "#e9adca",
    base: "ultra_pure_white",
  },
  {
    name: "Prism pink",
    hex: "#f0a1bf",
    base: "ultra_pure_white",
  },
  {
    name: "Begonia pink",
    hex: "#ec9abe",
    base: "ultra_pure_white",
  },
  {
    name: "Fuchsia pink",
    hex: "#df88b7",
    base: "ultra_pure_white",
  },
  {
    name: "Rosebloom",
    hex: "#e290b2",
    base: "ultra_pure_white",
  },
  {
    name: "Ibis rose",
    hex: "#ca628f",
    base: "ultra_pure_white",
  },
  {
    name: "Sachet pink",
    hex: "#f18aad",
    base: "ultra_pure_white",
  },
  {
    name: "Wild orchid",
    hex: "#d979a2",
    base: "ultra_pure_white",
  },
  {
    name: "Aurora pink",
    hex: "#e881a6",
    base: "ultra_pure_white",
  },
  {
    name: "Chateau rose",
    hex: "#d2738f",
    base: "ultra_pure_white",
  },
  {
    name: "Morning glory",
    hex: "#ee819f",
    base: "ultra_pure_white",
  },
  {
    name: "Azalea pink",
    hex: "#e96a97",
    base: "ultra_pure_white",
  },
  {
    name: "Shocking pink",
    hex: "#de5b8c",
    base: "ultra_pure_white",
  },
  {
    name: "Hot pink",
    hex: "#e55982",
    base: "ultra_pure_white",
  },
  {
    name: "Fandango pink",
    hex: "#e04f80",
    base: "ultra_pure_white",
  },
  {
    name: "Honeysuckle",
    hex: "#d94f70",
    base: "medium_base",
  },
  {
    name: "Raspberry sorbet",
    hex: "#d2386c",
    base: "medium_base",
  },
  {
    name: "Carmine",
    hex: "#bc4869",
    base: "medium_base",
  },
  {
    name: "Fuchsia rose",
    hex: "#c74375",
    base: "medium_base",
  },
  {
    name: "Beetroot purple",
    hex: "#cf2d71",
    base: "medium_base",
  },
  {
    name: "Pink carnation",
    hex: "#ed7a9e",
    base: "ultra_pure_white",
  },
  {
    name: "Carmine rose",
    hex: "#e35b8f",
    base: "ultra_pure_white",
  },
  {
    name: "Magenta",
    hex: "#d23c77",
    base: "medium_base",
  },
  {
    name: "Pink flambe",
    hex: "#d3507a",
    base: "medium_base",
  },
  {
    name: "Fuchsia purple",
    hex: "#d33479",
    base: "medium_base",
  },
  {
    name: "Lilac rose",
    hex: "#bd4275",
    base: "medium_base",
  },
  {
    name: "Very berry",
    hex: "#b73275",
    base: "medium_base",
  },
  {
    name: "Super pink",
    hex: "#ce6ba4",
    base: "ultra_pure_white",
  },
  {
    name: "Phlox pink",
    hex: "#ce5e9a",
    base: "ultra_pure_white",
  },
  {
    name: "Raspberry rose",
    hex: "#cc4385",
    base: "medium_base",
  },
  {
    name: "Rose violet",
    hex: "#c0428a",
    base: "medium_base",
  },
  {
    name: "Fuchsia red",
    hex: "#ab3475",
    base: "medium_base",
  },
  {
    name: "Cactus flower",
    hex: "#a83e6c",
    base: "medium_base",
  },
  {
    name: "Magenta haze",
    hex: "#9d446e",
    base: "medium_base",
  },
  {
    name: "Shrinking violet",
    hex: "#f4e1e6",
    base: "ultra_pure_white",
  },
  {
    name: "Primrose pink",
    hex: "#eed4d9",
    base: "ultra_pure_white",
  },
  {
    name: "Silver pink",
    hex: "#dcb1af",
    base: "ultra_pure_white",
  },
  {
    name: "Powder pink",
    hex: "#ecb2b3",
    base: "ultra_pure_white",
  },
  {
    name: "Mauveglow",
    hex: "#d18489",
    base: "ultra_pure_white",
  },
  {
    name: "Brandied apricot",
    hex: "#ca848a",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty rose",
    hex: "#ba797d",
    base: "ultra_pure_white",
  },
  {
    name: "Mauve morn",
    hex: "#ecd6d6",
    base: "ultra_pure_white",
  },
  {
    name: "Mauve chalk",
    hex: "#e5d0cf",
    base: "ultra_pure_white",
  },
  {
    name: "Pearl",
    hex: "#f9dbd8",
    base: "ultra_pure_white",
  },
  {
    name: "Bridal rose",
    hex: "#d69fa2",
    base: "ultra_pure_white",
  },
  {
    name: "Blush",
    hex: "#d1969a",
    base: "ultra_pure_white",
  },
  {
    name: "Baroque rose",
    hex: "#b35a66",
    base: "medium_base",
  },
  {
    name: "Slate rose",
    hex: "#b45865",
    base: "medium_base",
  },
  {
    name: "Mineral red",
    hex: "#b35457",
    base: "medium_base",
  },
  {
    name: "Garnet rose",
    hex: "#ac4b55",
    base: "medium_base",
  },
  {
    name: "Holly berry",
    hex: "#b44e5d",
    base: "medium_base",
  },
  {
    name: "American beauty",
    hex: "#a73340",
    base: "medium_base",
  },
  {
    name: "Jester red",
    hex: "#9e1030",
    base: "medium_base",
  },
  {
    name: "Rio red",
    hex: "#8a2232",
    base: "medium_base",
  },
  {
    name: "Rumba red",
    hex: "#7c2439",
    base: "medium_base",
  },
  {
    name: "Earth red",
    hex: "#95424e",
    base: "medium_base",
  },
  {
    name: "Deep claret",
    hex: "#973443",
    base: "medium_base",
  },
  {
    name: "Garnet",
    hex: "#953640",
    base: "medium_base",
  },
  {
    name: "Brick red",
    hex: "#8c373e",
    base: "medium_base",
  },
  {
    name: "Rosewood",
    hex: "#813639",
    base: "medium_base",
  },
  {
    name: "Tibetan red",
    hex: "#782a39",
    base: "medium_base",
  },
  {
    name: "Biking red",
    hex: "#77212e",
    base: "deep_base",
  },
  {
    name: "Apple butter",
    hex: "#844b4d",
    base: "medium_base",
  },
  {
    name: "Oxblood red",
    hex: "#70393f",
    base: "medium_base",
  },
  {
    name: "Cowhide",
    hex: "#884344",
    base: "medium_base",
  },
  {
    name: "Burnt russet",
    hex: "#7e3940",
    base: "medium_base",
  },
  {
    name: "Ruby wine",
    hex: "#77333b",
    base: "medium_base",
  },
  {
    name: "Cordovan",
    hex: "#702f3b",
    base: "medium_base",
  },
  {
    name: "Tawny port",
    hex: "#5c2c35",
    base: "deep_base",
  },
  {
    name: "Creole pink",
    hex: "#f7d5cc",
    base: "ultra_pure_white",
  },
  {
    name: "Peach blush",
    hex: "#e4ccc6",
    base: "ultra_pure_white",
  },
  {
    name: "Cloud pink",
    hex: "#f5d1c8",
    base: "ultra_pure_white",
  },
  {
    name: "Veiled rose",
    hex: "#f8cdc9",
    base: "ultra_pure_white",
  },
  {
    name: "Pearl blush",
    hex: "#f4cec5",
    base: "ultra_pure_white",
  },
  {
    name: "English rose",
    hex: "#f4c6c3",
    base: "ultra_pure_white",
  },
  {
    name: "Lotus",
    hex: "#e2c1c0",
    base: "ultra_pure_white",
  },
  {
    name: "Rosewater",
    hex: "#f6dbd8",
    base: "ultra_pure_white",
  },
  {
    name: "Peach whip",
    hex: "#dbbeb7",
    base: "ultra_pure_white",
  },
  {
    name: "Rose smoke",
    hex: "#d3b4ad",
    base: "ultra_pure_white",
  },
  {
    name: "Coral cloud",
    hex: "#e2a9a1",
    base: "ultra_pure_white",
  },
  {
    name: "Misty rose",
    hex: "#caa39a",
    base: "ultra_pure_white",
  },
  {
    name: "Peach beige",
    hex: "#d3a297",
    base: "ultra_pure_white",
  },
  {
    name: "Cameo brown",
    hex: "#c08a80",
    base: "ultra_pure_white",
  },
  {
    name: "Seashell pink",
    hex: "#f7c8c2",
    base: "ultra_pure_white",
  },
  {
    name: "Chintz rose",
    hex: "#eec4be",
    base: "ultra_pure_white",
  },
  {
    name: "Impatiens pink",
    hex: "#ffc4bc",
    base: "ultra_pure_white",
  },
  {
    name: "Peachskin",
    hex: "#dfb8b6",
    base: "ultra_pure_white",
  },
  {
    name: "Mellow rose",
    hex: "#d9a6a1",
    base: "ultra_pure_white",
  },
  {
    name: "Rose tan",
    hex: "#d19c97",
    base: "ultra_pure_white",
  },
  {
    name: "Rosette",
    hex: "#ce8e8b",
    base: "ultra_pure_white",
  },
  {
    name: "Mauvewood",
    hex: "#a75d67",
    base: "medium_base",
  },
  {
    name: "Rose wine",
    hex: "#a4596d",
    base: "medium_base",
  },
  {
    name: "Malaga",
    hex: "#9f5069",
    base: "medium_base",
  },
  {
    name: "Dry rose",
    hex: "#8c4759",
    base: "medium_base",
  },
  {
    name: "Hawthorn rose",
    hex: "#884c5e",
    base: "medium_base",
  },
  {
    name: "Maroon",
    hex: "#834655",
    base: "medium_base",
  },
  {
    name: "Wild ginger",
    hex: "#7c4c53",
    base: "medium_base",
  },
  {
    name: "Sangria",
    hex: "#982551",
    base: "medium_base",
  },
  {
    name: "Red bud",
    hex: "#962d49",
    base: "medium_base",
  },
  {
    name: "Beaujolais",
    hex: "#80304c",
    base: "medium_base",
  },
  {
    name: "Anemone",
    hex: "#842c48",
    base: "medium_base",
  },
  {
    name: "Beet red",
    hex: "#7a1f3d",
    base: "medium_base",
  },
  {
    name: "Red plum",
    hex: "#7c2946",
    base: "medium_base",
  },
  {
    name: "Rhododendron",
    hex: "#722b3f",
    base: "medium_base",
  },
  {
    name: "Barely pink",
    hex: "#f8d7dd",
    base: "ultra_pure_white",
  },
  {
    name: "Blushing bride",
    hex: "#fbd3d9",
    base: "ultra_pure_white",
  },
  {
    name: "Cradle pink",
    hex: "#edd0dd",
    base: "ultra_pure_white",
  },
  {
    name: "Pale lilac",
    hex: "#e1c6cc",
    base: "ultra_pure_white",
  },
  {
    name: "Chalk pink",
    hex: "#e6c5ca",
    base: "ultra_pure_white",
  },
  {
    name: "Light lilac",
    hex: "#dec6d3",
    base: "ultra_pure_white",
  },
  {
    name: "Pink nectar",
    hex: "#d8aab7",
    base: "ultra_pure_white",
  },
  {
    name: "Heavenly pink",
    hex: "#f4dede",
    base: "ultra_pure_white",
  },
  {
    name: "Potpourri",
    hex: "#e7c9ca",
    base: "ultra_pure_white",
  },
  {
    name: "Crystal pink",
    hex: "#edd0ce",
    base: "ultra_pure_white",
  },
  {
    name: "Pink dogwood",
    hex: "#f7d1d1",
    base: "ultra_pure_white",
  },
  {
    name: "Crystal rose",
    hex: "#fdc3c6",
    base: "ultra_pure_white",
  },
  {
    name: "Strawberry cream",
    hex: "#f4c3c4",
    base: "ultra_pure_white",
  },
  {
    name: "Gossamer pink",
    hex: "#fac8c3",
    base: "ultra_pure_white",
  },
  {
    name: "Rose shadow",
    hex: "#f9c2cd",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid pink",
    hex: "#f3bbca",
    base: "ultra_pure_white",
  },
  {
    name: "Almond blossom",
    hex: "#f5bec7",
    base: "ultra_pure_white",
  },
  {
    name: "Coral blush",
    hex: "#e6b2b8",
    base: "ultra_pure_white",
  },
  {
    name: "Candy pink",
    hex: "#f5b0bd",
    base: "ultra_pure_white",
  },
  {
    name: "Peony",
    hex: "#ed9ca8",
    base: "ultra_pure_white",
  },
  {
    name: "Sea pink",
    hex: "#de98ab",
    base: "ultra_pure_white",
  },
  {
    name: "Cashmere rose",
    hex: "#ce879f",
    base: "ultra_pure_white",
  },
  {
    name: "Wild rose",
    hex: "#ce8498",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid smoke",
    hex: "#d294aa",
    base: "ultra_pure_white",
  },
  {
    name: "Polignac",
    hex: "#c28799",
    base: "ultra_pure_white",
  },
  {
    name: "Lilas",
    hex: "#b88995",
    base: "ultra_pure_white",
  },
  {
    name: "Mauve orchid",
    hex: "#b58299",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid haze",
    hex: "#b0879b",
    base: "ultra_pure_white",
  },
  {
    name: "Parfait pink",
    hex: "#e9c3cf",
    base: "ultra_pure_white",
  },
  {
    name: "Pink mist",
    hex: "#e6bccd",
    base: "ultra_pure_white",
  },
  {
    name: "Cameo pink",
    hex: "#dba9b8",
    base: "ultra_pure_white",
  },
  {
    name: "Sweet lilac",
    hex: "#e8b5ce",
    base: "ultra_pure_white",
  },
  {
    name: "Pink lavender",
    hex: "#d9afca",
    base: "ultra_pure_white",
  },
  {
    name: "Pastel lavender",
    hex: "#d8a1c4",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid",
    hex: "#d198c5",
    base: "ultra_pure_white",
  },
  {
    name: "Lilac chiffon",
    hex: "#de9bc4",
    base: "ultra_pure_white",
  },
  {
    name: "Moonlite mauve",
    hex: "#d28fb0",
    base: "ultra_pure_white",
  },
  {
    name: "Cyclamen",
    hex: "#d687ba",
    base: "ultra_pure_white",
  },
  {
    name: "Opera mauve",
    hex: "#ca80b1",
    base: "ultra_pure_white",
  },
  {
    name: "Crocus",
    hex: "#c67fae",
    base: "ultra_pure_white",
  },
  {
    name: "Mulberry",
    hex: "#a76c97",
    base: "ultra_pure_white",
  },
  {
    name: "Striking purple",
    hex: "#944e87",
    base: "medium_base",
  },
  {
    name: "Violet",
    hex: "#c17fb5",
    base: "ultra_pure_white",
  },
  {
    name: "Iris orchid",
    hex: "#a767a2",
    base: "ultra_pure_white",
  },
  {
    name: "Radiant orchid",
    hex: "#ad5e99",
    base: "ultra_pure_white",
  },
  {
    name: "Spring crocus",
    hex: "#ba69a1",
    base: "ultra_pure_white",
  },
  {
    name: "Meadow mauve",
    hex: "#a9568c",
    base: "medium_base",
  },
  {
    name: "Amethyst",
    hex: "#864d75",
    base: "medium_base",
  },
  {
    name: "Magenta purple",
    hex: "#6b264b",
    base: "medium_base",
  },
  {
    name: "Rosebud",
    hex: "#b65f9a",
    base: "ultra_pure_white",
  },
  {
    name: "Purple orchid",
    hex: "#ad4d8c",
    base: "medium_base",
  },
  {
    name: "Festival fuchsia",
    hex: "#9e2c6a",
    base: "medium_base",
  },
  {
    name: "Baton rouge",
    hex: "#973c6c",
    base: "medium_base",
  },
  {
    name: "Boysenberry",
    hex: "#85325c",
    base: "medium_base",
  },
  {
    name: "Raspberry radiance",
    hex: "#802a50",
    base: "medium_base",
  },
  {
    name: "Purple potion",
    hex: "#692746",
    base: "medium_base",
  },
  {
    name: "Dahlia mauve",
    hex: "#a64f82",
    base: "medium_base",
  },
  {
    name: "Vivid viola",
    hex: "#993c7c",
    base: "medium_base",
  },
  {
    name: "Wild aster",
    hex: "#92316f",
    base: "medium_base",
  },
  {
    name: "Deep orchid",
    hex: "#903f75",
    base: "medium_base",
  },
  {
    name: "Clover",
    hex: "#8a3371",
    base: "medium_base",
  },
  {
    name: "Purple wine",
    hex: "#8c3573",
    base: "medium_base",
  },
  {
    name: "Hollyhock",
    hex: "#823270",
    base: "medium_base",
  },
  {
    name: "Hyacinth violet",
    hex: "#8d4687",
    base: "medium_base",
  },
  {
    name: "Dahlia",
    hex: "#843e83",
    base: "medium_base",
  },
  {
    name: "Sparkling grape",
    hex: "#773376",
    base: "medium_base",
  },
  {
    name: "Byzantium",
    hex: "#853b7b",
    base: "medium_base",
  },
  {
    name: "Phlox",
    hex: "#692d5d",
    base: "medium_base",
  },
  {
    name: "Grape juice",
    hex: "#682961",
    base: "medium_base",
  },
  {
    name: "Gloxinia",
    hex: "#622e5a",
    base: "medium_base",
  },
  {
    name: "Crystal gray",
    hex: "#d7cbc4",
    base: "ultra_pure_white",
  },
  {
    name: "Mushroom",
    hex: "#bdaca3",
    base: "ultra_pure_white",
  },
  {
    name: "Shadow gray",
    hex: "#bba5a0",
    base: "ultra_pure_white",
  },
  {
    name: "Sphinx",
    hex: "#ab9895",
    base: "ultra_pure_white",
  },
  {
    name: "Bark",
    hex: "#a99592",
    base: "ultra_pure_white",
  },
  {
    name: "Fawn",
    hex: "#ae9490",
    base: "ultra_pure_white",
  },
  {
    name: "Adobe rose",
    hex: "#ba9f99",
    base: "ultra_pure_white",
  },
  {
    name: "Pale mauve",
    hex: "#c6a4a4",
    base: "ultra_pure_white",
  },
  {
    name: "Woodrose",
    hex: "#ae8c8e",
    base: "ultra_pure_white",
  },
  {
    name: "Deauville mauve",
    hex: "#af9294",
    base: "ultra_pure_white",
  },
  {
    name: "Twilight mauve",
    hex: "#8b6f70",
    base: "medium_base",
  },
  {
    name: "Rose taupe",
    hex: "#806062",
    base: "medium_base",
  },
  {
    name: "Rose brown",
    hex: "#80565b",
    base: "medium_base",
  },
  {
    name: "Roan rouge",
    hex: "#885157",
    base: "medium_base",
  },
  {
    name: "Antler",
    hex: "#957a76",
    base: "ultra_pure_white",
  },
  {
    name: "Peppercorn",
    hex: "#6c5656",
    base: "medium_base",
  },
  {
    name: "Raisin",
    hex: "#524144",
    base: "medium_base",
  },
  {
    name: "Huckleberry",
    hex: "#5b4349",
    base: "medium_base",
  },
  {
    name: "Catawba grape",
    hex: "#5d3c43",
    base: "medium_base",
  },
  {
    name: "Puce",
    hex: "#503938",
    base: "medium_base",
  },
  {
    name: "Fudge",
    hex: "#493338",
    base: "deep_base",
  },
  {
    name: "Mahogany rose",
    hex: "#c5a193",
    base: "ultra_pure_white",
  },
  {
    name: "Burlwood",
    hex: "#9b716b",
    base: "medium_base",
  },
  {
    name: "Marron",
    hex: "#6e4c4b",
    base: "medium_base",
  },
  {
    name: "Decadent chocolate",
    hex: "#513235",
    base: "deep_base",
  },
  {
    name: "Red mahogany",
    hex: "#60373d",
    base: "medium_base",
  },
  {
    name: "Vineyard wine",
    hex: "#58363d",
    base: "medium_base",
  },
  {
    name: "Winetasting",
    hex: "#492a34",
    base: "deep_base",
  },
  {
    name: "Port",
    hex: "#663336",
    base: "medium_base",
  },
  {
    name: "Chocolate truffle",
    hex: "#612e35",
    base: "medium_base",
  },
  {
    name: "Burgundy",
    hex: "#64313e",
    base: "medium_base",
  },
  {
    name: "Zinfandel",
    hex: "#5c2935",
    base: "deep_base",
  },
  {
    name: "Windsor wine",
    hex: "#582b36",
    base: "deep_base",
  },
  {
    name: "Port royale",
    hex: "#502b33",
    base: "deep_base",
  },
  {
    name: "Fig",
    hex: "#532d3b",
    base: "deep_base",
  },
  {
    name: "Violet ice",
    hex: "#c2acb1",
    base: "ultra_pure_white",
  },
  {
    name: "Burnished lilac",
    hex: "#c5aeb1",
    base: "ultra_pure_white",
  },
  {
    name: "Keepsake lilac",
    hex: "#c0a5ae",
    base: "ultra_pure_white",
  },
  {
    name: "Mauve shadows",
    hex: "#b598a3",
    base: "ultra_pure_white",
  },
  {
    name: "Dawn pink",
    hex: "#bfa3af",
    base: "ultra_pure_white",
  },
  {
    name: "Fragrant lilac",
    hex: "#ceadbe",
    base: "ultra_pure_white",
  },
  {
    name: "Mauve mist",
    hex: "#c49bd4",
    base: "ultra_pure_white",
  },
  {
    name: "Heather rose",
    hex: "#ad6d7f",
    base: "ultra_pure_white",
  },
  {
    name: "Red violet",
    hex: "#a35776",
    base: "medium_base",
  },
  {
    name: "Mellow mauve",
    hex: "#996378",
    base: "medium_base",
  },
  {
    name: "Bordeaux",
    hex: "#96637b",
    base: "medium_base",
  },
  {
    name: "Violet quartz",
    hex: "#8b4963",
    base: "medium_base",
  },
  {
    name: "Damson",
    hex: "#854c65",
    base: "medium_base",
  },
  {
    name: "Amaranth",
    hex: "#6f3c56",
    base: "medium_base",
  },
  {
    name: "Zephyr",
    hex: "#c89fa5",
    base: "ultra_pure_white",
  },
  {
    name: "Dusky orchid",
    hex: "#9a7182",
    base: "ultra_pure_white",
  },
  {
    name: "Grape shake",
    hex: "#886971",
    base: "medium_base",
  },
  {
    name: "Wistful mauve",
    hex: "#946c74",
    base: "medium_base",
  },
  {
    name: "Tulipwood",
    hex: "#805466",
    base: "medium_base",
  },
  {
    name: "Grape nectar",
    hex: "#8d5c74",
    base: "medium_base",
  },
  {
    name: "Argyle purple",
    hex: "#895c79",
    base: "medium_base",
  },
  {
    name: "Nostalgia rose",
    hex: "#a4777e",
    base: "ultra_pure_white",
  },
  {
    name: "Deco rose",
    hex: "#985f68",
    base: "medium_base",
  },
  {
    name: "Renaissance rose",
    hex: "#865560",
    base: "medium_base",
  },
  {
    name: "Nocturne",
    hex: "#7a4b56",
    base: "medium_base",
  },
  {
    name: "Crushed berry",
    hex: "#804f5a",
    base: "medium_base",
  },
  {
    name: "Crushed violets",
    hex: "#643a4c",
    base: "medium_base",
  },
  {
    name: "Mauve wine",
    hex: "#5b3644",
    base: "medium_base",
  },
  {
    name: "Plum wine",
    hex: "#674550",
    base: "medium_base",
  },
  {
    name: "Eggplant",
    hex: "#613f4c",
    base: "medium_base",
  },
  {
    name: "Prune",
    hex: "#603749",
    base: "medium_base",
  },
  {
    name: "Prune purple",
    hex: "#5c3a4d",
    base: "medium_base",
  },
  {
    name: "Grape wine",
    hex: "#5a2f43",
    base: "medium_base",
  },
  {
    name: "Italian plum",
    hex: "#533146",
    base: "medium_base",
  },
  {
    name: "Potent purple",
    hex: "#462639",
    base: "deep_base",
  },
  {
    name: "Lavender herb",
    hex: "#b18eaa",
    base: "ultra_pure_white",
  },
  {
    name: "Lavender mist",
    hex: "#ae90a7",
    base: "ultra_pure_white",
  },
  {
    name: "Valerian",
    hex: "#9f7a93",
    base: "ultra_pure_white",
  },
  {
    name: "Very grape",
    hex: "#927288",
    base: "ultra_pure_white",
  },
  {
    name: "Grapeade",
    hex: "#85677b",
    base: "medium_base",
  },
  {
    name: "Purple gumdrop",
    hex: "#7a596f",
    base: "medium_base",
  },
  {
    name: "Berry conserve",
    hex: "#765269",
    base: "medium_base",
  },
  {
    name: "Chinese violet",
    hex: "#835e81",
    base: "medium_base",
  },
  {
    name: "Crushed grape",
    hex: "#7a547f",
    base: "medium_base",
  },
  {
    name: "Concord grape",
    hex: "#7c5379",
    base: "medium_base",
  },
  {
    name: "Sunset purple",
    hex: "#6f456e",
    base: "medium_base",
  },
  {
    name: "Wood violet",
    hex: "#75406a",
    base: "medium_base",
  },
  {
    name: "Purple passion",
    hex: "#683d62",
    base: "medium_base",
  },
  {
    name: "Dark purple",
    hex: "#582147",
    base: "deep_base",
  },
  {
    name: "Grape jam",
    hex: "#725671",
    base: "medium_base",
  },
  {
    name: "Deep purple",
    hex: "#50314c",
    base: "medium_base",
  },
  {
    name: "Wineberry",
    hex: "#5a395b",
    base: "medium_base",
  },
  {
    name: "Grape royale",
    hex: "#4f2d54",
    base: "medium_base",
  },
  {
    name: "Plum purple",
    hex: "#51304e",
    base: "medium_base",
  },
  {
    name: "Hortensia",
    hex: "#553b50",
    base: "medium_base",
  },
  {
    name: "Blackberry wine",
    hex: "#4d3246",
    base: "medium_base",
  },
  {
    name: "Navy cosmos",
    hex: "#503b53",
    base: "medium_base",
  },
  {
    name: "Indigo",
    hex: "#4c3957",
    base: "medium_base",
  },
  {
    name: "Purple pennant",
    hex: "#432c47",
    base: "deep_base",
  },
  {
    name: "Plum perfect",
    hex: "#473442",
    base: "deep_base",
  },
  {
    name: "Sweet grape",
    hex: "#4b3b4f",
    base: "medium_base",
  },
  {
    name: "Shadow purple",
    hex: "#4e334e",
    base: "medium_base",
  },
  {
    name: "Blackberry cordial",
    hex: "#3f2a47",
    base: "deep_base",
  },
  {
    name: "Purple reign",
    hex: "#56456b",
    base: "medium_base",
  },
  {
    name: "Mulberry purple",
    hex: "#493c62",
    base: "medium_base",
  },
  {
    name: "Gothic grape",
    hex: "#473951",
    base: "medium_base",
  },
  {
    name: "Grape",
    hex: "#433455",
    base: "medium_base",
  },
  {
    name: "Mysterioso",
    hex: "#46394b",
    base: "medium_base",
  },
  {
    name: "Purple velvet",
    hex: "#41354d",
    base: "medium_base",
  },
  {
    name: "Nightshade",
    hex: "#433748",
    base: "medium_base",
  },
  {
    name: "Orchid tint",
    hex: "#dbd2db",
    base: "ultra_pure_white",
  },
  {
    name: "Lilac ash",
    hex: "#d7cdcd",
    base: "ultra_pure_white",
  },
  {
    name: "Gray lilac",
    hex: "#d4cacd",
    base: "ultra_pure_white",
  },
  {
    name: "Hushed violet",
    hex: "#d1c0bf",
    base: "ultra_pure_white",
  },
  {
    name: "Cloud gray",
    hex: "#b7a9ac",
    base: "ultra_pure_white",
  },
  {
    name: "Quail",
    hex: "#98868c",
    base: "ultra_pure_white",
  },
  {
    name: "Nirvana",
    hex: "#a2919b",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid hush",
    hex: "#cec3d2",
    base: "ultra_pure_white",
  },
  {
    name: "Iris",
    hex: "#baafbc",
    base: "ultra_pure_white",
  },
  {
    name: "Sea fog",
    hex: "#a5929d",
    base: "ultra_pure_white",
  },
  {
    name: "Elderberry",
    hex: "#9d848e",
    base: "ultra_pure_white",
  },
  {
    name: "Black plum",
    hex: "#6c5765",
    base: "medium_base",
  },
  {
    name: "Flint",
    hex: "#705861",
    base: "medium_base",
  },
  {
    name: "Sassafras",
    hex: "#54353b",
    base: "medium_base",
  },
  {
    name: "Evening haze",
    hex: "#bdb8c7",
    base: "ultra_pure_white",
  },
  {
    name: "Thistle",
    hex: "#b9b3c5",
    base: "ultra_pure_white",
  },
  {
    name: "Lavender gray",
    hex: "#9890a2",
    base: "ultra_pure_white",
  },
  {
    name: "Minimal gray",
    hex: "#948d99",
    base: "ultra_pure_white",
  },
  {
    name: "Purple ash",
    hex: "#8f8395",
    base: "ultra_pure_white",
  },
  {
    name: "Gray ridge",
    hex: "#847986",
    base: "ultra_pure_white",
  },
  {
    name: "Purple sage",
    hex: "#75697e",
    base: "medium_base",
  },
  {
    name: "Heirloom lilac",
    hex: "#9d96b2",
    base: "ultra_pure_white",
  },
  {
    name: "Wisteria",
    hex: "#a198af",
    base: "ultra_pure_white",
  },
  {
    name: "Dusk",
    hex: "#897f98",
    base: "ultra_pure_white",
  },
  {
    name: "Daybreak",
    hex: "#8981a0",
    base: "ultra_pure_white",
  },
  {
    name: "Cadet",
    hex: "#6a6378",
    base: "medium_base",
  },
  {
    name: "Mulled grape",
    hex: "#675a74",
    base: "medium_base",
  },
  {
    name: "Purple plumeria",
    hex: "#473854",
    base: "medium_base",
  },
  {
    name: "Lilac marble",
    hex: "#c3babf",
    base: "ultra_pure_white",
  },
  {
    name: "Ashes of roses",
    hex: "#b5acab",
    base: "ultra_pure_white",
  },
  {
    name: "Gull gray",
    hex: "#a49ca0",
    base: "ultra_pure_white",
  },
  {
    name: "Zinc",
    hex: "#92898a",
    base: "ultra_pure_white",
  },
  {
    name: "Gull",
    hex: "#918c8f",
    base: "ultra_pure_white",
  },
  {
    name: "Shark",
    hex: "#6d636b",
    base: "medium_base",
  },
  {
    name: "Sparrow",
    hex: "#69595c",
    base: "medium_base",
  },
  {
    name: "Orchid ice",
    hex: "#e0d0db",
    base: "ultra_pure_white",
  },
  {
    name: "Lilac snow",
    hex: "#e0c7d7",
    base: "ultra_pure_white",
  },
  {
    name: "Winsome orchid",
    hex: "#d4b9cb",
    base: "ultra_pure_white",
  },
  {
    name: "Fair orchid",
    hex: "#c0aac0",
    base: "ultra_pure_white",
  },
  {
    name: "Lavender frost",
    hex: "#bdabbe",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid petal",
    hex: "#bfb4cb",
    base: "ultra_pure_white",
  },
  {
    name: "Pastel lilac",
    hex: "#bdb0d0",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid bloom",
    hex: "#c5aecf",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid bouquet",
    hex: "#d1acce",
    base: "ultra_pure_white",
  },
  {
    name: "Lupine",
    hex: "#be9cc1",
    base: "ultra_pure_white",
  },
  {
    name: "Violet tulle",
    hex: "#c193c0",
    base: "ultra_pure_white",
  },
  {
    name: "Sheer lilac",
    hex: "#b793c0",
    base: "ultra_pure_white",
  },
  {
    name: "African violet",
    hex: "#b085b7",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty lavender",
    hex: "#a1759c",
    base: "ultra_pure_white",
  },
  {
    name: "Paisley purple",
    hex: "#8b79b1",
    base: "ultra_pure_white",
  },
  {
    name: "Hyacinth",
    hex: "#936ca7",
    base: "ultra_pure_white",
  },
  {
    name: "Amethyst orchid",
    hex: "#926aa6",
    base: "ultra_pure_white",
  },
  {
    name: "Dewberry",
    hex: "#8b5987",
    base: "medium_base",
  },
  {
    name: "Purple heart",
    hex: "#745587",
    base: "medium_base",
  },
  {
    name: "Meadow violet",
    hex: "#764f82",
    base: "medium_base",
  },
  {
    name: "Royal purple",
    hex: "#603f83",
    base: "medium_base",
  },
  {
    name: "Deep lavender",
    hex: "#775496",
    base: "medium_base",
  },
  {
    name: "Royal lilac",
    hex: "#774d8e",
    base: "medium_base",
  },
  {
    name: "Pansy",
    hex: "#653d7c",
    base: "medium_base",
  },
  {
    name: "Bright violet",
    hex: "#784384",
    base: "medium_base",
  },
  {
    name: "Amaranth purple",
    hex: "#6a397b",
    base: "medium_base",
  },
  {
    name: "Purple magic",
    hex: "#663271",
    base: "medium_base",
  },
  {
    name: "Plum",
    hex: "#5a315d",
    base: "medium_base",
  },
  {
    name: "Imperial palace",
    hex: "#604e7a",
    base: "medium_base",
  },
  {
    name: "Patrician purple",
    hex: "#6c4e79",
    base: "medium_base",
  },
  {
    name: "Loganberry",
    hex: "#5a4769",
    base: "medium_base",
  },
  {
    name: "Majesty",
    hex: "#593761",
    base: "medium_base",
  },
  {
    name: "Imperial purple",
    hex: "#542c5d",
    base: "medium_base",
  },
  {
    name: "Crown jewel",
    hex: "#482d54",
    base: "medium_base",
  },
  {
    name: "Parachute purple",
    hex: "#392852",
    base: "deep_base",
  },
  {
    name: "Lavender fog",
    hex: "#d2c4d6",
    base: "ultra_pure_white",
  },
  {
    name: "Lavendula",
    hex: "#bca4cb",
    base: "ultra_pure_white",
  },
  {
    name: "Lavender",
    hex: "#afa4ce",
    base: "ultra_pure_white",
  },
  {
    name: "Bougainvillea",
    hex: "#9884b9",
    base: "ultra_pure_white",
  },
  {
    name: "Violet tulip",
    hex: "#9e91c3",
    base: "ultra_pure_white",
  },
  {
    name: "Chalk violet",
    hex: "#8f7da5",
    base: "ultra_pure_white",
  },
  {
    name: "Purple haze",
    hex: "#807396",
    base: "ultra_pure_white",
  },
  {
    name: "Smoky grape",
    hex: "#b88aac",
    base: "ultra_pure_white",
  },
  {
    name: "Regal orchid",
    hex: "#a98baf",
    base: "ultra_pure_white",
  },
  {
    name: "Viola",
    hex: "#a692ba",
    base: "ultra_pure_white",
  },
  {
    name: "Orchid mist",
    hex: "#917798",
    base: "ultra_pure_white",
  },
  {
    name: "Grape compote",
    hex: "#6b5876",
    base: "medium_base",
  },
  {
    name: "Montana grape",
    hex: "#6c5971",
    base: "medium_base",
  },
  {
    name: "Vintage violet",
    hex: "#634f62",
    base: "medium_base",
  },
  {
    name: "Aster purple",
    hex: "#7d74a8",
    base: "ultra_pure_white",
  },
  {
    name: "Dahlia purple",
    hex: "#7e6eac",
    base: "ultra_pure_white",
  },
  {
    name: "Passion flower",
    hex: "#6d5698",
    base: "medium_base",
  },
  {
    name: "Ultra violet",
    hex: "#5f4b8b",
    base: "medium_base",
  },
  {
    name: "Prism violet",
    hex: "#53357d",
    base: "medium_base",
  },
  {
    name: "Heliotrope",
    hex: "#4f3872",
    base: "medium_base",
  },
  {
    name: "Petunia",
    hex: "#4f3466",
    base: "medium_base",
  },
  {
    name: "Corsican blue",
    hex: "#646093",
    base: "medium_base",
  },
  {
    name: "Veronica",
    hex: "#6d6695",
    base: "medium_base",
  },
  {
    name: "Blue iris",
    hex: "#5a5b9f",
    base: "medium_base",
  },
  {
    name: "Purple opulence",
    hex: "#60569a",
    base: "medium_base",
  },
  {
    name: "Gentian violet",
    hex: "#544275",
    base: "medium_base",
  },
  {
    name: "Liberty",
    hex: "#4d448a",
    base: "medium_base",
  },
  {
    name: "Deep blue",
    hex: "#44377d",
    base: "medium_base",
  },
  {
    name: "Bleached denim",
    hex: "#646f9b",
    base: "medium_base",
  },
  {
    name: "Heron",
    hex: "#62617e",
    base: "medium_base",
  },
  {
    name: "Skipper blue",
    hex: "#484a72",
    base: "medium_base",
  },
  {
    name: "Navy blue",
    hex: "#403f6f",
    base: "medium_base",
  },
  {
    name: "Deep wisteria",
    hex: "#443f6f",
    base: "medium_base",
  },
  {
    name: "Blue ribbon",
    hex: "#3a395f",
    base: "medium_base",
  },
  {
    name: "Astral aura",
    hex: "#363151",
    base: "deep_base",
  },
  {
    name: "Lilac hint",
    hex: "#d0d0da",
    base: "ultra_pure_white",
  },
  {
    name: "Misty lilac",
    hex: "#bcb4c4",
    base: "ultra_pure_white",
  },
  {
    name: "Lavender blue",
    hex: "#c5c0d0",
    base: "ultra_pure_white",
  },
  {
    name: "Purple heather",
    hex: "#bab8d3",
    base: "ultra_pure_white",
  },
  {
    name: "Cosmic sky",
    hex: "#aaaac4",
    base: "ultra_pure_white",
  },
  {
    name: "Languid lavender",
    hex: "#a2a1ba",
    base: "ultra_pure_white",
  },
  {
    name: "Dapple gray",
    hex: "#9c9ba7",
    base: "ultra_pure_white",
  },
  {
    name: "Sweet lavender",
    hex: "#9a9bc1",
    base: "ultra_pure_white",
  },
  {
    name: "Easter egg",
    hex: "#919bc9",
    base: "ultra_pure_white",
  },
  {
    name: "Jacaranda",
    hex: "#848dc5",
    base: "ultra_pure_white",
  },
  {
    name: "Deep periwinkle",
    hex: "#7c83bc",
    base: "ultra_pure_white",
  },
  {
    name: "Dusted peri",
    hex: "#696ba0",
    base: "medium_base",
  },
  {
    name: "Violet storm",
    hex: "#5c619d",
    base: "medium_base",
  },
  {
    name: "Baja blue",
    hex: "#5f6db0",
    base: "medium_base",
  },
  {
    name: "Thistle down",
    hex: "#9499bb",
    base: "ultra_pure_white",
  },
  {
    name: "Persian violet",
    hex: "#8c8eb2",
    base: "ultra_pure_white",
  },
  {
    name: "Twilight purple",
    hex: "#66648b",
    base: "medium_base",
  },
  {
    name: "Orient blue",
    hex: "#47457a",
    base: "medium_base",
  },
  {
    name: "Clematis blue",
    hex: "#363b7c",
    base: "medium_base",
  },
  {
    name: "Royal blue",
    hex: "#3d428b",
    base: "medium_base",
  },
  {
    name: "Spectrum blue",
    hex: "#3d3c7c",
    base: "medium_base",
  },
  {
    name: "Lavender violet",
    hex: "#767ba5",
    base: "ultra_pure_white",
  },
  {
    name: "Blue ice",
    hex: "#70789b",
    base: "ultra_pure_white",
  },
  {
    name: "Velvet morning",
    hex: "#60688d",
    base: "medium_base",
  },
  {
    name: "Marlin",
    hex: "#515b87",
    base: "medium_base",
  },
  {
    name: "Blueprint",
    hex: "#2d3359",
    base: "deep_base",
  },
  {
    name: "Blue depths",
    hex: "#263056",
    base: "deep_base",
  },
  {
    name: "Medieval blue",
    hex: "#29304e",
    base: "deep_base",
  },
  {
    name: "Lavender aura",
    hex: "#9f99aa",
    base: "ultra_pure_white",
  },
  {
    name: "Stonewash",
    hex: "#74809a",
    base: "ultra_pure_white",
  },
  {
    name: "Nightshadow blue",
    hex: "#4e5368",
    base: "medium_base",
  },
  {
    name: "Blue indigo",
    hex: "#49516d",
    base: "medium_base",
  },
  {
    name: "Graystone",
    hex: "#4d495b",
    base: "medium_base",
  },
  {
    name: "Crown blue",
    hex: "#464b65",
    base: "medium_base",
  },
  {
    name: "Deep cobalt",
    hex: "#404466",
    base: "medium_base",
  },
  {
    name: "Arctic ice",
    hex: "#bfc7d6",
    base: "ultra_pure_white",
  },
  {
    name: "Gray dawn",
    hex: "#bbc1cc",
    base: "ultra_pure_white",
  },
  {
    name: "Heather",
    hex: "#b7c0d6",
    base: "ultra_pure_white",
  },
  {
    name: "Eventide",
    hex: "#959eb7",
    base: "ultra_pure_white",
  },
  {
    name: "Silver lake blue",
    hex: "#618bb9",
    base: "ultra_pure_white",
  },
  {
    name: "Blue bonnet",
    hex: "#6384b8",
    base: "ultra_pure_white",
  },
  {
    name: "Blue yonder",
    hex: "#5a77a8",
    base: "medium_base",
  },
  {
    name: "Lavender lustre",
    hex: "#8c9cc1",
    base: "ultra_pure_white",
  },
  {
    name: "Purple impression",
    hex: "#858fb1",
    base: "ultra_pure_white",
  },
  {
    name: "Grapemist",
    hex: "#8398ca",
    base: "ultra_pure_white",
  },
  {
    name: "Vista blue",
    hex: "#81a0d4",
    base: "ultra_pure_white",
  },
  {
    name: "Cornflower blue",
    hex: "#7391c8",
    base: "ultra_pure_white",
  },
  {
    name: "Persian jewel",
    hex: "#6e81be",
    base: "ultra_pure_white",
  },
  {
    name: "Wedgewood",
    hex: "#6479b3",
    base: "ultra_pure_white",
  },
  {
    name: "Skyway",
    hex: "#adbed3",
    base: "ultra_pure_white",
  },
  {
    name: "Cashmere blue",
    hex: "#a5b8d0",
    base: "ultra_pure_white",
  },
  {
    name: "Blue bell",
    hex: "#93b4d7",
    base: "ultra_pure_white",
  },
  {
    name: "Placid blue",
    hex: "#8cadd3",
    base: "ultra_pure_white",
  },
  {
    name: "Della Robbia blue",
    hex: "#7a9dcb",
    base: "ultra_pure_white",
  },
  {
    name: "Provence",
    hex: "#658dc6",
    base: "ultra_pure_white",
  },
  {
    name: "Ultramarine",
    hex: "#5b7ebd",
    base: "ultra_pure_white",
  },
  {
    name: "Allure",
    hex: "#7291b4",
    base: "ultra_pure_white",
  },
  {
    name: "Colony blue",
    hex: "#65769a",
    base: "medium_base",
  },
  {
    name: "Moonlight blue",
    hex: "#506886",
    base: "medium_base",
  },
  {
    name: "Dutch blue",
    hex: "#4a638d",
    base: "medium_base",
  },
  {
    name: "Delft",
    hex: "#3d5e8c",
    base: "medium_base",
  },
  {
    name: "Limoges",
    hex: "#243f6c",
    base: "medium_base",
  },
  {
    name: "Estate blue",
    hex: "#233658",
    base: "deep_base",
  },
  {
    name: "Infinity",
    hex: "#6e7e99",
    base: "ultra_pure_white",
  },
  {
    name: "Bijou blue",
    hex: "#4e5e7f",
    base: "medium_base",
  },
  {
    name: "Coastal fjord",
    hex: "#505d7e",
    base: "medium_base",
  },
  {
    name: "True navy",
    hex: "#3f5277",
    base: "medium_base",
  },
  {
    name: "Ensign blue",
    hex: "#384c67",
    base: "medium_base",
  },
  {
    name: "Dark denim",
    hex: "#35465e",
    base: "medium_base",
  },
  {
    name: "Insignia blue",
    hex: "#2f3e55",
    base: "medium_base",
  },
  {
    name: "Air blue",
    hex: "#77acc7",
    base: "ultra_pure_white",
  },
  {
    name: "Heritage blue",
    hex: "#5d96bc",
    base: "ultra_pure_white",
  },
  {
    name: "Ethereal blue",
    hex: "#5ca6ce",
    base: "ultra_pure_white",
  },
  {
    name: "Bonnie blue",
    hex: "#539ccc",
    base: "ultra_pure_white",
  },
  {
    name: "Cendre blue",
    hex: "#3e7fa5",
    base: "medium_base",
  },
  {
    name: "Parisian blue",
    hex: "#4f7ca4",
    base: "medium_base",
  },
  {
    name: "Faience",
    hex: "#2a6a8b",
    base: "medium_base",
  },
  {
    name: "Alaskan blue",
    hex: "#6da9d2",
    base: "ultra_pure_white",
  },
  {
    name: "Little boy blue",
    hex: "#6ea2d5",
    base: "ultra_pure_white",
  },
  {
    name: "Azure blue",
    hex: "#4d91c6",
    base: "ultra_pure_white",
  },
  {
    name: "Riviera",
    hex: "#5879a2",
    base: "medium_base",
  },
  {
    name: "Federal blue",
    hex: "#43628b",
    base: "medium_base",
  },
  {
    name: "Star sapphire",
    hex: "#386192",
    base: "medium_base",
  },
  {
    name: "Bright cobalt",
    hex: "#385d8d",
    base: "medium_base",
  },
  {
    name: "Dusk blue",
    hex: "#7ba0c0",
    base: "ultra_pure_white",
  },
  {
    name: "Regatta",
    hex: "#487ab7",
    base: "medium_base",
  },
  {
    name: "Palace blue",
    hex: "#346cb0",
    base: "medium_base",
  },
  {
    name: "Strong blue",
    hex: "#1f5da0",
    base: "medium_base",
  },
  {
    name: "Turkish sea",
    hex: "#195190",
    base: "medium_base",
  },
  {
    name: "Olympian blue",
    hex: "#1a4c8b",
    base: "medium_base",
  },
  {
    name: "Classic blue",
    hex: "#0f4c81",
    base: "medium_base",
  },
  {
    name: "Marina",
    hex: "#4f84c4",
    base: "medium_base",
  },
  {
    name: "Campanula",
    hex: "#3272af",
    base: "medium_base",
  },
  {
    name: "Daphne",
    hex: "#0f5f9a",
    base: "medium_base",
  },
  {
    name: "Victoria blue",
    hex: "#08589d",
    base: "medium_base",
  },
  {
    name: "Snorkel blue",
    hex: "#034f84",
    base: "medium_base",
  },
  {
    name: "Nautical blue",
    hex: "#1a5091",
    base: "medium_base",
  },
  {
    name: "Princess blue",
    hex: "#00539c",
    base: "medium_base",
  },
  {
    name: "Dazzling blue",
    hex: "#3850a0",
    base: "medium_base",
  },
  {
    name: "Amparo blue",
    hex: "#4960a8",
    base: "medium_base",
  },
  {
    name: "Deep ultramarine",
    hex: "#384883",
    base: "medium_base",
  },
  {
    name: "Surf the web",
    hex: "#203c7f",
    base: "medium_base",
  },
  {
    name: "Mazarine blue",
    hex: "#273c76",
    base: "medium_base",
  },
  {
    name: "True blue",
    hex: "#1e4477",
    base: "medium_base",
  },
  {
    name: "Twilight blue",
    hex: "#313d64",
    base: "medium_base",
  },
  {
    name: "Kentucky blue",
    hex: "#a5b3cc",
    base: "ultra_pure_white",
  },
  {
    name: "Cerulean",
    hex: "#9bb7d4",
    base: "ultra_pure_white",
  },
  {
    name: "Powder blue",
    hex: "#96b3d2",
    base: "ultra_pure_white",
  },
  {
    name: "Forever blue",
    hex: "#899bb8",
    base: "ultra_pure_white",
  },
  {
    name: "Tempest",
    hex: "#79839b",
    base: "ultra_pure_white",
  },
  {
    name: "Country blue",
    hex: "#717f9b",
    base: "ultra_pure_white",
  },
  {
    name: "English manor",
    hex: "#7181a4",
    base: "ultra_pure_white",
  },
  {
    name: "Illusion blue",
    hex: "#c9d3dc",
    base: "ultra_pure_white",
  },
  {
    name: "Ballad blue",
    hex: "#c0ceda",
    base: "ultra_pure_white",
  },
  {
    name: "Baby blue",
    hex: "#b5c7d3",
    base: "ultra_pure_white",
  },
  {
    name: "Celestial blue",
    hex: "#a3b4c4",
    base: "ultra_pure_white",
  },
  {
    name: "Blue fog",
    hex: "#9babbb",
    base: "ultra_pure_white",
  },
  {
    name: "Flint stone",
    hex: "#677283",
    base: "medium_base",
  },
  {
    name: "Folkstone gray",
    hex: "#626879",
    base: "medium_base",
  },
  {
    name: "Pearl blue",
    hex: "#b0b7be",
    base: "ultra_pure_white",
  },
  {
    name: "Monument",
    hex: "#84898c",
    base: "ultra_pure_white",
  },
  {
    name: "Dark slate",
    hex: "#46515a",
    base: "medium_base",
  },
  {
    name: "Midnight navy",
    hex: "#34414e",
    base: "medium_base",
  },
  {
    name: "Total eclipse",
    hex: "#2c313d",
    base: "deep_base",
  },
  {
    name: "Blue graphite",
    hex: "#323137",
    base: "deep_base",
  },
  {
    name: "Dark navy",
    hex: "#232f36",
    base: "deep_base",
  },
  {
    name: "Ice flow",
    hex: "#c6d2d2",
    base: "ultra_pure_white",
  },
  {
    name: "Quarry",
    hex: "#98a0a5",
    base: "ultra_pure_white",
  },
  {
    name: "Griffin",
    hex: "#8d8f8f",
    base: "ultra_pure_white",
  },
  {
    name: "Dark shadow",
    hex: "#4a4b4d",
    base: "medium_base",
  },
  {
    name: "Ombre blue",
    hex: "#434854",
    base: "medium_base",
  },
  {
    name: "India ink",
    hex: "#3c3f4a",
    base: "medium_base",
  },
  {
    name: "Ebony",
    hex: "#41424a",
    base: "medium_base",
  },
  {
    name: "Patriot blue",
    hex: "#363756",
    base: "medium_base",
  },
  {
    name: "Eclipse",
    hex: "#343148",
    base: "deep_base",
  },
  {
    name: "Mood indigo",
    hex: "#353a4c",
    base: "deep_base",
  },
  {
    name: "Peacoat",
    hex: "#2b2e43",
    base: "deep_base",
  },
  {
    name: "Black iris",
    hex: "#2b3042",
    base: "deep_base",
  },
  {
    name: "Dress blues",
    hex: "#2a3244",
    base: "deep_base",
  },
  {
    name: "Blue nights",
    hex: "#363b48",
    base: "deep_base",
  },
  {
    name: "Angel falls",
    hex: "#a3bdd3",
    base: "ultra_pure_white",
  },
  {
    name: "Dream blue",
    hex: "#a0bcd0",
    base: "ultra_pure_white",
  },
  {
    name: "Ashley blue",
    hex: "#8699ab",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty blue",
    hex: "#8c9dad",
    base: "ultra_pure_white",
  },
  {
    name: "Indian teal",
    hex: "#3c586b",
    base: "medium_base",
  },
  {
    name: "Stargazer",
    hex: "#39505c",
    base: "medium_base",
  },
  {
    name: "Orion blue",
    hex: "#3e4f5c",
    base: "medium_base",
  },
  {
    name: "Forget-me-not",
    hex: "#8fadbd",
    base: "ultra_pure_white",
  },
  {
    name: "Faded denim",
    hex: "#798ea4",
    base: "ultra_pure_white",
  },
  {
    name: "Blue shadow",
    hex: "#66829a",
    base: "medium_base",
  },
  {
    name: "Coronet blue",
    hex: "#59728e",
    base: "medium_base",
  },
  {
    name: "Captain's blue",
    hex: "#557088",
    base: "medium_base",
  },
  {
    name: "Copen blue",
    hex: "#516b84",
    base: "medium_base",
  },
  {
    name: "China blue",
    hex: "#546477",
    base: "medium_base",
  },
  {
    name: "Adriatic blue",
    hex: "#5c899b",
    base: "medium_base",
  },
  {
    name: "Provincial blue",
    hex: "#5c798e",
    base: "medium_base",
  },
  {
    name: "Niagara",
    hex: "#5487a4",
    base: "medium_base",
  },
  {
    name: "Blue heaven",
    hex: "#5b7e98",
    base: "medium_base",
  },
  {
    name: "Stellar",
    hex: "#46647e",
    base: "medium_base",
  },
  {
    name: "Real teal",
    hex: "#405d73",
    base: "medium_base",
  },
  {
    name: "Majolica blue",
    hex: "#274357",
    base: "deep_base",
  },
  {
    name: "Starlight blue",
    hex: "#b5ced4",
    base: "ultra_pure_white",
  },
  {
    name: "Winter sky",
    hex: "#a9c0cb",
    base: "ultra_pure_white",
  },
  {
    name: "Stratosphere",
    hex: "#9ec1cc",
    base: "ultra_pure_white",
  },
  {
    name: "Sterling blue",
    hex: "#a2b9c2",
    base: "ultra_pure_white",
  },
  {
    name: "Arona",
    hex: "#879ba3",
    base: "ultra_pure_white",
  },
  {
    name: "Citadel",
    hex: "#748995",
    base: "ultra_pure_white",
  },
  {
    name: "Blue mirage",
    hex: "#5c6d7c",
    base: "medium_base",
  },
  {
    name: "Cloud blue",
    hex: "#a2b6b9",
    base: "ultra_pure_white",
  },
  {
    name: "Ether",
    hex: "#9eb6b8",
    base: "ultra_pure_white",
  },
  {
    name: "Cameo blue",
    hex: "#769da6",
    base: "ultra_pure_white",
  },
  {
    name: "Stone blue",
    hex: "#829ca5",
    base: "ultra_pure_white",
  },
  {
    name: "Tourmaline",
    hex: "#86a1a9",
    base: "ultra_pure_white",
  },
  {
    name: "Smoke blue",
    hex: "#6d8994",
    base: "ultra_pure_white",
  },
  {
    name: "Bluestone",
    hex: "#577284",
    base: "medium_base",
  },
  {
    name: "Aquamarine",
    hex: "#9dc3d4",
    base: "ultra_pure_white",
  },
  {
    name: "Sky blue",
    hex: "#8abad3",
    base: "ultra_pure_white",
  },
  {
    name: "Milky blue",
    hex: "#72a8ba",
    base: "ultra_pure_white",
  },
  {
    name: "Blue grotto",
    hex: "#5cacce",
    base: "ultra_pure_white",
  },
  {
    name: "Norse blue",
    hex: "#4ca5c7",
    base: "ultra_pure_white",
  },
  {
    name: "Aquarius",
    hex: "#3cadd4",
    base: "ultra_pure_white",
  },
  {
    name: "Maui blue",
    hex: "#52a2b4",
    base: "ultra_pure_white",
  },
  {
    name: "Blue mist",
    hex: "#5bacc3",
    base: "ultra_pure_white",
  },
  {
    name: "River blue",
    hex: "#38afcd",
    base: "ultra_pure_white",
  },
  {
    name: "Cyan blue",
    hex: "#14a3c7",
    base: "medium_base",
  },
  {
    name: "Horizon blue",
    hex: "#289dbe",
    base: "medium_base",
  },
  {
    name: "Blue moon",
    hex: "#3686a0",
    base: "medium_base",
  },
  {
    name: "Bluejay",
    hex: "#157ea0",
    base: "medium_base",
  },
  {
    name: "Mediterranean blue",
    hex: "#1478a7",
    base: "medium_base",
  },
  {
    name: "Bachelor button",
    hex: "#4abbd5",
    base: "ultra_pure_white",
  },
  {
    name: "Blue atoll",
    hex: "#00b1d2",
    base: "medium_base",
  },
  {
    name: "Vivid blue",
    hex: "#0088b0",
    base: "medium_base",
  },
  {
    name: "Hawaiian ocean",
    hex: "#008db9",
    base: "medium_base",
  },
  {
    name: "Blue danube",
    hex: "#0087b6",
    base: "medium_base",
  },
  {
    name: "Blue jewel",
    hex: "#007baa",
    base: "medium_base",
  },
  {
    name: "Methyl blue",
    hex: "#0074a8",
    base: "medium_base",
  },
  {
    name: "Malibu blue",
    hex: "#008cc1",
    base: "medium_base",
  },
  {
    name: "Blithe",
    hex: "#0084bd",
    base: "medium_base",
  },
  {
    name: "Swedish blue",
    hex: "#007eb1",
    base: "medium_base",
  },
  {
    name: "Dresden blue",
    hex: "#0086bb",
    base: "medium_base",
  },
  {
    name: "Diva blue",
    hex: "#007bb2",
    base: "medium_base",
  },
  {
    name: "Blue aster",
    hex: "#0077b3",
    base: "medium_base",
  },
  {
    name: "Cloisonne",
    hex: "#0075af",
    base: "medium_base",
  },
  {
    name: "French blue",
    hex: "#0072b5",
    base: "medium_base",
  },
  {
    name: "Brilliant blue",
    hex: "#0075b3",
    base: "medium_base",
  },
  {
    name: "Directoire blue",
    hex: "#0061a3",
    base: "medium_base",
  },
  {
    name: "Skydiver",
    hex: "#00589b",
    base: "medium_base",
  },
  {
    name: "Imperial blue",
    hex: "#005a92",
    base: "medium_base",
  },
  {
    name: "Deep water",
    hex: "#266691",
    base: "medium_base",
  },
  {
    name: "Dark blue",
    hex: "#305679",
    base: "medium_base",
  },
  {
    name: "Pastel blue",
    hex: "#bcd3d5",
    base: "ultra_pure_white",
  },
  {
    name: "Clearwater",
    hex: "#aad5db",
    base: "ultra_pure_white",
  },
  {
    name: "Blue glow",
    hex: "#b2d4dd",
    base: "ultra_pure_white",
  },
  {
    name: "Plume",
    hex: "#a5cfd5",
    base: "ultra_pure_white",
  },
  {
    name: "Porcelain blue",
    hex: "#95c0cb",
    base: "ultra_pure_white",
  },
  {
    name: "Crystal blue",
    hex: "#a1c8db",
    base: "ultra_pure_white",
  },
  {
    name: "Petit four",
    hex: "#87c2d4",
    base: "ultra_pure_white",
  },
  {
    name: "Wan blue",
    hex: "#cbdcdf",
    base: "ultra_pure_white",
  },
  {
    name: "Whispering blue",
    hex: "#c9dcdc",
    base: "ultra_pure_white",
  },
  {
    name: "Skylight",
    hex: "#c8e0e0",
    base: "ultra_pure_white",
  },
  {
    name: "Aquatic",
    hex: "#99c1cc",
    base: "ultra_pure_white",
  },
  {
    name: "Marine blue",
    hex: "#76afb6",
    base: "ultra_pure_white",
  },
  {
    name: "Reef waters",
    hex: "#6f9fa9",
    base: "ultra_pure_white",
  },
  {
    name: "Arctic",
    hex: "#648589",
    base: "medium_base",
  },
  {
    name: "Chalk blue",
    hex: "#ccdad7",
    base: "ultra_pure_white",
  },
  {
    name: "Pale blue",
    hex: "#c4d6d3",
    base: "ultra_pure_white",
  },
  {
    name: "Misty blue",
    hex: "#bfcdcc",
    base: "ultra_pure_white",
  },
  {
    name: "Sky gray",
    hex: "#bcc8c6",
    base: "ultra_pure_white",
  },
  {
    name: "Surf spray",
    hex: "#b4c8c2",
    base: "ultra_pure_white",
  },
  {
    name: "Gray mist",
    hex: "#99aeae",
    base: "ultra_pure_white",
  },
  {
    name: "Aquifer",
    hex: "#89acac",
    base: "ultra_pure_white",
  },
  {
    name: "Blue glass",
    hex: "#c6e3e1",
    base: "ultra_pure_white",
  },
  {
    name: "Icy morn",
    hex: "#b0d3d1",
    base: "ultra_pure_white",
  },
  {
    name: "Canal blue",
    hex: "#9cc2c5",
    base: "ultra_pure_white",
  },
  {
    name: "Pastel turquoise",
    hex: "#99c5c4",
    base: "ultra_pure_white",
  },
  {
    name: "Aqua haze",
    hex: "#87b9bc",
    base: "ultra_pure_white",
  },
  {
    name: "Aqua sea",
    hex: "#6baaae",
    base: "ultra_pure_white",
  },
  {
    name: "Meadowbrook",
    hex: "#60a0a3",
    base: "ultra_pure_white",
  },
  {
    name: "Glacier",
    hex: "#c3dbd4",
    base: "ultra_pure_white",
  },
  {
    name: "Fair aqua",
    hex: "#b8e2dc",
    base: "ultra_pure_white",
  },
  {
    name: "Soothing sea",
    hex: "#c3e9e4",
    base: "ultra_pure_white",
  },
  {
    name: "Bleached aqua",
    hex: "#bce3df",
    base: "ultra_pure_white",
  },
  {
    name: "Blue light",
    hex: "#acdfdd",
    base: "ultra_pure_white",
  },
  {
    name: "Blue tint",
    hex: "#9fd9d7",
    base: "ultra_pure_white",
  },
  {
    name: "Aqua sky",
    hex: "#7bc4c4",
    base: "ultra_pure_white",
  },
  {
    name: "Morning mist",
    hex: "#cfdfdb",
    base: "ultra_pure_white",
  },
  {
    name: "Harbor gray",
    hex: "#a8c0bb",
    base: "ultra_pure_white",
  },
  {
    name: "Eggshell blue",
    hex: "#a3ccc9",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty turquoise",
    hex: "#649b9e",
    base: "ultra_pure_white",
  },
  {
    name: "Porcelain",
    hex: "#5d9ca4",
    base: "ultra_pure_white",
  },
  {
    name: "Brittany blue",
    hex: "#4c7e86",
    base: "medium_base",
  },
  {
    name: "Hydro",
    hex: "#426972",
    base: "medium_base",
  },
  {
    name: "Blue haze",
    hex: "#a5bcbb",
    base: "ultra_pure_white",
  },
  {
    name: "Nile blue",
    hex: "#76a7ab",
    base: "ultra_pure_white",
  },
  {
    name: "Mineral blue",
    hex: "#6d9192",
    base: "ultra_pure_white",
  },
  {
    name: "Bristol blue",
    hex: "#558f91",
    base: "medium_base",
  },
  {
    name: "Teal",
    hex: "#478589",
    base: "medium_base",
  },
  {
    name: "Blue spruce",
    hex: "#486b67",
    base: "medium_base",
  },
  {
    name: "Sagebrush green",
    hex: "#567572",
    base: "medium_base",
  },
  {
    name: "Green milieu",
    hex: "#8a9992",
    base: "ultra_pure_white",
  },
  {
    name: "Jadeite",
    hex: "#95a69f",
    base: "ultra_pure_white",
  },
  {
    name: "Blue surf",
    hex: "#90a8a4",
    base: "ultra_pure_white",
  },
  {
    name: "Oil blue",
    hex: "#658c88",
    base: "medium_base",
  },
  {
    name: "Trellis",
    hex: "#6a8988",
    base: "medium_base",
  },
  {
    name: "North atlantic",
    hex: "#536d70",
    base: "medium_base",
  },
  {
    name: "Sea pine",
    hex: "#4c6969",
    base: "medium_base",
  },
  {
    name: "Slate",
    hex: "#8c9fa1",
    base: "ultra_pure_white",
  },
  {
    name: "Silver blue",
    hex: "#8a9a9a",
    base: "ultra_pure_white",
  },
  {
    name: "Abyss",
    hex: "#8f9e9d",
    base: "ultra_pure_white",
  },
  {
    name: "Lead",
    hex: "#7a898f",
    base: "ultra_pure_white",
  },
  {
    name: "Stormy sea",
    hex: "#6e8082",
    base: "medium_base",
  },
  {
    name: "Trooper",
    hex: "#697a7e",
    base: "medium_base",
  },
  {
    name: "Goblin blue",
    hex: "#5f7278",
    base: "medium_base",
  },
  {
    name: "Slate gray",
    hex: "#8a9691",
    base: "ultra_pure_white",
  },
  {
    name: "Chinois green",
    hex: "#7c8c87",
    base: "ultra_pure_white",
  },
  {
    name: "Dark forest",
    hex: "#556962",
    base: "medium_base",
  },
  {
    name: "Balsam green",
    hex: "#576664",
    base: "medium_base",
  },
  {
    name: "Beetle",
    hex: "#55584c",
    base: "medium_base",
  },
  {
    name: "Urban chic",
    hex: "#464e4d",
    base: "medium_base",
  },
  {
    name: "Darkest spruce",
    hex: "#303d3c",
    base: "deep_base",
  },
  {
    name: "Mallard blue",
    hex: "#3a5c6e",
    base: "medium_base",
  },
  {
    name: "Celestial",
    hex: "#006380",
    base: "medium_base",
  },
  {
    name: "Saxony blue",
    hex: "#1f6680",
    base: "medium_base",
  },
  {
    name: "Lyons blue",
    hex: "#005871",
    base: "deep_base",
  },
  {
    name: "Ink blue",
    hex: "#0b5369",
    base: "deep_base",
  },
  {
    name: "Corsair",
    hex: "#18576c",
    base: "medium_base",
  },
  {
    name: "Legion blue",
    hex: "#1f495b",
    base: "deep_base",
  },
  {
    name: "Aegean blue",
    hex: "#4e6e81",
    base: "medium_base",
  },
  {
    name: "Bluesteel",
    hex: "#35637c",
    base: "medium_base",
  },
  {
    name: "Blue ashes",
    hex: "#3b5f78",
    base: "medium_base",
  },
  {
    name: "Midnight",
    hex: "#325b74",
    base: "medium_base",
  },
  {
    name: "Blue sapphire",
    hex: "#09577b",
    base: "medium_base",
  },
  {
    name: "Seaport",
    hex: "#005e7d",
    base: "medium_base",
  },
  {
    name: "Moroccan blue",
    hex: "#0f4e67",
    base: "deep_base",
  },
  {
    name: "Ocean depths",
    hex: "#006175",
    base: "medium_base",
  },
  {
    name: "Blue coral",
    hex: "#1b5366",
    base: "medium_base",
  },
  {
    name: "Dragonfly",
    hex: "#2a5c6a",
    base: "medium_base",
  },
  {
    name: "Pacific",
    hex: "#1f595c",
    base: "medium_base",
  },
  {
    name: "Balsam",
    hex: "#33565e",
    base: "medium_base",
  },
  {
    name: "Mediterranea",
    hex: "#32575d",
    base: "medium_base",
  },
  {
    name: "Atlantic deep",
    hex: "#274e55",
    base: "medium_base",
  },
  {
    name: "Aqua",
    hex: "#64a1ad",
    base: "ultra_pure_white",
  },
  {
    name: "Stillwater",
    hex: "#70a4b0",
    base: "ultra_pure_white",
  },
  {
    name: "Delphinium blue",
    hex: "#6198ae",
    base: "ultra_pure_white",
  },
  {
    name: "Larkspur",
    hex: "#3c7d90",
    base: "medium_base",
  },
  {
    name: "Storm blue",
    hex: "#47788a",
    base: "medium_base",
  },
  {
    name: "Tapestry",
    hex: "#436573",
    base: "medium_base",
  },
  {
    name: "Colonial blue",
    hex: "#2d6471",
    base: "medium_base",
  },
  {
    name: "Peacock blue",
    hex: "#00a0b0",
    base: "medium_base",
  },
  {
    name: "Capri breeze",
    hex: "#008799",
    base: "medium_base",
  },
  {
    name: "Algiers blue",
    hex: "#00859c",
    base: "medium_base",
  },
  {
    name: "Caneel bay",
    hex: "#00849f",
    base: "medium_base",
  },
  {
    name: "Caribbean sea",
    hex: "#00819d",
    base: "medium_base",
  },
  {
    name: "Mosaic blue",
    hex: "#00758f",
    base: "medium_base",
  },
  {
    name: "Turkish tile",
    hex: "#00698b",
    base: "medium_base",
  },
  {
    name: "Angel blue",
    hex: "#83c5cd",
    base: "ultra_pure_white",
  },
  {
    name: "Blue radiance",
    hex: "#58c9d4",
    base: "ultra_pure_white",
  },
  {
    name: "Capri",
    hex: "#44bbca",
    base: "ultra_pure_white",
  },
  {
    name: "Blue curacao",
    hex: "#32becc",
    base: "medium_base",
  },
  {
    name: "Scuba blue",
    hex: "#00abc0",
    base: "medium_base",
  },
  {
    name: "Bluebird",
    hex: "#009dae",
    base: "medium_base",
  },
  {
    name: "Enamel blue",
    hex: "#007a8e",
    base: "medium_base",
  },
  {
    name: "Pool blue",
    hex: "#67bcb3",
    base: "ultra_pure_white",
  },
  {
    name: "Blue turquoise",
    hex: "#53b0ae",
    base: "ultra_pure_white",
  },
  {
    name: "Baltic",
    hex: "#279d9f",
    base: "medium_base",
  },
  {
    name: "Lake blue",
    hex: "#008c96",
    base: "medium_base",
  },
  {
    name: "Tile blue",
    hex: "#008491",
    base: "medium_base",
  },
  {
    name: "Pagoda blue",
    hex: "#1a7f8e",
    base: "medium_base",
  },
  {
    name: "Biscay bay",
    hex: "#097988",
    base: "medium_base",
  },
  {
    name: "Aruba blue",
    hex: "#81d7d3",
    base: "ultra_pure_white",
  },
  {
    name: "Ceramic",
    hex: "#00aaa9",
    base: "medium_base",
  },
  {
    name: "Viridian green",
    hex: "#009499",
    base: "medium_base",
  },
  {
    name: "Tropical green",
    hex: "#008786",
    base: "medium_base",
  },
  {
    name: "Navigate",
    hex: "#008583",
    base: "medium_base",
  },
  {
    name: "Deep peacock blue",
    hex: "#008381",
    base: "medium_base",
  },
  {
    name: "Lapis",
    hex: "#008684",
    base: "medium_base",
  },
  {
    name: "Turquoise",
    hex: "#45b5aa",
    base: "ultra_pure_white",
  },
  {
    name: "Waterfall",
    hex: "#3ab0a2",
    base: "medium_base",
  },
  {
    name: "Lagoon",
    hex: "#4d9e9a",
    base: "medium_base",
  },
  {
    name: "Bright aqua",
    hex: "#30a299",
    base: "medium_base",
  },
  {
    name: "Porcelain green",
    hex: "#108780",
    base: "medium_base",
  },
  {
    name: "Blue grass",
    hex: "#007c7a",
    base: "medium_base",
  },
  {
    name: "Fanfare",
    hex: "#006d70",
    base: "medium_base",
  },
  {
    name: "Atlantis",
    hex: "#00af9f",
    base: "medium_base",
  },
  {
    name: "Pool green",
    hex: "#00af9d",
    base: "medium_base",
  },
  {
    name: "Dynasty green",
    hex: "#008e80",
    base: "medium_base",
  },
  {
    name: "Spectra green",
    hex: "#009b8c",
    base: "medium_base",
  },
  {
    name: "Columbia",
    hex: "#009288",
    base: "medium_base",
  },
  {
    name: "Teal blue",
    hex: "#007f7c",
    base: "medium_base",
  },
  {
    name: "Parasailing",
    hex: "#00736c",
    base: "medium_base",
  },
  {
    name: "Wasabi",
    hex: "#73a89e",
    base: "ultra_pure_white",
  },
  {
    name: "Beryl green",
    hex: "#619187",
    base: "medium_base",
  },
  {
    name: "Deep sea",
    hex: "#4f7c74",
    base: "medium_base",
  },
  {
    name: "Bottle green",
    hex: "#427d6d",
    base: "medium_base",
  },
  {
    name: "Galapagos green",
    hex: "#29685f",
    base: "medium_base",
  },
  {
    name: "Antique green",
    hex: "#29675c",
    base: "medium_base",
  },
  {
    name: "Storm",
    hex: "#035453",
    base: "deep_base",
  },
  {
    name: "Marine green",
    hex: "#40a48e",
    base: "medium_base",
  },
  {
    name: "Sea green",
    hex: "#149c88",
    base: "medium_base",
  },
  {
    name: "Greenlake",
    hex: "#007d69",
    base: "medium_base",
  },
  {
    name: "Tidepool",
    hex: "#0a6f69",
    base: "medium_base",
  },
  {
    name: "Ivy",
    hex: "#226c63",
    base: "medium_base",
  },
  {
    name: "Cadmium green",
    hex: "#00675b",
    base: "deep_base",
  },
  {
    name: "Alpine green",
    hex: "#005f56",
    base: "deep_base",
  },
  {
    name: "Canton",
    hex: "#6da29e",
    base: "ultra_pure_white",
  },
  {
    name: "Agate green",
    hex: "#599f99",
    base: "ultra_pure_white",
  },
  {
    name: "Sea blue",
    hex: "#549f98",
    base: "medium_base",
  },
  {
    name: "Latigo bay",
    hex: "#379190",
    base: "medium_base",
  },
  {
    name: "Green-blue slate",
    hex: "#358082",
    base: "medium_base",
  },
  {
    name: "Bayou",
    hex: "#20706f",
    base: "medium_base",
  },
  {
    name: "North sea",
    hex: "#316c6b",
    base: "medium_base",
  },
  {
    name: "Deep jungle",
    hex: "#36716f",
    base: "medium_base",
  },
  {
    name: "Everglade",
    hex: "#005b5d",
    base: "deep_base",
  },
  {
    name: "Teal green",
    hex: "#006361",
    base: "deep_base",
  },
  {
    name: "Harbor blue",
    hex: "#00656e",
    base: "deep_base",
  },
  {
    name: "Deep lake",
    hex: "#00656b",
    base: "deep_base",
  },
  {
    name: "Shaded spruce",
    hex: "#00585e",
    base: "deep_base",
  },
  {
    name: "Deep teal",
    hex: "#18454b",
    base: "deep_base",
  },
  {
    name: "Silver pine",
    hex: "#4e6866",
    base: "medium_base",
  },
  {
    name: "Mallard green",
    hex: "#405e5c",
    base: "medium_base",
  },
  {
    name: "Bistro green",
    hex: "#395551",
    base: "medium_base",
  },
  {
    name: "Jasper",
    hex: "#335959",
    base: "medium_base",
  },
  {
    name: "Bayberry",
    hex: "#255958",
    base: "medium_base",
  },
  {
    name: "June bug",
    hex: "#264a48",
    base: "deep_base",
  },
  {
    name: "Ponderosa pine",
    hex: "#203b3d",
    base: "deep_base",
  },
  {
    name: "Aqua glass",
    hex: "#d2e8e0",
    base: "ultra_pure_white",
  },
  {
    name: "Opal blue",
    hex: "#c3ddd6",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty aqua",
    hex: "#c0dccd",
    base: "ultra_pure_white",
  },
  {
    name: "Ocean wave",
    hex: "#8ec5b6",
    base: "ultra_pure_white",
  },
  {
    name: "Holiday",
    hex: "#81c3b4",
    base: "ultra_pure_white",
  },
  {
    name: "Cascade",
    hex: "#76c1b2",
    base: "ultra_pure_white",
  },
  {
    name: "Dusty jade green",
    hex: "#7bb5a3",
    base: "ultra_pure_white",
  },
  {
    name: "Honeydew",
    hex: "#bae1d3",
    base: "ultra_pure_white",
  },
  {
    name: "Brook green",
    hex: "#afddcc",
    base: "ultra_pure_white",
  },
  {
    name: "Cabbage",
    hex: "#87d7be",
    base: "ultra_pure_white",
  },
  {
    name: "Beveled glass",
    hex: "#7accb8",
    base: "ultra_pure_white",
  },
  {
    name: "Opal",
    hex: "#77cfb7",
    base: "ultra_pure_white",
  },
  {
    name: "Biscay green",
    hex: "#55c6a9",
    base: "ultra_pure_white",
  },
  {
    name: "Spearmint",
    hex: "#64bfa4",
    base: "ultra_pure_white",
  },
  {
    name: "Moonlight jade",
    hex: "#c7e5df",
    base: "ultra_pure_white",
  },
  {
    name: "Bay",
    hex: "#bae5d6",
    base: "ultra_pure_white",
  },
  {
    name: "Yucca",
    hex: "#a1d7c9",
    base: "ultra_pure_white",
  },
  {
    name: "Beach glass",
    hex: "#96dfce",
    base: "ultra_pure_white",
  },
  {
    name: "Ice green",
    hex: "#87d8c3",
    base: "ultra_pure_white",
  },
  {
    name: "Cockatoo",
    hex: "#58c8b6",
    base: "ultra_pure_white",
  },
  {
    name: "Florida keys",
    hex: "#56beab",
    base: "ultra_pure_white",
  },
  {
    name: "Bermuda",
    hex: "#60c9b3",
    base: "ultra_pure_white",
  },
  {
    name: "Electric green",
    hex: "#4bc3a8",
    base: "ultra_pure_white",
  },
  {
    name: "Aqua green",
    hex: "#00b89f",
    base: "medium_base",
  },
  {
    name: "Billiard",
    hex: "#00aa92",
    base: "medium_base",
  },
  {
    name: "Arcadia",
    hex: "#00a28a",
    base: "medium_base",
  },
  {
    name: "Alhambra",
    hex: "#008778",
    base: "medium_base",
  },
  {
    name: "Deep green",
    hex: "#009276",
    base: "medium_base",
  },
  {
    name: "Mint leaf",
    hex: "#00b694",
    base: "medium_base",
  },
  {
    name: "Peacock green",
    hex: "#00a78b",
    base: "medium_base",
  },
  {
    name: "Vivid green",
    hex: "#009e82",
    base: "medium_base",
  },
  {
    name: "Emerald",
    hex: "#009473",
    base: "medium_base",
  },
  {
    name: "Viridis",
    hex: "#00846b",
    base: "medium_base",
  },
  {
    name: "Shady glade",
    hex: "#006e5b",
    base: "deep_base",
  },
  {
    name: "Ultramarine green",
    hex: "#006b54",
    base: "deep_base",
  },
  {
    name: "Silt green",
    hex: "#a9bdb1",
    base: "ultra_pure_white",
  },
  {
    name: "Frosty green",
    hex: "#a3b5a6",
    base: "ultra_pure_white",
  },
  {
    name: "Iceberg green",
    hex: "#8c9c92",
    base: "ultra_pure_white",
  },
  {
    name: "Granite green",
    hex: "#86a293",
    base: "ultra_pure_white",
  },
  {
    name: "Green bay",
    hex: "#7e9285",
    base: "ultra_pure_white",
  },
  {
    name: "Lily pad",
    hex: "#818f84",
    base: "ultra_pure_white",
  },
  {
    name: "Laurel wreath",
    hex: "#616f65",
    base: "medium_base",
  },
  {
    name: "Green spruce",
    hex: "#589f7e",
    base: "medium_base",
  },
  {
    name: "Comfrey",
    hex: "#5b7961",
    base: "medium_base",
  },
  {
    name: "Dark ivy",
    hex: "#5b7763",
    base: "medium_base",
  },
  {
    name: "Foliage green",
    hex: "#3e6f58",
    base: "medium_base",
  },
  {
    name: "Myrtle",
    hex: "#4f6b58",
    base: "medium_base",
  },
  {
    name: "Posy green",
    hex: "#325b51",
    base: "medium_base",
  },
  {
    name: "Pineneedle",
    hex: "#334d41",
    base: "medium_base",
  },
  {
    name: "Sea spray",
    hex: "#717e6f",
    base: "medium_base",
  },
  {
    name: "Duck green",
    hex: "#53665c",
    base: "medium_base",
  },
  {
    name: "Frosty spruce",
    hex: "#578270",
    base: "medium_base",
  },
  {
    name: "Fir",
    hex: "#3a725f",
    base: "medium_base",
  },
  {
    name: "Evergreen",
    hex: "#11574a",
    base: "deep_base",
  },
  {
    name: "Hunter green",
    hex: "#335749",
    base: "medium_base",
  },
  {
    name: "Dark green",
    hex: "#314f40",
    base: "deep_base",
  },
  {
    name: "Feldspar",
    hex: "#729b8b",
    base: "ultra_pure_white",
  },
  {
    name: "Smoke pine",
    hex: "#3e6257",
    base: "medium_base",
  },
  {
    name: "Trekking green",
    hex: "#355048",
    base: "medium_base",
  },
  {
    name: "Garden topiary",
    hex: "#3e524b",
    base: "medium_base",
  },
  {
    name: "Jungle green",
    hex: "#3c4e47",
    base: "medium_base",
  },
  {
    name: "Sycamore",
    hex: "#35463d",
    base: "deep_base",
  },
  {
    name: "Green gables",
    hex: "#324241",
    base: "deep_base",
  },
  {
    name: "Vetiver",
    hex: "#807d6f",
    base: "medium_base",
  },
  {
    name: "Deep lichen green",
    hex: "#6e6e5c",
    base: "medium_base",
  },
  {
    name: "Thyme",
    hex: "#50574c",
    base: "medium_base",
  },
  {
    name: "Kombu green",
    hex: "#3a4032",
    base: "deep_base",
  },
  {
    name: "Deep forest",
    hex: "#37413a",
    base: "deep_base",
  },
  {
    name: "Forest night",
    hex: "#434237",
    base: "deep_base",
  },
  {
    name: "Rosin",
    hex: "#36362d",
    base: "deep_base",
  },
  {
    name: "Celadon",
    hex: "#b8ccba",
    base: "ultra_pure_white",
  },
  {
    name: "Pale aqua",
    hex: "#c1ccc2",
    base: "ultra_pure_white",
  },
  {
    name: "Smoke",
    hex: "#bfc8c3",
    base: "ultra_pure_white",
  },
  {
    name: "Foggy dew",
    hex: "#d1d5d0",
    base: "ultra_pure_white",
  },
  {
    name: "Mercury",
    hex: "#bac2ba",
    base: "ultra_pure_white",
  },
  {
    name: "Mineral gray",
    hex: "#b2b6ac",
    base: "ultra_pure_white",
  },
  {
    name: "Aqua gray",
    hex: "#a5b2aa",
    base: "ultra_pure_white",
  },
  {
    name: "Fairest jade",
    hex: "#d8e3d7",
    base: "ultra_pure_white",
  },
  {
    name: "Water lily",
    hex: "#dde3d5",
    base: "ultra_pure_white",
  },
  {
    name: "Canary green",
    hex: "#d6dec9",
    base: "ultra_pure_white",
  },
  {
    name: "Almost aqua",
    hex: "#cad3c1",
    base: "ultra_pure_white",
  },
  {
    name: "Green tint",
    hex: "#c5ccc0",
    base: "ultra_pure_white",
  },
  {
    name: "Sea foam",
    hex: "#b7c2b2",
    base: "ultra_pure_white",
  },
  {
    name: "Desert sage",
    hex: "#a7ae9e",
    base: "ultra_pure_white",
  },
  {
    name: "Whisper green",
    hex: "#e0e6d7",
    base: "ultra_pure_white",
  },
  {
    name: "Celadon tint",
    hex: "#cbcebe",
    base: "ultra_pure_white",
  },
  {
    name: "Dewkist",
    hex: "#c4d1c2",
    base: "ultra_pure_white",
  },
  {
    name: "Green lily",
    hex: "#c1cec1",
    base: "ultra_pure_white",
  },
  {
    name: "Cameo green",
    hex: "#aac0ad",
    base: "ultra_pure_white",
  },
  {
    name: "Seagrass",
    hex: "#959889",
    base: "ultra_pure_white",
  },
  {
    name: "Shadow",
    hex: "#888d82",
    base: "ultra_pure_white",
  },
  {
    name: "Clearly aqua",
    hex: "#cee1d4",
    base: "ultra_pure_white",
  },
  {
    name: "Misty jade",
    hex: "#bcd9c8",
    base: "ultra_pure_white",
  },
  {
    name: "Subtle green",
    hex: "#b5cbbb",
    base: "ultra_pure_white",
  },
  {
    name: "Aqua foam",
    hex: "#adc3b4",
    base: "ultra_pure_white",
  },
  {
    name: "Gossamer green",
    hex: "#b2cfbe",
    base: "ultra_pure_white",
  },
  {
    name: "Lichen",
    hex: "#9bc2b1",
    base: "ultra_pure_white",
  },
  {
    name: "Grayed jade",
    hex: "#9bbea9",
    base: "ultra_pure_white",
  },
  {
    name: "Milky green",
    hex: "#cfdbd1",
    base: "ultra_pure_white",
  },
  {
    name: "Phantom green",
    hex: "#dce4d7",
    base: "ultra_pure_white",
  },
  {
    name: "Mist green",
    hex: "#aacebc",
    base: "ultra_pure_white",
  },
  {
    name: "Bird's egg green",
    hex: "#aaccb9",
    base: "ultra_pure_white",
  },
  {
    name: "Bok choy",
    hex: "#bccab3",
    base: "ultra_pure_white",
  },
  {
    name: "Smoke green",
    hex: "#a8bba2",
    base: "ultra_pure_white",
  },
  {
    name: "Malachite green",
    hex: "#709a89",
    base: "ultra_pure_white",
  },
  {
    name: "Mistletoe",
    hex: "#8aa282",
    base: "ultra_pure_white",
  },
  {
    name: "Basil",
    hex: "#879f84",
    base: "ultra_pure_white",
  },
  {
    name: "Mineral green",
    hex: "#7a9b78",
    base: "ultra_pure_white",
  },
  {
    name: "Green eyes",
    hex: "#7d956d",
    base: "medium_base",
  },
  {
    name: "Turf green",
    hex: "#6f8c69",
    base: "medium_base",
  },
  {
    name: "Watercress",
    hex: "#748c69",
    base: "medium_base",
  },
  {
    name: "Elm green",
    hex: "#547053",
    base: "medium_base",
  },
  {
    name: "Hedge green",
    hex: "#768a75",
    base: "medium_base",
  },
  {
    name: "Loden frost",
    hex: "#788f74",
    base: "medium_base",
  },
  {
    name: "Shale green",
    hex: "#739072",
    base: "medium_base",
  },
  {
    name: "Kashmir",
    hex: "#6f8d6a",
    base: "medium_base",
  },
  {
    name: "Stone green",
    hex: "#658e67",
    base: "medium_base",
  },
  {
    name: "English ivy",
    hex: "#61845b",
    base: "medium_base",
  },
  {
    name: "Deep grass green",
    hex: "#558367",
    base: "medium_base",
  },
  {
    name: "Piquant green",
    hex: "#769358",
    base: "medium_base",
  },
  {
    name: "Forest green",
    hex: "#6b8d53",
    base: "medium_base",
  },
  {
    name: "Fluorite green",
    hex: "#699158",
    base: "medium_base",
  },
  {
    name: "Cactus",
    hex: "#53713d",
    base: "medium_base",
  },
  {
    name: "Garden green",
    hex: "#495e35",
    base: "medium_base",
  },
  {
    name: "Artichoke green",
    hex: "#4b6d41",
    base: "medium_base",
  },
  {
    name: "Willow bough",
    hex: "#59754d",
    base: "medium_base",
  },
  {
    name: "Aspen green",
    hex: "#7e9b76",
    base: "ultra_pure_white",
  },
  {
    name: "Medium green",
    hex: "#3c824e",
    base: "medium_base",
  },
  {
    name: "Juniper",
    hex: "#3d7245",
    base: "medium_base",
  },
  {
    name: "Fairway",
    hex: "#477050",
    base: "medium_base",
  },
  {
    name: "Vineyard green",
    hex: "#5f7355",
    base: "medium_base",
  },
  {
    name: "Dill",
    hex: "#6f7755",
    base: "medium_base",
  },
  {
    name: "Greener pastures",
    hex: "#37503d",
    base: "medium_base",
  },
  {
    name: "Four leaf clover",
    hex: "#616652",
    base: "medium_base",
  },
  {
    name: "Bronze green",
    hex: "#525f48",
    base: "medium_base",
  },
  {
    name: "Chive",
    hex: "#4a5335",
    base: "medium_base",
  },
  {
    name: "Cypress",
    hex: "#545a3e",
    base: "medium_base",
  },
  {
    name: "Black forest",
    hex: "#414f3c",
    base: "medium_base",
  },
  {
    name: "Rifle green",
    hex: "#414832",
    base: "deep_base",
  },
  {
    name: "Duffel bag",
    hex: "#394034",
    base: "deep_base",
  },
  {
    name: "Ambrosia",
    hex: "#d2e7ca",
    base: "ultra_pure_white",
  },
  {
    name: "Spray",
    hex: "#bed3bb",
    base: "ultra_pure_white",
  },
  {
    name: "Pastel green",
    hex: "#b4d3b2",
    base: "ultra_pure_white",
  },
  {
    name: "Hemlock",
    hex: "#97c1a1",
    base: "ultra_pure_white",
  },
  {
    name: "Sprucestone",
    hex: "#9fc09c",
    base: "ultra_pure_white",
  },
  {
    name: "Meadow",
    hex: "#8bba94",
    base: "ultra_pure_white",
  },
  {
    name: "Jadesheen",
    hex: "#77a276",
    base: "ultra_pure_white",
  },
  {
    name: "Green ash",
    hex: "#a0daa9",
    base: "ultra_pure_white",
  },
  {
    name: "Greengage",
    hex: "#8bc28c",
    base: "ultra_pure_white",
  },
  {
    name: "Ming",
    hex: "#7cb08a",
    base: "ultra_pure_white",
  },
  {
    name: "Zephyr green",
    hex: "#7cb083",
    base: "ultra_pure_white",
  },
  {
    name: "Peapod",
    hex: "#82b185",
    base: "ultra_pure_white",
  },
  {
    name: "Light grass green",
    hex: "#7cb68e",
    base: "ultra_pure_white",
  },
  {
    name: "Absinthe green",
    hex: "#76b583",
    base: "ultra_pure_white",
  },
  {
    name: "Neptune green",
    hex: "#7fbb9e",
    base: "ultra_pure_white",
  },
  {
    name: "Creme de menthe",
    hex: "#70a38d",
    base: "ultra_pure_white",
  },
  {
    name: "Winter green",
    hex: "#4f9e81",
    base: "medium_base",
  },
  {
    name: "Gumdrop green",
    hex: "#2ea785",
    base: "medium_base",
  },
  {
    name: "Holly green",
    hex: "#0f9d76",
    base: "medium_base",
  },
  {
    name: "Parakeet",
    hex: "#008c69",
    base: "medium_base",
  },
  {
    name: "Golf green",
    hex: "#008763",
    base: "medium_base",
  },
  {
    name: "Spring bud",
    hex: "#6bcd9c",
    base: "ultra_pure_white",
  },
  {
    name: "Katydid",
    hex: "#66bc91",
    base: "ultra_pure_white",
  },
  {
    name: "Jade cream",
    hex: "#60b892",
    base: "ultra_pure_white",
  },
  {
    name: "Ming green",
    hex: "#3aa278",
    base: "medium_base",
  },
  {
    name: "Greenbriar",
    hex: "#4b9b69",
    base: "medium_base",
  },
  {
    name: "Leprechaun",
    hex: "#378661",
    base: "medium_base",
  },
  {
    name: "Pine green",
    hex: "#3a795e",
    base: "medium_base",
  },
  {
    name: "Blarney",
    hex: "#00a776",
    base: "medium_base",
  },
  {
    name: "Mint",
    hex: "#00a170",
    base: "medium_base",
  },
  {
    name: "Deep mint",
    hex: "#009e6d",
    base: "medium_base",
  },
  {
    name: "Simply green",
    hex: "#009b75",
    base: "medium_base",
  },
  {
    name: "Pepper green",
    hex: "#007d60",
    base: "medium_base",
  },
  {
    name: "Bosphorus",
    hex: "#007558",
    base: "deep_base",
  },
  {
    name: "Verdant green",
    hex: "#12674a",
    base: "deep_base",
  },
  {
    name: "Seacrest",
    hex: "#bfd1b3",
    base: "ultra_pure_white",
  },
  {
    name: "Gleam",
    hex: "#bfd1ad",
    base: "ultra_pure_white",
  },
  {
    name: "Nile green",
    hex: "#a7c796",
    base: "ultra_pure_white",
  },
  {
    name: "Quiet green",
    hex: "#9ebc97",
    base: "ultra_pure_white",
  },
  {
    name: "Fair green",
    hex: "#92af88",
    base: "ultra_pure_white",
  },
  {
    name: "Forest shade",
    hex: "#91ac80",
    base: "ultra_pure_white",
  },
  {
    name: "Jade green",
    hex: "#759465",
    base: "medium_base",
  },
  {
    name: "Patina green",
    hex: "#b9eab3",
    base: "ultra_pure_white",
  },
  {
    name: "Pistachio green",
    hex: "#a9d39e",
    base: "ultra_pure_white",
  },
  {
    name: "Arcadian green",
    hex: "#a3c893",
    base: "ultra_pure_white",
  },
  {
    name: "Grass green",
    hex: "#7bb369",
    base: "ultra_pure_white",
  },
  {
    name: "Bud green",
    hex: "#79b465",
    base: "ultra_pure_white",
  },
  {
    name: "Green tea",
    hex: "#86a96f",
    base: "ultra_pure_white",
  },
  {
    name: "Tendril",
    hex: "#89a06b",
    base: "ultra_pure_white",
  },
  {
    name: "Paradise green",
    hex: "#b2e79f",
    base: "ultra_pure_white",
  },
  {
    name: "Lime green",
    hex: "#9fc131",
    base: "medium_base",
  },
  {
    name: "Jasmine green",
    hex: "#7ec845",
    base: "medium_base",
  },
  {
    name: "Green flash",
    hex: "#79c753",
    base: "medium_base",
  },
  {
    name: "Classic green",
    hex: "#39a845",
    base: "medium_base",
  },
  {
    name: "Online lime",
    hex: "#44883c",
    base: "medium_base",
  },
  {
    name: "Treetop",
    hex: "#476a30",
    base: "medium_base",
  },
  {
    name: "Summer green",
    hex: "#7ed37f",
    base: "ultra_pure_white",
  },
  {
    name: "Spring bouquet",
    hex: "#6dce87",
    base: "ultra_pure_white",
  },
  {
    name: "Island green",
    hex: "#2bae66",
    base: "medium_base",
  },
  {
    name: "Irish green",
    hex: "#45be76",
    base: "medium_base",
  },
  {
    name: "Shamrock",
    hex: "#6fa26b",
    base: "medium_base",
  },
  {
    name: "Peppermint",
    hex: "#699e6d",
    base: "medium_base",
  },
  {
    name: "Mint green",
    hex: "#487d49",
    base: "medium_base",
  },
  {
    name: "Poison green",
    hex: "#4db560",
    base: "medium_base",
  },
  {
    name: "Vibrant green",
    hex: "#55a860",
    base: "medium_base",
  },
  {
    name: "Kelly green",
    hex: "#339c5e",
    base: "medium_base",
  },
  {
    name: "Bright green",
    hex: "#009b5c",
    base: "medium_base",
  },
  {
    name: "Fern green",
    hex: "#008c45",
    base: "deep_base",
  },
  {
    name: "Jelly bean",
    hex: "#008658",
    base: "medium_base",
  },
  {
    name: "Amazon",
    hex: "#1f7349",
    base: "medium_base",
  },
  {
    name: "Green glow",
    hex: "#b0c965",
    base: "ultra_pure_white",
  },
  {
    name: "Bright lime green",
    hex: "#97bc62",
    base: "ultra_pure_white",
  },
  {
    name: "Greenery",
    hex: "#88b04b",
    base: "medium_base",
  },
  {
    name: "Foliage",
    hex: "#75a14f",
    base: "medium_base",
  },
  {
    name: "Peridot",
    hex: "#819548",
    base: "medium_base",
  },
  {
    name: "Meadow green",
    hex: "#739957",
    base: "medium_base",
  },
  {
    name: "Woodbine",
    hex: "#7b7f32",
    base: "medium_base",
  },
  {
    name: "Jade lime",
    hex: "#a1ca7b",
    base: "ultra_pure_white",
  },
  {
    name: "Herbal garden",
    hex: "#9cad60",
    base: "ultra_pure_white",
  },
  {
    name: "Leaf green",
    hex: "#9faf6c",
    base: "ultra_pure_white",
  },
  {
    name: "Parrot green",
    hex: "#8db051",
    base: "medium_base",
  },
  {
    name: "Dark citron",
    hex: "#a0ac4f",
    base: "ultra_pure_white",
  },
  {
    name: "Macaw green",
    hex: "#9bb53e",
    base: "medium_base",
  },
  {
    name: "Kiwi",
    hex: "#7aab55",
    base: "medium_base",
  },
  {
    name: "Sharp green",
    hex: "#c6ec7a",
    base: "ultra_pure_white",
  },
  {
    name: "Daiquiri green",
    hex: "#c9d77e",
    base: "ultra_pure_white",
  },
  {
    name: "Wild lime",
    hex: "#c3d363",
    base: "ultra_pure_white",
  },
  {
    name: "Linden green",
    hex: "#c4bf71",
    base: "ultra_pure_white",
  },
  {
    name: "Bright chartreuse",
    hex: "#b5bf50",
    base: "ultra_pure_white",
  },
  {
    name: "Tender shoots",
    hex: "#b5cc39",
    base: "ultra_pure_white",
  },
  {
    name: "Lime punch",
    hex: "#c0d725",
    base: "medium_base",
  },
  {
    name: "Sunny lime",
    hex: "#dfef87",
    base: "ultra_pure_white",
  },
  {
    name: "Limeade",
    hex: "#d3d95f",
    base: "ultra_pure_white",
  },
  {
    name: "Sulphur spring",
    hex: "#d5d717",
    base: "medium_base",
  },
  {
    name: "Citronelle",
    hex: "#b8af23",
    base: "medium_base",
  },
  {
    name: "Apple green",
    hex: "#b5b644",
    base: "ultra_pure_white",
  },
  {
    name: "Warm olive",
    hex: "#c7b63c",
    base: "ultra_pure_white",
  },
  {
    name: "Antique moss",
    hex: "#b9a023",
    base: "medium_base",
  },
  {
    name: "Lime cream",
    hex: "#d7e8bc",
    base: "ultra_pure_white",
  },
  {
    name: "Shadow lime",
    hex: "#cfe09d",
    base: "ultra_pure_white",
  },
  {
    name: "Lime sherbet",
    hex: "#cdd78a",
    base: "ultra_pure_white",
  },
  {
    name: "Lettuce green",
    hex: "#bed38e",
    base: "ultra_pure_white",
  },
  {
    name: "Sap green",
    hex: "#afcb80",
    base: "ultra_pure_white",
  },
  {
    name: "Opaline green",
    hex: "#a3c57d",
    base: "ultra_pure_white",
  },
  {
    name: "Winter pear",
    hex: "#b0b487",
    base: "ultra_pure_white",
  },
  {
    name: "Sylvan green",
    hex: "#e7eacb",
    base: "ultra_pure_white",
  },
  {
    name: "Glass green",
    hex: "#ecead0",
    base: "ultra_pure_white",
  },
  {
    name: "Green essence",
    hex: "#e9eac8",
    base: "ultra_pure_white",
  },
  {
    name: "Ethereal green",
    hex: "#f1ecca",
    base: "ultra_pure_white",
  },
  {
    name: "Garden glade",
    hex: "#dcd8a8",
    base: "ultra_pure_white",
  },
  {
    name: "Hay",
    hex: "#d3cca3",
    base: "ultra_pure_white",
  },
  {
    name: "Pale green",
    hex: "#cbce91",
    base: "ultra_pure_white",
  },
  {
    name: "Young wheat",
    hex: "#e1e3a9",
    base: "ultra_pure_white",
  },
  {
    name: "Citron",
    hex: "#dfde9b",
    base: "ultra_pure_white",
  },
  {
    name: "Luminary green",
    hex: "#e3eaa5",
    base: "ultra_pure_white",
  },
  {
    name: "Pale lime yellow",
    hex: "#dfe69f",
    base: "ultra_pure_white",
  },
  {
    name: "Chardonnay",
    hex: "#e7df99",
    base: "ultra_pure_white",
  },
  {
    name: "Lima bean",
    hex: "#e1d590",
    base: "ultra_pure_white",
  },
  {
    name: "Charlock",
    hex: "#e5e790",
    base: "ultra_pure_white",
  },
  {
    name: "Mellow green",
    hex: "#d5d593",
    base: "ultra_pure_white",
  },
  {
    name: "Shadow green",
    hex: "#cfc486",
    base: "ultra_pure_white",
  },
  {
    name: "Celery green",
    hex: "#c5cc7b",
    base: "ultra_pure_white",
  },
  {
    name: "Green banana",
    hex: "#babc72",
    base: "ultra_pure_white",
  },
  {
    name: "Green oasis",
    hex: "#b0b454",
    base: "ultra_pure_white",
  },
  {
    name: "Leek green",
    hex: "#b7b17a",
    base: "ultra_pure_white",
  },
  {
    name: "Weeping willow",
    hex: "#b3b17b",
    base: "ultra_pure_white",
  },
  {
    name: "Palm",
    hex: "#afaf5e",
    base: "ultra_pure_white",
  },
  {
    name: "Golden olive",
    hex: "#af9841",
    base: "medium_base",
  },
  {
    name: "Oasis",
    hex: "#a3a04e",
    base: "medium_base",
  },
  {
    name: "Moss",
    hex: "#a09d59",
    base: "ultra_pure_white",
  },
  {
    name: "Amber green",
    hex: "#9a803a",
    base: "medium_base",
  },
  {
    name: "Ecru olive",
    hex: "#927b3c",
    base: "medium_base",
  },
  {
    name: "Green moss",
    hex: "#857946",
    base: "medium_base",
  },
  {
    name: "Khaki",
    hex: "#a39264",
    base: "ultra_pure_white",
  },
  {
    name: "Fennel seed",
    hex: "#998456",
    base: "medium_base",
  },
  {
    name: "Willow",
    hex: "#9a8b4f",
    base: "medium_base",
  },
  {
    name: "Bronze mist",
    hex: "#9c7e41",
    base: "medium_base",
  },
  {
    name: "Dried tobacco",
    hex: "#997b38",
    base: "medium_base",
  },
  {
    name: "Tapenade",
    hex: "#805d24",
    base: "medium_base",
  },
  {
    name: "Plantation",
    hex: "#7a6332",
    base: "medium_base",
  },
  {
    name: "Fog green",
    hex: "#c2cbb4",
    base: "ultra_pure_white",
  },
  {
    name: "Tender greens",
    hex: "#c5cfb6",
    base: "ultra_pure_white",
  },
  {
    name: "Aloe wash",
    hex: "#d0d3b7",
    base: "ultra_pure_white",
  },
  {
    name: "Celadon green",
    hex: "#b5c1a5",
    base: "ultra_pure_white",
  },
  {
    name: "Laurel green",
    hex: "#adbba1",
    base: "ultra_pure_white",
  },
  {
    name: "Swamp",
    hex: "#a8b197",
    base: "ultra_pure_white",
  },
  {
    name: "Reseda",
    hex: "#a1ad92",
    base: "ultra_pure_white",
  },
  {
    name: "Meadow mist",
    hex: "#d3dec4",
    base: "ultra_pure_white",
  },
  {
    name: "Butterfly",
    hex: "#cadea5",
    base: "ultra_pure_white",
  },
  {
    name: "White jade",
    hex: "#d4dbb2",
    base: "ultra_pure_white",
  },
  {
    name: "Seafoam green",
    hex: "#cbd5b1",
    base: "ultra_pure_white",
  },
  {
    name: "Reed",
    hex: "#c3d3a8",
    base: "ultra_pure_white",
  },
  {
    name: "Seedling",
    hex: "#c0cba1",
    base: "ultra_pure_white",
  },
  {
    name: "Foam green",
    hex: "#b4c79c",
    base: "ultra_pure_white",
  },
  {
    name: "Lily green",
    hex: "#c5cf98",
    base: "ultra_pure_white",
  },
  {
    name: "Beechnut",
    hex: "#c2c18d",
    base: "ultra_pure_white",
  },
  {
    name: "Nile",
    hex: "#b4bb85",
    base: "ultra_pure_white",
  },
  {
    name: "Sweet pea",
    hex: "#a3a969",
    base: "ultra_pure_white",
  },
  {
    name: "Spinach green",
    hex: "#909b4c",
    base: "medium_base",
  },
  {
    name: "Fern",
    hex: "#9aa067",
    base: "ultra_pure_white",
  },
  {
    name: "Green olive",
    hex: "#8d8b55",
    base: "medium_base",
  },
  {
    name: "Epsom",
    hex: "#849161",
    base: "medium_base",
  },
  {
    name: "Grasshopper",
    hex: "#77824a",
    base: "medium_base",
  },
  {
    name: "Turtle green",
    hex: "#81894e",
    base: "medium_base",
  },
  {
    name: "Calliste green",
    hex: "#757a4e",
    base: "medium_base",
  },
  {
    name: "Calla green",
    hex: "#6a6f34",
    base: "medium_base",
  },
  {
    name: "Cedar green",
    hex: "#5e6737",
    base: "medium_base",
  },
  {
    name: "Pesto",
    hex: "#595f34",
    base: "medium_base",
  },
  {
    name: "Tarragon",
    hex: "#a4ae77",
    base: "ultra_pure_white",
  },
  {
    name: "Sage",
    hex: "#91946e",
    base: "ultra_pure_white",
  },
  {
    name: "Iguana",
    hex: "#818455",
    base: "medium_base",
  },
  {
    name: "Oil green",
    hex: "#80856d",
    base: "medium_base",
  },
  {
    name: "Loden green",
    hex: "#6e7153",
    base: "medium_base",
  },
  {
    name: "Capulet olive",
    hex: "#656344",
    base: "medium_base",
  },
  {
    name: "Olivine",
    hex: "#666b54",
    base: "medium_base",
  },
  {
    name: "Lint",
    hex: "#b6ba99",
    base: "ultra_pure_white",
  },
  {
    name: "Pale olive green",
    hex: "#b5ad88",
    base: "ultra_pure_white",
  },
  {
    name: "Sage green",
    hex: "#b2ac88",
    base: "ultra_pure_white",
  },
  {
    name: "Gray green",
    hex: "#a49a79",
    base: "ultra_pure_white",
  },
  {
    name: "Sponge",
    hex: "#a49775",
    base: "ultra_pure_white",
  },
  {
    name: "Mermaid",
    hex: "#817a65",
    base: "medium_base",
  },
  {
    name: "Dusky green",
    hex: "#746c57",
    base: "medium_base",
  },
  {
    name: "Tea",
    hex: "#999b85",
    base: "ultra_pure_white",
  },
  {
    name: "Silver sage",
    hex: "#938b78",
    base: "ultra_pure_white",
  },
  {
    name: "Slate green",
    hex: "#a0987c",
    base: "ultra_pure_white",
  },
  {
    name: "Elm",
    hex: "#a39f86",
    base: "ultra_pure_white",
  },
  {
    name: "Mosstone",
    hex: "#858961",
    base: "medium_base",
  },
  {
    name: "Aloe",
    hex: "#817a60",
    base: "medium_base",
  },
  {
    name: "Olive drab",
    hex: "#756d47",
    base: "medium_base",
  },
  {
    name: "Cedar",
    hex: "#928e64",
    base: "ultra_pure_white",
  },
  {
    name: "Boa",
    hex: "#8e855f",
    base: "medium_base",
  },
  {
    name: "Dried herb",
    hex: "#847a59",
    base: "medium_base",
  },
  {
    name: "Olive branch",
    hex: "#646a45",
    base: "medium_base",
  },
  {
    name: "Lizard",
    hex: "#71643e",
    base: "medium_base",
  },
  {
    name: "Avocado",
    hex: "#676232",
    base: "medium_base",
  },
  {
    name: "Fir green",
    hex: "#67592a",
    base: "medium_base",
  },
  {
    name: "Bog",
    hex: "#bab696",
    base: "ultra_pure_white",
  },
  {
    name: "Elmwood",
    hex: "#8c7c61",
    base: "medium_base",
  },
  {
    name: "Gothic olive",
    hex: "#7c6e4f",
    base: "medium_base",
  },
  {
    name: "Butternut",
    hex: "#7a643f",
    base: "medium_base",
  },
  {
    name: "Nutria",
    hex: "#75663e",
    base: "medium_base",
  },
  {
    name: "Military olive",
    hex: "#63563b",
    base: "medium_base",
  },
  {
    name: "Dark olive",
    hex: "#574d35",
    base: "medium_base",
  },
  {
    name: "Moss gray",
    hex: "#afab97",
    base: "ultra_pure_white",
  },
  {
    name: "Abbey stone",
    hex: "#aba798",
    base: "ultra_pure_white",
  },
  {
    name: "Burnt olive",
    hex: "#646049",
    base: "medium_base",
  },
  {
    name: "Dusty olive",
    hex: "#646356",
    base: "medium_base",
  },
  {
    name: "Ivy green",
    hex: "#585442",
    base: "medium_base",
  },
  {
    name: "Olive night",
    hex: "#535040",
    base: "medium_base",
  },
  {
    name: "Grape leaf",
    hex: "#545144",
    base: "medium_base",
  },
  {
    name: "Porpoise",
    hex: "#a7a19e",
    base: "ultra_pure_white",
  },
  {
    name: "Satellite",
    hex: "#9f8d89",
    base: "ultra_pure_white",
  },
  {
    name: "Driftwood",
    hex: "#847a75",
    base: "medium_base",
  },
  {
    name: "Falcon",
    hex: "#6d625b",
    base: "medium_base",
  },
  {
    name: "Morel",
    hex: "#685c53",
    base: "medium_base",
  },
  {
    name: "Fallen rock",
    hex: "#807669",
    base: "medium_base",
  },
  {
    name: "Vintage khaki",
    hex: "#9a9186",
    base: "ultra_pure_white",
  },
  {
    name: "Crockery",
    hex: "#a49887",
    base: "ultra_pure_white",
  },
  {
    name: "Greige",
    hex: "#928475",
    base: "ultra_pure_white",
  },
  {
    name: "Desert taupe",
    hex: "#8d7e71",
    base: "medium_base",
  },
  {
    name: "White pepper",
    hex: "#b6a893",
    base: "ultra_pure_white",
  },
  {
    name: "Humus",
    hex: "#b7a793",
    base: "ultra_pure_white",
  },
  {
    name: "Portabella",
    hex: "#937b6a",
    base: "medium_base",
  },
  {
    name: "Caribou",
    hex: "#816d5e",
    base: "medium_base",
  },
  {
    name: "Travertine",
    hex: "#ae997d",
    base: "ultra_pure_white",
  },
  {
    name: "Starfish",
    hex: "#b09a77",
    base: "ultra_pure_white",
  },
  {
    name: "Semolina",
    hex: "#ceb899",
    base: "ultra_pure_white",
  },
  {
    name: "Curds & whey",
    hex: "#bca483",
    base: "ultra_pure_white",
  },
  {
    name: "Tiger's eye",
    hex: "#977c61",
    base: "medium_base",
  },
  {
    name: "Toasted coconut",
    hex: "#8b6a4f",
    base: "medium_base",
  },
  {
    name: "Rain drum",
    hex: "#5f4c40",
    base: "medium_base",
  },
  {
    name: "Pear sorbet",
    hex: "#f3eac3",
    base: "ultra_pure_white",
  },
  {
    name: "Pineapple slice",
    hex: "#e7d391",
    base: "ultra_pure_white",
  },
  {
    name: "Yarrow",
    hex: "#face6d",
    base: "ultra_pure_white",
  },
  {
    name: "Anise flower",
    hex: "#f4e3b5",
    base: "ultra_pure_white",
  },
  {
    name: "Flan",
    hex: "#f6e3b4",
    base: "ultra_pure_white",
  },
  {
    name: "Sundress",
    hex: "#ebcf89",
    base: "ultra_pure_white",
  },
  {
    name: "Macadamia",
    hex: "#e4cfb6",
    base: "ultra_pure_white",
  },
  {
    name: "Lemon meringue",
    hex: "#f6e199",
    base: "ultra_pure_white",
  },
  {
    name: "Yellow iris",
    hex: "#eee78e",
    base: "ultra_pure_white",
  },
  {
    name: "Goldfinch",
    hex: "#f8dc6c",
    base: "ultra_pure_white",
  },
  {
    name: "Lemon zest",
    hex: "#f9d857",
    base: "ultra_pure_white",
  },
  {
    name: "Solar power",
    hex: "#f4bf3a",
    base: "ultra_pure_white",
  },
  {
    name: "Samoan sun",
    hex: "#fbc85f",
    base: "ultra_pure_white",
  },
  {
    name: "Desert sun",
    hex: "#c87629",
    base: "medium_base",
  },
  {
    name: "Pumpkin spice",
    hex: "#a05c17",
    base: "medium_base",
  },
  {
    name: "Orange pepper",
    hex: "#df7500",
    base: "medium_base",
  },
  {
    name: "Marmalade",
    hex: "#c16512",
    base: "medium_base",
  },
  {
    name: "Hawaiian sunset",
    hex: "#bb5c14",
    base: "medium_base",
  },
  {
    name: "Autumnal",
    hex: "#a15325",
    base: "medium_base",
  },
  {
    name: "Umber",
    hex: "#944a1f",
    base: "medium_base",
  },
  {
    name: "Exuberance",
    hex: "#e86800",
    base: "medium_base",
  },
  {
    name: "Puffin's bill",
    hex: "#e95c20",
    base: "medium_base",
  },
  {
    name: "Caramel cafe",
    hex: "#864c24",
    base: "medium_base",
  },
  {
    name: "Gold flame",
    hex: "#b45422",
    base: "medium_base",
  },
  {
    name: "Cinnamon stick",
    hex: "#9b4722",
    base: "medium_base",
  },
  {
    name: "Potter's clay",
    hex: "#9e4624",
    base: "medium_base",
  },
  {
    name: "Rooibos tea",
    hex: "#a23c26",
    base: "medium_base",
  },
  {
    name: "Celosia orange",
    hex: "#e8703a",
    base: "medium_base",
  },
  {
    name: "Orangeade",
    hex: "#e2552c",
    base: "medium_base",
  },
  {
    name: "Pureed pumpkin",
    hex: "#c34121",
    base: "medium_base",
  },
  {
    name: "Tangerine tango",
    hex: "#dd4124",
    base: "medium_base",
  },
  {
    name: "Poinciana",
    hex: "#ca3422",
    base: "medium_base",
  },
  {
    name: "Koi",
    hex: "#d15837",
    base: "medium_base",
  },
  {
    name: "Samba",
    hex: "#a2242f",
    base: "medium_base",
  },
  {
    name: "Barbados cherry",
    hex: "#aa0a27",
    base: "deep_base",
  },
  {
    name: "Haute red",
    hex: "#a11729",
    base: "medium_base",
  },
  {
    name: "Salsa",
    hex: "#aa182b",
    base: "medium_base",
  },
  {
    name: "Scarlet sage",
    hex: "#9d202f",
    base: "medium_base",
  },
  {
    name: "Scooter",
    hex: "#941e32",
    base: "medium_base",
  },
  {
    name: "Red dahlia",
    hex: "#7d2027",
    base: "deep_base",
  },
  {
    name: "Sun-dried tomato",
    hex: "#752329",
    base: "deep_base",
  },
  {
    name: "Fired brick",
    hex: "#6a2e2a",
    base: "deep_base",
  },
  {
    name: "Rhubarb",
    hex: "#77202f",
    base: "deep_base",
  },
  {
    name: "Syrah",
    hex: "#6a282c",
    base: "deep_base",
  },
  {
    name: "Pomegranate",
    hex: "#6c2831",
    base: "deep_base",
  },
  {
    name: "Cabernet",
    hex: "#64242e",
    base: "deep_base",
  },
  {
    name: "Ballerina",
    hex: "#f2cfdc",
    base: "ultra_pure_white",
  },
  {
    name: "Fairy tale",
    hex: "#f2c1d1",
    base: "ultra_pure_white",
  },
  {
    name: "Etherea",
    hex: "#a5958f",
    base: "ultra_pure_white",
  },
  {
    name: "Foxglove",
    hex: "#b98391",
    base: "ultra_pure_white",
  },
  {
    name: "Mesa rose",
    hex: "#a66e7a",
    base: "ultra_pure_white",
  },
  {
    name: "Jazzy",
    hex: "#b61c50",
    base: "medium_base",
  },
  {
    name: "Granita",
    hex: "#a52350",
    base: "medium_base",
  },
  {
    name: "Cherries jubilee",
    hex: "#a22452",
    base: "medium_base",
  },
  {
    name: "Cabaret",
    hex: "#cb3373",
    base: "medium_base",
  },
  {
    name: "Vivacious",
    hex: "#a32857",
    base: "medium_base",
  },
  {
    name: "Bellflower",
    hex: "#9469a2",
    base: "ultra_pure_white",
  },
  {
    name: "English lavendar",
    hex: "#9d7bb0",
    base: "ultra_pure_white",
  },
  {
    name: "Rhapsody",
    hex: "#9f86aa",
    base: "ultra_pure_white",
  },
  {
    name: "Acai",
    hex: "#46295a",
    base: "medium_base",
  },
  {
    name: "Tillandsia purple",
    hex: "#563474",
    base: "medium_base",
  },
  {
    name: "Picasso lily",
    hex: "#634878",
    base: "medium_base",
  },
  {
    name: "Mystical",
    hex: "#5f4e72",
    base: "medium_base",
  },
  {
    name: "Icelandic blue",
    hex: "#a9adc2",
    base: "ultra_pure_white",
  },
  {
    name: "Aleutian",
    hex: "#9a9eb3",
    base: "ultra_pure_white",
  },
  {
    name: "Silver bullet",
    hex: "#81839a",
    base: "ultra_pure_white",
  },
  {
    name: "Blue granite",
    hex: "#717388",
    base: "medium_base",
  },
  {
    name: "Evening blue",
    hex: "#2a293e",
    base: "deep_base",
  },
  {
    name: "Deep well",
    hex: "#2c2a33",
    base: "deep_base",
  },
  {
    name: "Night sky",
    hex: "#2a2a35",
    base: "deep_base",
  },
  {
    name: "Blue heron",
    hex: "#96a3c7",
    base: "ultra_pure_white",
  },
  {
    name: "Hydrangea",
    hex: "#849bcc",
    base: "ultra_pure_white",
  },
  {
    name: "Xenon blue",
    hex: "#b7c0d7",
    base: "ultra_pure_white",
  },
  {
    name: "Brunnera blue",
    hex: "#9ba9ca",
    base: "ultra_pure_white",
  },
  {
    name: "Sky captain",
    hex: "#262934",
    base: "deep_base",
  },
  {
    name: "Navy blazer",
    hex: "#282d3c",
    base: "deep_base",
  },
  {
    name: "Dark sapphire",
    hex: "#262b37",
    base: "deep_base",
  },
  {
    name: "Plein air",
    hex: "#bfcad6",
    base: "ultra_pure_white",
  },
  {
    name: "Halogen blue",
    hex: "#bdc6dc",
    base: "ultra_pure_white",
  },
  {
    name: "Chambray blue",
    hex: "#9eb4d3",
    base: "ultra_pure_white",
  },
  {
    name: "Bel air blue",
    hex: "#819ac1",
    base: "ultra_pure_white",
  },
  {
    name: "Vintage indigo",
    hex: "#4a556b",
    base: "medium_base",
  },
  {
    name: "Sodalite blue",
    hex: "#253668",
    base: "deep_base",
  },
  {
    name: "Parisian night",
    hex: "#323441",
    base: "deep_base",
  },
  {
    name: "Monaco blue",
    hex: "#274374",
    base: "medium_base",
  },
  {
    name: "Vallarta blue",
    hex: "#30658e",
    base: "medium_base",
  },
  {
    name: "Salute",
    hex: "#282b34",
    base: "deep_base",
  },
  {
    name: "Outer space",
    hex: "#2f3441",
    base: "deep_base",
  },
  {
    name: "Blueberry",
    hex: "#2c333e",
    base: "deep_base",
  },
  {
    name: "Carbon",
    hex: "#272f38",
    base: "deep_base",
  },
  {
    name: "Vulcan",
    hex: "#2d3036",
    base: "deep_base",
  },
  {
    name: "Omphalodes",
    hex: "#b5cedf",
    base: "ultra_pure_white",
  },
  {
    name: "Cool blue",
    hex: "#a5c5d9",
    base: "ultra_pure_white",
  },
  {
    name: "Bering sea",
    hex: "#4b5b6e",
    base: "medium_base",
  },
  {
    name: "Blue wing teal",
    hex: "#2c4053",
    base: "deep_base",
  },
  {
    name: "Poseidon",
    hex: "#123955",
    base: "deep_base",
  },
  {
    name: "Mykonos blue",
    hex: "#005780",
    base: "medium_base",
  },
  {
    name: "Reflecting pond",
    hex: "#203e4a",
    base: "deep_base",
  },
  {
    name: "Corydalis blue",
    hex: "#a9cada",
    base: "ultra_pure_white",
  },
  {
    name: "Blue topaz",
    hex: "#78bdd4",
    base: "ultra_pure_white",
  },
  {
    name: "Gulf stream",
    hex: "#88c3d0",
    base: "ultra_pure_white",
  },
  {
    name: "Aquarelle",
    hex: "#61aab1",
    base: "ultra_pure_white",
  },
  {
    name: "Aqua splash",
    hex: "#85ced1",
    base: "ultra_pure_white",
  },
  {
    name: "Botanical garden",
    hex: "#12403c",
    base: "deep_base",
  },
  {
    name: "Scarab",
    hex: "#23312d",
    base: "deep_base",
  },
  {
    name: "Nimbus cloud",
    hex: "#d5d5d8",
    base: "ultra_pure_white",
  },
  {
    name: "Micro chip",
    hex: "#babcc0",
    base: "ultra_pure_white",
  },
  {
    name: "Wet weather",
    hex: "#929090",
    base: "ultra_pure_white",
  },
  {
    name: "Titanium",
    hex: "#807d7f",
    base: "medium_base",
  },
  {
    name: "December sky",
    hex: "#767275",
    base: "medium_base",
  },
  {
    name: "Pavement",
    hex: "#524d50",
    base: "medium_base",
  },
  {
    name: "Magnet",
    hex: "#4d4b4f",
    base: "medium_base",
  },
  {
    name: "Silver sconce",
    hex: "#a19fa5",
    base: "ultra_pure_white",
  },
  {
    name: "Silver filigree",
    hex: "#7f7c81",
    base: "medium_base",
  },
  {
    name: "Quicksilver",
    hex: "#7e7d88",
    base: "ultra_pure_white",
  },
  {
    name: "Storm front",
    hex: "#787376",
    base: "medium_base",
  },
  {
    name: "Tornado",
    hex: "#5e5b60",
    base: "medium_base",
  },
  {
    name: "Eiffel tower",
    hex: "#5c5658",
    base: "medium_base",
  },
  {
    name: "Graphite",
    hex: "#3b3b48",
    base: "deep_base",
  },
  {
    name: "Alloy",
    hex: "#98979a",
    base: "ultra_pure_white",
  },
  {
    name: "Sleet",
    hex: "#92949b",
    base: "ultra_pure_white",
  },
  {
    name: "Tradewinds",
    hex: "#7f8793",
    base: "ultra_pure_white",
  },
  {
    name: "Grisaille",
    hex: "#585e6f",
    base: "medium_base",
  },
  {
    name: "Periscope",
    hex: "#46444c",
    base: "medium_base",
  },
  {
    name: "Quiet shade",
    hex: "#66676d",
    base: "medium_base",
  },
  {
    name: "Turbulence",
    hex: "#4e545b",
    base: "medium_base",
  },
  {
    name: "Stormy weather",
    hex: "#58646d",
    base: "medium_base",
  },
  {
    name: "Iron gate",
    hex: "#4e5055",
    base: "medium_base",
  },
  {
    name: "Forged iron",
    hex: "#48464a",
    base: "medium_base",
  },
  {
    name: "Asphalt",
    hex: "#434447",
    base: "medium_base",
  },
  {
    name: "Ghost gray",
    hex: "#9c9b98",
    base: "ultra_pure_white",
  },
  {
    name: "Brushed nickel",
    hex: "#73706f",
    base: "medium_base",
  },
  {
    name: "Mourning dove",
    hex: "#94908b",
    base: "ultra_pure_white",
  },
  {
    name: "Belgian block",
    hex: "#a3a9a6",
    base: "ultra_pure_white",
  },
  {
    name: "Agave green",
    hex: "#6b7169",
    base: "medium_base",
  },
  {
    name: "Cilantro",
    hex: "#43544b",
    base: "medium_base",
  },
  {
    name: "Pine grove",
    hex: "#213631",
    base: "deep_base",
  },
  {
    name: "Eden",
    hex: "#264e36",
    base: "deep_base",
  },
  {
    name: "Jolly green",
    hex: "#007844",
    base: "deep_base",
  },
  {
    name: "Mountain view",
    hex: "#2e3d30",
    base: "deep_base",
  },
  {
    name: "Margarita",
    hex: "#b5c38e",
    base: "ultra_pure_white",
  },
  {
    name: "Winter moss",
    hex: "#5b5a41",
    base: "medium_base",
  },
  {
    name: "Climbing ivy",
    hex: "#444940",
    base: "medium_base",
  },
  {
    name: "Delicioso",
    hex: "#3f352f",
    base: "deep_base",
  },
  {
    name: "Mulch",
    hex: "#433937",
    base: "deep_base",
  },
  {
    name: "Mole",
    hex: "#392d2b",
    base: "deep_base",
  },
  {
    name: "Chocolate torte",
    hex: "#382e2d",
    base: "deep_base",
  },
  {
    name: "Ganache",
    hex: "#34292a",
    base: "deep_base",
  },
  {
    name: "Black bean",
    hex: "#2e272a",
    base: "deep_base",
  },
  {
    name: "Espresso",
    hex: "#363031",
    base: "deep_base",
  },
  {
    name: "Meteorite",
    hex: "#2b2929",
    base: "deep_base",
  },
  {
    name: "Tap shoe",
    hex: "#2a2b2d",
    base: "deep_base",
  },
  {
    name: "White alyssum",
    hex: "#efebe7",
    base: "ultra_pure_white",
  },
  {
    name: "Jet stream",
    hex: "#ede6de",
    base: "ultra_pure_white",
  },
  {
    name: "Sweet cream",
    hex: "#f0ead6",
    base: "ultra_pure_white",
  },
  {
    name: "Buttercream",
    hex: "#efe0cd",
    base: "ultra_pure_white",
  },
  {
    name: "Lemon icing",
    hex: "#f6ebc8",
    base: "ultra_pure_white",
  },
  {
    name: "Sugar swizzle",
    hex: "#f3eee7",
    base: "ultra_pure_white",
  },
  {
    name: "Coconut milk",
    hex: "#f0ede5",
    base: "ultra_pure_white",
  },
  {
    name: "Yellow pear",
    hex: "#ece99b",
    base: "ultra_pure_white",
  },
  {
    name: "Sea salt",
    hex: "#f1e6de",
    base: "ultra_pure_white",
  },
  {
    name: "Brilliant white",
    hex: "#edf1fe",
    base: "ultra_pure_white",
  },
  {
    name: "Cannoli cream",
    hex: "#f0efe2",
    base: "ultra_pure_white",
  },
  {
    name: "Tofu",
    hex: "#e8e3d9",
    base: "ultra_pure_white",
  },
  {
    name: "Pistachio shell",
    hex: "#d7cfbb",
    base: "ultra_pure_white",
  },
  {
    name: "Celandine",
    hex: "#ebdf67",
    base: "ultra_pure_white",
  },
  {
    name: "Lemon verbena",
    hex: "#f3e779",
    base: "ultra_pure_white",
  },
  {
    name: "Creme de peche",
    hex: "#f5d6c6",
    base: "ultra_pure_white",
  },
  {
    name: "Mary's rose",
    hex: "#f7d1d4",
    base: "ultra_pure_white",
  },
  {
    name: "Morganite",
    hex: "#dfcdc6",
    base: "ultra_pure_white",
  },
  {
    name: "Rose water",
    hex: "#f8e0e7",
    base: "ultra_pure_white",
  },
  {
    name: "Almond milk",
    hex: "#d6cebe",
    base: "ultra_pure_white",
  },
  {
    name: "Lime popsicle",
    hex: "#c0db3a",
    base: "ultra_pure_white",
  },
  {
    name: "Golden kiwi",
    hex: "#f3dd3e",
    base: "ultra_pure_white",
  },
  {
    name: "Meadowlark",
    hex: "#ead94e",
    base: "ultra_pure_white",
  },
  {
    name: "Evening primrose",
    hex: "#ccdb1e",
    base: "medium_base",
  },
  {
    name: "Habanero gold",
    hex: "#fed450",
    base: "ultra_pure_white",
  },
  {
    name: "Minion yellow",
    hex: "#fed55d",
    base: "ultra_pure_white",
  },
  {
    name: "Soybean",
    hex: "#d2c29d",
    base: "ultra_pure_white",
  },
  {
    name: "Jurassic gold",
    hex: "#e7aa56",
    base: "ultra_pure_white",
  },
  {
    name: "Brown rice",
    hex: "#c7bba4",
    base: "ultra_pure_white",
  },
  {
    name: "Peach quartz",
    hex: "#f5b895",
    base: "ultra_pure_white",
  },
  {
    name: "Peachy keen",
    hex: "#e2bdb3",
    base: "ultra_pure_white",
  },
  {
    name: "Brazilian sand",
    hex: "#dacab7",
    base: "ultra_pure_white",
  },
  {
    name: "Pink salt",
    hex: "#f7cdc7",
    base: "ultra_pure_white",
  },
  {
    name: "Rose quartz",
    hex: "#f7cac9",
    base: "ultra_pure_white",
  },
  {
    name: "Ballet slipper",
    hex: "#ebced5",
    base: "ultra_pure_white",
  },
  {
    name: "Cherry blossom",
    hex: "#f7cee0",
    base: "ultra_pure_white",
  },
  {
    name: "Antarctica",
    hex: "#c6c5c6",
    base: "ultra_pure_white",
  },
  {
    name: "Oyster mushroom",
    hex: "#c3c6c8",
    base: "ultra_pure_white",
  },
  {
    name: "Tanager turquoise",
    hex: "#91dce8",
    base: "ultra_pure_white",
  },
  {
    name: "Limpet shell",
    hex: "#98ddde",
    base: "ultra_pure_white",
  },
  {
    name: "Iced aqua",
    hex: "#abd3db",
    base: "ultra_pure_white",
  },
  {
    name: "Acid lime",
    hex: "#badf30",
    base: "ultra_pure_white",
  },
  {
    name: "Spicy mustard",
    hex: "#d8ae47",
    base: "ultra_pure_white",
  },
  {
    name: "Kumquat",
    hex: "#fbaa4c",
    base: "ultra_pure_white",
  },
  {
    name: "Irish cream",
    hex: "#c0ac92",
    base: "ultra_pure_white",
  },
  {
    name: "Orange chiffon",
    hex: "#f9aa7d",
    base: "ultra_pure_white",
  },
  {
    name: "Hazelnut",
    hex: "#cfb095",
    base: "ultra_pure_white",
  },
  {
    name: "Sepia rose",
    hex: "#d4bab6",
    base: "ultra_pure_white",
  },
  {
    name: "Raindrops",
    hex: "#b1aab3",
    base: "ultra_pure_white",
  },
  {
    name: "Zen blue",
    hex: "#9fa9be",
    base: "ultra_pure_white",
  },
  {
    name: "Quiet gray",
    hex: "#b9babd",
    base: "ultra_pure_white",
  },
  {
    name: "Airy blue",
    hex: "#92b6d5",
    base: "ultra_pure_white",
  },
  {
    name: "Harbor mist",
    hex: "#afb1b4",
    base: "ultra_pure_white",
  },
  {
    name: "Sea angel",
    hex: "#98bfca",
    base: "ultra_pure_white",
  },
  {
    name: "Baltic sea",
    hex: "#79b5db",
    base: "ultra_pure_white",
  },
  {
    name: "Antiqua sand",
    hex: "#83c2cd",
    base: "ultra_pure_white",
  },
  {
    name: "Island paradise",
    hex: "#95dee3",
    base: "ultra_pure_white",
  },
  {
    name: "Tibetan stone",
    hex: "#82c2c7",
    base: "ultra_pure_white",
  },
  {
    name: "Mango mojito",
    hex: "#d69c2f",
    base: "medium_base",
  },
  {
    name: "Ginger root",
    hex: "#bfa58a",
    base: "ultra_pure_white",
  },
  {
    name: "Iced coffee",
    hex: "#b18f6a",
    base: "ultra_pure_white",
  },
  {
    name: "Autumn blaze",
    hex: "#d9922e",
    base: "medium_base",
  },
  {
    name: "Golden orange",
    hex: "#d7942d",
    base: "medium_base",
  },
  {
    name: "Porcini",
    hex: "#cca580",
    base: "ultra_pure_white",
  },
  {
    name: "Iceland poppy",
    hex: "#f4963a",
    base: "medium_base",
  },
  {
    name: "Papaya",
    hex: "#fea166",
    base: "ultra_pure_white",
  },
  {
    name: "Carrot curl",
    hex: "#fe8c18",
    base: "medium_base",
  },
  {
    name: "Turmeric",
    hex: "#fe840e",
    base: "medium_base",
  },
  {
    name: "Tangelo",
    hex: "#fe7e03",
    base: "medium_base",
  },
  {
    name: "Fenugreek",
    hex: "#c0916c",
    base: "ultra_pure_white",
  },
  {
    name: "Dusted clay",
    hex: "#cc7357",
    base: "medium_base",
  },
  {
    name: "Pastry shell",
    hex: "#bd8c66",
    base: "ultra_pure_white",
  },
  {
    name: "Blooming dahlia",
    hex: "#eb9687",
    base: "ultra_pure_white",
  },
  {
    name: "Crocus petal",
    hex: "#b99bc5",
    base: "ultra_pure_white",
  },
  {
    name: "Purple rose",
    hex: "#b09fca",
    base: "ultra_pure_white",
  },
  {
    name: "Lilac breeze",
    hex: "#b3a0c9",
    base: "ultra_pure_white",
  },
  {
    name: "Serenity",
    hex: "#91a8d0",
    base: "ultra_pure_white",
  },
  {
    name: "Crystal seas",
    hex: "#5dafce",
    base: "ultra_pure_white",
  },
  {
    name: "Golden lime",
    hex: "#9a9738",
    base: "medium_base",
  },
  {
    name: "Split pea",
    hex: "#9c9a40",
    base: "medium_base",
  },
  {
    name: "Lentil sprout",
    hex: "#aba44d",
    base: "ultra_pure_white",
  },
  {
    name: "Pure cashmere",
    hex: "#ada396",
    base: "ultra_pure_white",
  },
  {
    name: "Sun baked",
    hex: "#d27f63",
    base: "ultra_pure_white",
  },
  {
    name: "Peach caramel",
    hex: "#c5733d",
    base: "medium_base",
  },
  {
    name: "Tomato cream",
    hex: "#c57644",
    base: "medium_base",
  },
  {
    name: "Orange tiger",
    hex: "#f96714",
    base: "medium_base",
  },
  {
    name: "Meerkat",
    hex: "#a46f44",
    base: "medium_base",
  },
  {
    name: "Exotic orange",
    hex: "#f96531",
    base: "medium_base",
  },
  {
    name: "Dragon fire",
    hex: "#fc642d",
    base: "medium_base",
  },
  {
    name: "Coral quartz",
    hex: "#f77464",
    base: "ultra_pure_white",
  },
  {
    name: "Peach echo",
    hex: "#f7786b",
    base: "ultra_pure_white",
  },
  {
    name: "Purple dove",
    hex: "#98878c",
    base: "ultra_pure_white",
  },
  {
    name: "Sand verbena",
    hex: "#9f90c1",
    base: "ultra_pure_white",
  },
  {
    name: "Lilac gray",
    hex: "#9896a4",
    base: "ultra_pure_white",
  },
  {
    name: "Granada sky",
    hex: "#5d81bb",
    base: "ultra_pure_white",
  },
  {
    name: "Tree house",
    hex: "#988c75",
    base: "ultra_pure_white",
  },
  {
    name: "Chai tea",
    hex: "#b1832f",
    base: "medium_base",
  },
  {
    name: "Roasted pecan",
    hex: "#93592b",
    base: "medium_base",
  },
  {
    name: "Roasted cashew",
    hex: "#918579",
    base: "ultra_pure_white",
  },
  {
    name: "Winter twig",
    hex: "#948a7a",
    base: "ultra_pure_white",
  },
  {
    name: "Petrified oak",
    hex: "#8d7960",
    base: "medium_base",
  },
  {
    name: "Argan oil",
    hex: "#8b593e",
    base: "medium_base",
  },
  {
    name: "Autumn maple",
    hex: "#c46215",
    base: "medium_base",
  },
  {
    name: "Sepia tint",
    hex: "#897560",
    base: "medium_base",
  },
  {
    name: "Spice route",
    hex: "#b95b3f",
    base: "medium_base",
  },
  {
    name: "Scarlet ibis",
    hex: "#f45520",
    base: "medium_base",
  },
  {
    name: "Summer fig",
    hex: "#be4b3b",
    base: "medium_base",
  },
  {
    name: "Moonscape",
    hex: "#725f69",
    base: "medium_base",
  },
  {
    name: "Fruit dove",
    hex: "#ce5b78",
    base: "ultra_pure_white",
  },
  {
    name: "Pink yarrow",
    hex: "#ce3175",
    base: "medium_base",
  },
  {
    name: "Toadstool",
    hex: "#988088",
    base: "ultra_pure_white",
  },
  {
    name: "Bodacious",
    hex: "#b76ba3",
    base: "ultra_pure_white",
  },
  {
    name: "Diffused orchid",
    hex: "#9879a2",
    base: "ultra_pure_white",
  },
  {
    name: "Fairy wren",
    hex: "#9479af",
    base: "ultra_pure_white",
  },
  {
    name: "Sunlit allium",
    hex: "#9787bb",
    base: "ultra_pure_white",
  },
  {
    name: "Sharkskin",
    hex: "#838487",
    base: "ultra_pure_white",
  },
  {
    name: "Pale iris",
    hex: "#8895c5",
    base: "ultra_pure_white",
  },
  {
    name: "Iolite",
    hex: "#707bb4",
    base: "ultra_pure_white",
  },
  {
    name: "Gray flannel",
    hex: "#848182",
    base: "ultra_pure_white",
  },
  {
    name: "Riverside",
    hex: "#4c6a92",
    base: "medium_base",
  },
  {
    name: "Quiet harbor",
    hex: "#5a789a",
    base: "medium_base",
  },
  {
    name: "Lichen blue",
    hex: "#5d89b3",
    base: "ultra_pure_white",
  },
  {
    name: "Pacific coast",
    hex: "#5480ac",
    base: "medium_base",
  },
  {
    name: "Ibiza blue",
    hex: "#007cb7",
    base: "medium_base",
  },
  {
    name: "Navagio bay",
    hex: "#3183a0",
    base: "medium_base",
  },
  {
    name: "Barrier reef",
    hex: "#0084a1",
    base: "medium_base",
  },
  {
    name: "Guacamole",
    hex: "#797b3a",
    base: "medium_base",
  },
  {
    name: "Kale",
    hex: "#5a7247",
    base: "medium_base",
  },
  {
    name: "Mayfly",
    hex: "#65663f",
    base: "medium_base",
  },
  {
    name: "Twist of lime",
    hex: "#4e632c",
    base: "medium_base",
  },
  {
    name: "Martini olive",
    hex: "#716a4d",
    base: "medium_base",
  },
  {
    name: "Emperador",
    hex: "#684832",
    base: "medium_base",
  },
  {
    name: "Thai curry",
    hex: "#ab6819",
    base: "medium_base",
  },
  {
    name: "Honey ginger",
    hex: "#a86217",
    base: "medium_base",
  },
  {
    name: "Sugar almond",
    hex: "#935529",
    base: "medium_base",
  },
  {
    name: "Spiced apple",
    hex: "#783937",
    base: "medium_base",
  },
  {
    name: "Chili oil",
    hex: "#8e3c36",
    base: "medium_base",
  },
  {
    name: "Plum truffle",
    hex: "#675657",
    base: "medium_base",
  },
  {
    name: "Brandy brown",
    hex: "#73362a",
    base: "medium_base",
  },
  {
    name: "Valiant poppy",
    hex: "#bc322c",
    base: "medium_base",
  },
  {
    name: "Aura orange",
    hex: "#b4262a",
    base: "medium_base",
  },
  {
    name: "Toreador",
    hex: "#b61032",
    base: "medium_base",
  },
  {
    name: "Lychee",
    hex: "#ba0b32",
    base: "medium_base",
  },
  {
    name: "Goji berry",
    hex: "#b91228",
    base: "medium_base",
  },
  {
    name: "Arctic dusk",
    hex: "#735b6a",
    base: "medium_base",
  },
  {
    name: "Ephemera",
    hex: "#6f5965",
    base: "medium_base",
  },
  {
    name: "Jalapeno red",
    hex: "#b2103c",
    base: "medium_base",
  },
  {
    name: "Love potion",
    hex: "#c01352",
    base: "medium_base",
  },
  {
    name: "Pink peacock",
    hex: "#c62168",
    base: "medium_base",
  },
  {
    name: "Grape kiss",
    hex: "#7b4368",
    base: "medium_base",
  },
  {
    name: "Willowherb",
    hex: "#8e4483",
    base: "medium_base",
  },
  {
    name: "Charisma",
    hex: "#632a60",
    base: "medium_base",
  },
  {
    name: "Plum jam",
    hex: "#624076",
    base: "medium_base",
  },
  {
    name: "Lavender crystal",
    hex: "#936a98",
    base: "ultra_pure_white",
  },
  {
    name: "Purple sapphire",
    hex: "#6f4685",
    base: "medium_base",
  },
  {
    name: "Chive blossom",
    hex: "#7d5d99",
    base: "medium_base",
  },
  {
    name: "Purple corallite",
    hex: "#5a4e8f",
    base: "medium_base",
  },
  {
    name: "Volcanic glass",
    hex: "#615c60",
    base: "medium_base",
  },
  {
    name: "Gray blue",
    hex: "#4d587a",
    base: "medium_base",
  },
  {
    name: "Blue horizon",
    hex: "#4e6482",
    base: "medium_base",
  },
  {
    name: "Iris bloom",
    hex: "#5b609e",
    base: "medium_base",
  },
  {
    name: "Nebulas blue",
    hex: "#2d62a3",
    base: "medium_base",
  },
  {
    name: "Indigo bunting",
    hex: "#006ca9",
    base: "medium_base",
  },
  {
    name: "Fjord blue",
    hex: "#007290",
    base: "medium_base",
  },
  {
    name: "Hawaiian surf",
    hex: "#0078a7",
    base: "medium_base",
  },
  {
    name: "Tahitian tide",
    hex: "#006b7e",
    base: "medium_base",
  },
  {
    name: "Quetzal green",
    hex: "#006865",
    base: "deep_base",
  },
  {
    name: "Granite gray",
    hex: "#615e5f",
    base: "medium_base",
  },
  {
    name: "Lush meadow",
    hex: "#006e51",
    base: "deep_base",
  },
  {
    name: "Gray pinstripe",
    hex: "#49494d",
    base: "medium_base",
  },
  {
    name: "Sea turtle",
    hex: "#5e5749",
    base: "medium_base",
  },
  {
    name: "Deep depths",
    hex: "#46483c",
    base: "medium_base",
  },
  {
    name: "Kalamata",
    hex: "#5f5b4c",
    base: "medium_base",
  },
  {
    name: "Crocodile",
    hex: "#5d5348",
    base: "medium_base",
  },
  {
    name: "Chocolate plum",
    hex: "#3c2d2e",
    base: "deep_base",
  },
  {
    name: "Chocolate lab",
    hex: "#5c3e35",
    base: "medium_base",
  },
  {
    name: "Shaved chocolate",
    hex: "#543b35",
    base: "medium_base",
  },
  {
    name: "Fondue fudge",
    hex: "#5d4236",
    base: "medium_base",
  },
  {
    name: "Tiramisu",
    hex: "#634235",
    base: "medium_base",
  },
  {
    name: "Rocky road",
    hex: "#5a3e36",
    base: "medium_base",
  },
  {
    name: "Chicory coffee",
    hex: "#4a342e",
    base: "deep_base",
  },
  {
    name: "Smoked paprika",
    hex: "#6e362c",
    base: "medium_base",
  },
  {
    name: "Chocolate fondant",
    hex: "#56352d",
    base: "deep_base",
  },
  {
    name: "Cherry mahogany",
    hex: "#66352b",
    base: "medium_base",
  },
  {
    name: "Merlot",
    hex: "#72262c",
    base: "deep_base",
  },
  {
    name: "Red pear",
    hex: "#7b3539",
    base: "medium_base",
  },
  {
    name: "Pickled beet",
    hex: "#4d233d",
    base: "deep_base",
  },
  {
    name: "Plum caspia",
    hex: "#61224a",
    base: "medium_base",
  },
  {
    name: "Winter bloom",
    hex: "#47243b",
    base: "deep_base",
  },
  {
    name: "Spiced plum",
    hex: "#6d4773",
    base: "medium_base",
  },
  {
    name: "Violet indigo",
    hex: "#3e285c",
    base: "deep_base",
  },
  {
    name: "Maritime blue",
    hex: "#27293d",
    base: "deep_base",
  },
  {
    name: "Obsidian",
    hex: "#3a363b",
    base: "deep_base",
  },
  {
    name: "Black beauty",
    hex: "#26262a",
    base: "deep_base",
  },
  {
    name: "Blackened pearl",
    hex: "#4d4b50",
    base: "medium_base",
  },
  {
    name: "Odyssey gray",
    hex: "#434452",
    base: "medium_base",
  },
  {
    name: "Black onyx",
    hex: "#2b272b",
    base: "deep_base",
  },
  {
    name: "Navy peony",
    hex: "#223a5e",
    base: "deep_base",
  },
  {
    name: "Sargasso sea",
    hex: "#35435a",
    base: "medium_base",
  },
  {
    name: "Sailor blue",
    hex: "#0e3a53",
    base: "deep_base",
  },
  {
    name: "Gibraltar sea",
    hex: "#123850",
    base: "deep_base",
  },
  {
    name: "Lapis blue",
    hex: "#004b8d",
    base: "deep_base",
  },
  {
    name: "Baleine blue",
    hex: "#155187",
    base: "medium_base",
  },
  {
    name: "Galaxy blue",
    hex: "#2a4b7c",
    base: "medium_base",
  },
  {
    name: "Blue opal",
    hex: "#0f3b57",
    base: "deep_base",
  },
  {
    name: "Moonlit ocean",
    hex: "#293b4d",
    base: "deep_base",
  },
  {
    name: "Deep dive",
    hex: "#29495c",
    base: "medium_base",
  },
  {
    name: "Crystal teal",
    hex: "#00637c",
    base: "medium_base",
  },
  {
    name: "Deep lagoon",
    hex: "#005265",
    base: "deep_base",
  },
  {
    name: "Sea moss",
    hex: "#254445",
    base: "deep_base",
  },
  {
    name: "Forest biome",
    hex: "#184a45",
    base: "deep_base",
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
