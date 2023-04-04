import { useReducer } from "react";

function reducer(cart, action) {
	if (action.type === "add") {
		cart.products.push({ ...action.data });
		cart.totalPrice += action.data.price;

		return { ...cart };
	}

	if (action.type === "remove") {
		cart.products.filter((product) => product._id !== action.id);
		cart.totalPrice -= action.price;

		return { ...cart };
	}

	return { ...cart };
}

export function useCart() {
	const [data, dispatch] = useReducer(reducer, {
		totalPrice: 0,
		products: [],
	});

	function addProduct(data) {
		return dispatch({ type: "add", data });
	}

	function removeProduct(id, price) {
		return dispatch({ type: "remove", id, price });
	}

	return {
		data,
		addProduct,
		removeProduct,
	};
}