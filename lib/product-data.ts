import { Product, Category } from "@/types/product";

export const CATEGORIES: Category[] = [
	{
		id: "circuit-breakers",
		name: "Circuit Breakers",
		icon: "⚡",
		description: "MCBs, RCCBs, and distribution boards",
	},
	{
		id: "lighting",
		name: "Lighting",
		icon: "💡",
		description: "LED bulbs, tube lights, and fixtures",
	},
	{
		id: "switches-sockets",
		name: "Switches & Sockets",
		icon: "🔌",
		description: "Electrical switches, sockets, and outlets",
	},
	{
		id: "cables-wires",
		name: "Cables & Wires",
		icon: "🔗",
		description: "Copper wires, cables, and conductors",
	},
	{
		id: "fans",
		name: "Fans",
		icon: "🌀",
		description: "Ceiling fans and ventilation",
	},
	{
		id: "accessories",
		name: "Accessories",
		icon: "🔧",
		description: "Plugs, extensions, and electrical accessories",
	},
	{
		id: "special-products",
		name: "Special Products",
		icon: "🎁",
		description: "Special products",
	},
	{
		id: "stock-products",
		name: "Stock Products",
		icon: "�",
		description: "Products in stock",
	},
];

export const PRODUCTS: Product[] = [
	// Circuit Breakers
	{
		id: "1",
		sku: "MCB-1P-06A",
		name: "SIGMA MCB 1POLE 06A Type C - 6kA",
		description: "Single pole miniature circuit breaker with 6A rating and Type C tripping characteristic",
		price: 2850.0,
		category: "circuit-breakers",
		image: "/electrical-circuit-breaker.png",
		stock: 150,
		unit: "pcs",
	},
	{
		id: "2",
		sku: "MCB-1P-10A",
		name: "SIGMA MCB 1POLE 10A Type C - 6kA",
		description: "Single pole miniature circuit breaker with 10A rating and Type C tripping characteristic",
		price: 2950.0,
		category: "circuit-breakers",
		image: "/electrical-circuit-breaker.png",
		stock: 120,
		unit: "pcs",
	},
	{
		id: "3",
		sku: "MCB-1P-16A",
		name: "SIGMA MCB 1POLE 16A Type C - 6kA",
		description: "Single pole miniature circuit breaker with 16A rating and Type C tripping characteristic",
		price: 3100.0,
		category: "circuit-breakers",
		image: "/electrical-circuit-breaker.png",
		stock: 100,
		unit: "pcs",
	},
	{
		id: "4",
		sku: "RCCB-2P-32A",
		name: "SIGMA RCCB 2POLE 32A 30mA",
		description: "Residual current circuit breaker with 32A rating and 30mA sensitivity",
		price: 8500.0,
		category: "circuit-breakers",
		image: "/electrical-circuit-breaker.png",
		stock: 75,
		unit: "pcs",
	},

	// Lighting
	{
		id: "5",
		sku: "LED-07W-DL",
		name: "LED BULB SCREW TYPE 07W D/L",
		description: "7W LED bulb with daylight color temperature, E27 screw base",
		price: 1940.0,
		category: "lighting",
		image: "/placeholder-khajt.png",
		stock: 300,
		unit: "pcs",
	},
	{
		id: "6",
		sku: "LED-09W-WW",
		name: "LED BULB SCREW TYPE 09W WARM WHITE",
		description: "9W LED bulb with warm white color temperature, E27 screw base",
		price: 2100.0,
		category: "lighting",
		image: "/placeholder-khajt.png",
		stock: 250,
		unit: "pcs",
	},
	{
		id: "7",
		sku: "TUB-40W-WH",
		name: "LED TUBE LIGHT 40W WHITE",
		description: "40W LED tube light with white color, T8 fitting",
		price: 2200.0,
		category: "lighting",
		image: "/placeholder-h7isy.png",
		stock: 200,
		unit: "pcs",
	},
	{
		id: "8",
		sku: "TUB-18W-WH",
		name: "LED TUBE LIGHT 18W WHITE",
		description: "18W LED tube light with white color, T8 fitting",
		price: 1800.0,
		category: "lighting",
		image: "/placeholder-h7isy.png",
		stock: 180,
		unit: "pcs",
	},

	// Switches & Sockets
	{
		id: "9",
		sku: "SW-2W-WH",
		name: "SWITCH 2 WAY WHITE",
		description: "2-way electrical switch in white color, modular design",
		price: 1025.0,
		category: "switches-sockets",
		image: "/placeholder-6w0v6.png",
		stock: 400,
		unit: "pcs",
	},
	{
		id: "10",
		sku: "SW-3W-WH",
		name: "SWITCH 3 WAY WHITE",
		description: "3-way electrical switch in white color, modular design",
		price: 1150.0,
		category: "switches-sockets",
		image: "/placeholder-6w0v6.png",
		stock: 350,
		unit: "pcs",
	},
	{
		id: "11",
		sku: "SOC-2P-13A",
		name: "SOCKET 2 PIN 13A",
		description: "2-pin electrical socket with 13A rating",
		price: 950.0,
		category: "switches-sockets",
		image: "/placeholder-6w0v6.png",
		stock: 300,
		unit: "pcs",
	},
	{
		id: "12",
		sku: "SOC-3P-13A",
		name: "SOCKET 3 PIN 13A",
		description: "3-pin electrical socket with 13A rating and grounding",
		price: 1200.0,
		category: "switches-sockets",
		image: "/placeholder-6w0v6.png",
		stock: 280,
		unit: "pcs",
	},

	// Cables & Wires
	{
		id: "13",
		sku: "CBL-2.5MM",
		name: "CABLE 2.5MM COPPER WIRE",
		description: "2.5mm² copper conductor cable, 100m roll",
		price: 285.0,
		category: "cables-wires",
		image: "/placeholder-x6c8h.png",
		stock: 50,
		unit: "rolls",
	},
	{
		id: "14",
		sku: "WIR-1.5MM",
		name: "WIRE 1.5MM SINGLE CORE",
		description: "1.5mm² single core copper wire, 100m roll",
		price: 125.0,
		category: "cables-wires",
		image: "/placeholder-x6c8h.png",
		stock: 80,
		unit: "rolls",
	},
	{
		id: "15",
		sku: "CBL-4.0MM",
		name: "CABLE 4.0MM COPPER WIRE",
		description: "4.0mm² copper conductor cable, 100m roll",
		price: 450.0,
		category: "cables-wires",
		image: "/placeholder-x6c8h.png",
		stock: 30,
		unit: "rolls",
	},

	// Fans
	{
		id: "16",
		sku: "FAN-52IN-WH",
		name: "CEILING FAN 52 INCH WHITE",
		description: "52-inch ceiling fan in white color with remote control",
		price: 8500.0,
		category: "fans",
		image: "/placeholder-logo.png",
		stock: 45,
		unit: "pcs",
	},
	{
		id: "17",
		sku: "FAN-48IN-BR",
		name: "CEILING FAN 48 INCH BROWN",
		description: "48-inch ceiling fan in brown color with remote control",
		price: 7800.0,
		category: "fans",
		image: "/placeholder-logo.png",
		stock: 35,
		unit: "pcs",
	},

	// Accessories
	{
		id: "18",
		sku: "PLG-3P-13A",
		name: "PLUG 3 PIN 13A",
		description: "3-pin electrical plug with 13A rating",
		price: 1480.0,
		category: "accessories",
		image: "/placeholder-6w0v6.png",
		stock: 200,
		unit: "pcs",
	},
	{
		id: "19",
		sku: "EXT-3M-WH",
		name: "EXTENSION CORD 3 METER WHITE",
		description: "3-meter extension cord in white color with 3-pin socket",
		price: 1850.0,
		category: "accessories",
		image: "/placeholder-x6c8h.png",
		stock: 150,
		unit: "pcs",
	},
	{
		id: "20",
		sku: "EXT-5M-WH",
		name: "EXTENSION CORD 5 METER WHITE",
		description: "5-meter extension cord in white color with 3-pin socket",
		price: 2200.0,
		category: "accessories",
		image: "/placeholder-x6c8h.png",
		stock: 120,
		unit: "pcs",
	},
];

export function getProductsByCategory(categoryId: string): Product[] {
	return PRODUCTS.filter((product) => product.category === categoryId);
}

export function getProductById(id: string): Product | undefined {
	return PRODUCTS.find((product) => product.id === id);
}

export function searchProducts(query: string): Product[] {
	const lowercaseQuery = query.toLowerCase();
	return PRODUCTS.filter(
		(product) =>
			product.name.toLowerCase().includes(lowercaseQuery) ||
			product.sku.toLowerCase().includes(lowercaseQuery) ||
			product.description?.toLowerCase().includes(lowercaseQuery)
	);
}
