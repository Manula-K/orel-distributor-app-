export interface Product {
	id: string;
	sku: string;
	name: string;
	description?: string;
	price: number;
	category: string;
	image?: string;
	stock: number;
	unit: string;
}

export interface Category {
	id: string;
	name: string;
	icon: string;
	description?: string;
}

export interface CartItem {
	product: Product;
	quantity: number;
}

export interface CartContextType {
	items: CartItem[];
	addItem: (product: Product, quantity?: number) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
}
