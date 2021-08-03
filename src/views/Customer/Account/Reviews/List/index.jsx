import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	Box,
	Typography,
	Grid as GridMaterial
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { addLoadingGlobal, removeLoadingGlobal, addMessage } from 'src/actions';
import Page from 'src/components/Page';
import ProductCard from 'src/components/ProductCard';
import ManagerApi from 'src/services/managerApi';
import Grid from './Grid';

function ReviewList() {
	const customerId = useSelector((state) => state.account.user.customer);
	const dispatch = useDispatch();
	const [reviews, setReviews] = useState([]);
	const [review, setReview] = useState({});
	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [stateDialogEdit, setStateDialogEdit] = useState(false);
	const [stateDialogAdd, setStateDialogAdd] = useState(false);
	const [orderId, setOrderId] = useState('');
	const [productId, setProductId] = useState('');
	const saleOrderApi = new ManagerApi('/sale/order');
	const reviewsApi = new ManagerApi('/catalog/review');
	const productsApi = new ManagerApi('/catalog/product');
	const [translate, i18n] = useTranslation();
	const [productsArray, setProductsArray] = useState([]);

	const fetchOrderCheckout = async () => {
		const requestId = uuidv4();
		dispatch(addLoadingGlobal(requestId));

		const response = await saleOrderApi.getList({ notStatus: 'new' });

		if (response.data.success) {
			setOrders(response.data.content);
			dispatch(removeLoadingGlobal(requestId));
		}
	};

	const fetchReviews = async () => {
		const requestId = uuidv4();
		dispatch(addLoadingGlobal(requestId));

		let customer = { customer: customerId };

		const response = await reviewsApi.getList(customer);

		if (response.data.success) {
			setReviews(response.data.content);
			dispatch(removeLoadingGlobal(requestId));
		}
	};

	const onEditReview = async (id) => {
		const requestId = uuidv4();
		dispatch(addLoadingGlobal(requestId));

		const response = await reviewsApi.get(id);

		if (response.data.success) {
			setReview(response.data.content);
			dispatch(removeLoadingGlobal(requestId));
		}
	};

	const addReview = (orderId, productId) => {
		setOrderId(orderId);
		setProductId(productId)
		setStateModalAdd();
	};

	const setStateModalEdit = () => {
		setStateDialogAdd(false)
		stateDialogEdit ? setStateDialogEdit(false) : setStateDialogEdit(true);
	};

	const setStateModalAdd = () => {
		setStateDialogEdit(false)
		stateDialogAdd ? setStateDialogAdd(false) : setStateDialogAdd(true);
	};

	const onDelete = (id) => {
		const requestId = uuidv4();

		dispatch(addLoadingGlobal(requestId));
		reviewsApi.delete(id).then((response) => {
			if (response.data.success) {
				dispatch(removeLoadingGlobal(requestId));
				fetchReviews();
				dispatch(addMessage('Avaliação excluída com sucesso', 'success'));
			} else {
				dispatch(removeLoadingGlobal(requestId));
				dispatch(addMessage(response.data.message, 'error'));
			}
		})
	};

	useEffect(() => {
		fetchOrderCheckout();
		fetchReviews();
	}, []);

	useEffect(() => {
		if (orders.length > 0) {
			orders.map(order => {
				order.status !== 'pending' &&
					Promise.all(order.items.map(async (item) => {
						let response = await productsApi.getList({ sku: item.sku });

						if (response.data.content.length > 0) {
							products.push(response.data.content[0]);
							getProduct(products);
						}
					}))
			})
		}
	}, [orders.length]);

	const getProduct = data => {
		setTimeout(() => {
			setProductsArray(data);
		}, 500);
	};

	return (
		<Page title={translate('typographyMyRating')}>
			<Box mb={3}>
				<Typography
					variant="h1"
				>
					{translate('typographyMyRating')}
				</Typography>
				<Typography variant="subtitle1">
				</Typography>
			</Box>
			<Grid
				reviews={reviews}
				review={review}
				fetchReviews={fetchReviews}

				onEditReview={onEditReview}
				setStateModalEdit={setStateModalEdit}
				stateDialogEdit={stateDialogEdit}

				setStateModalAdd={setStateModalAdd}
				stateDialogAdd={stateDialogAdd}

				onDelete={onDelete}

				orders={orders}
				orderId={orderId}

				productId={productId}
				products={productsArray}
			/>
			<Box mt={2} mb={3}>
				<Typography
					variant="h1"
				>
					{translate('titleProductsTableCell')}
				</Typography>
				<Typography variant="subtitle1">
				</Typography>
			</Box>
			<GridMaterial
				container
				spacing={3}
			>
				{productsArray.length > 0 &&
					productsArray.map(item => {
						return (
							<GridMaterial item md={3} xs={12} >
								<ProductCard product={item} order={orders} isReview addReview={addReview} />
							</GridMaterial>
						)
					})
				}
			</GridMaterial>
		</Page >
	);
}

export default ReviewList;