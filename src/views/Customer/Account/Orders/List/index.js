import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	Box,
	Typography,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { addLoadingGlobal, removeLoadingGlobal } from 'src/actions';
import Page from 'src/components/Page';
import ManagerApi from 'src/services/managerApi';
import Grid from './Grid';

function RegisterView() {
	const dispatch = useDispatch();
	const [orders, setOrders] = useState([]);
	const saleOrderApi = new ManagerApi('/sale/order');
	const [paginator, setPaginator] = useState({});
	const [translate, i18n] = useTranslation();
	let paginators = JSON.parse(localStorage.getItem('SaleListClient'));

	const [filters, setFilters] = useState({
		notStatus: "new",
		paginator: {
			pageItemsPerPage: paginators && paginators.limit ? paginators.limit : 10,
			pageCurrent: paginators && paginators.page ? paginators.page : 1
		},
	});

	const fetchOrderCheckout = async () => {
		const requestId = uuidv4();
		dispatch(addLoadingGlobal(requestId));

		const response = await saleOrderApi.getList(filters);

		if (response.data.success) {
			setOrders(response.data.content);
			setPaginator(response.data.paginator);
			dispatch(removeLoadingGlobal(requestId));
		}
	};

	const handlePaginator = (newPaginator) => {
		setPaginator((prev) => ({
			...prev,
			...newPaginator
		}));
		setFilters(
			Object.assign({}, filters, { paginator: { ...paginator, ...newPaginator } })
		);
	};

	useEffect(() => {
		fetchOrderCheckout();
	}, [filters]);

	return (
		<Page title={translate('typographyMyOrders')}>
			<Box mb={3}>
				<Typography
					variant="h1"
				>
					{translate('typographyMyOrders')}
				</Typography>
				<Typography variant="subtitle1">
				</Typography>
			</Box>
			<Grid orders={orders} paginator={paginator} onPaginate={handlePaginator} />
		</Page>
	);
}

export default RegisterView;
