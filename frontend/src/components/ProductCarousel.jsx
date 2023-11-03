import { Link } from 'react-router-dom';
import { Image, Carousel } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = ({ products }) => {
	return (
		<Carousel pause='hover' className='bg-primary mb-4'>
			{products.map(product => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel