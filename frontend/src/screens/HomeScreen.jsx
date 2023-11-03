import { Link, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery, useGetTopProductsQuery } from '../slices/productsApiSlice';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
	const { pageNumber, keyword } = useParams();
	
	const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });
	
	const { data: topProducts, isLoading: topProductsLoading, error: topProductsError } = useGetTopProductsQuery();

	if (isLoading || topProductsLoading) return <Loader />;
	if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;
	if (topProductsError) return <Message variant="danger">{topProductsError?.data?.message || topProductsError.error}</Message>;

	return (
		<>
			{ !keyword ? (
				<ProductCarousel products={topProducts} />
			) : (
				<Link to='/' className='btn btn-light mb-4'>
					Go Back
				</Link>
			)}
			<>
				<Meta />
				<h1>Latest Products</h1>
				<Row>
					{data.products.map(product => 
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product}/>
						</Col>
					)} 
				</Row>
				<Paginate
					pages={data.pages}
					page={data.page}
					keyword={keyword ? keyword : ''}
				/>
			</>
		</>
	)
}

export default HomeScreen