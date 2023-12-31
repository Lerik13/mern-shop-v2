import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';

const ProfileScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	const [ updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo, userInfo.name, userInfo.email]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Password do not match')
		} else {
			try {
				const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
				dispatch(setCredentials(res));
				toast.success('Profile updated successfully')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name' className='my-2'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='email' className='my-2'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password' className='my-2'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='confirmPassword' className='my-2'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					
					<Button type='submit' variant='primary' className='my-2'>
						Update
					</Button>
					{ loadingUpdateProfile && <Loader />}
				</Form>
			</Col>
			
			<Col md={9}></Col>
		</Row>
	)
}
export default ProfileScreen