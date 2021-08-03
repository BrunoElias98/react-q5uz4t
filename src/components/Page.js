import React, {
	forwardRef,
	useEffect, useCallback, useState
} from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import track from 'src/utils/analytics';

const Page = forwardRef(({
	title,
	children,
	...rest
}, ref) => {
	const location = useLocation();
	const store = useSelector((state) => state.interface.store);
	const [metaTags, setMetaTags] = useState({
		title: '',
		description: ''
	});

	const initialize = useCallback(() => {

		let newTitle = 'On The Wall';
		if (title && title.length) {
			newTitle = title + ' - ' + newTitle;
		}

		setMetaTags({
			title: newTitle,
			description: ''
		});

		track.pageview(
			store.tools.googleAnalyticsId,
			{
				page_title: newTitle,
				page_path: location.pathname
			});
	}, [location]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	return (
		<div
			ref={ref}
			{...rest}
		>
			<Helmet>
				<title>{metaTags.title}</title>
				<link rel="shortcut icon" href={store.favicon}></link>
			</Helmet>
			{children}
		</div>
	);
});

Page.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string
};

export default Page;
