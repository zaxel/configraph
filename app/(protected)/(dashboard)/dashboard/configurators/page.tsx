import ConfiguratorTable, { Configurator } from "@/features/dashboard/configurators/ConfiguratorTable";
const mockConfigurators: Configurator[] = [
  {
    id: "cfg_01j7h8x2p4m",
    title: "Ergonomic Office Chair 3D",
    thumbnail: "https://unsplash.com",
    status: "published",
    createdAt: "May 10, 2026",
    updatedAt: "May 15, 2026",
  },
  {
    id: "cfg_01j7h8x3k9a",
    title: "Minimalist Wooden Desk",
    thumbnail: "https://unsplash.com",
    status: "draft",
    createdAt: "May 12, 2026",
    updatedAt: "May 12, 2026",
  },
  {
    id: "cfg_01j7h8x4v2b",
    title: "Mechanical Keyboard Customizer",
    thumbnail: "https://unsplash.com",
    status: "published",
    createdAt: "Apr 28, 2026",
    updatedAt: "May 14, 2026",
  },
  {
    id: "cfg_01j7h8x5t7c",
    title: "Wireless ANC Headphones",
    thumbnail: "https://unsplash.com",
    status: "published",
    createdAt: "Apr 15, 2026",
    updatedAt: "May 01, 2026",
  },
  {
    id: "cfg_01j7h8x6r1d",
    title: "Modular Sofa System",
    // Intentionally missing to test the 'No Preview' fallback layout
    status: "draft",
    createdAt: "May 14, 2026",
    updatedAt: "May 14, 2026",
  },
  {
    id: "cfg_01j7h8x7e5f",
    title: "Smart Wristwatch Studio",
    thumbnail: "https://unsplash.com",
    status: "published",
    createdAt: "Mar 20, 2026",
    updatedAt: "May 08, 2026",
  },
  {
    id: "cfg_01j7h8x8w9g",
    title: "Titanium Road Bicycle",
    thumbnail: "https://unsplash.com",
    status: "draft",
    createdAt: "Feb 10, 2026",
    updatedAt: "Mar 02, 2026",
  },
  {
    id: "cfg_01j7h8x9q3h",
    title: "Leather Travel Backpack",
    thumbnail: "https://unsplash.com",
    status: "published",
    createdAt: "Jan 15, 2026",
    updatedAt: "Apr 30, 2026",
  },
  {
    id: "cfg_01j7h8y1x5k",
    title: "RGB Gaming Desktop Chassis",
    // Intentionally missing to test the 'No Preview' fallback layout
    status: "draft",
    createdAt: "May 01, 2026",
    updatedAt: "May 05, 2026",
  },
  {
    id: "cfg_01j7h8y2z8m",
    title: "Stainless Steel Coffee Maker Stainless Steel Coffee Maker Stainless Steel Coffee Maker",
    thumbnail: "https://unsplash.com",
    status: "published",
    createdAt: "Dec 05, 2025",
    updatedAt: "Jan 20, 2026",
  }
];

const Configurators = () => {
    return (
        <ConfiguratorTable configurators={mockConfigurators}/>
    )
};

export default Configurators;