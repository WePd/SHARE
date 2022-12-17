import {useNavigate} from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import jwt from 'jwt-decode'
import shareVideo from '../assert/share.mp4'
import { client } from '../client'

import logo from '../assert/logowhite.png'


const Login  = () => {
	const navigate = useNavigate()
	const responseGoogle = (response) => {
 		const { credential } = response
		localStorage.setItem('user', JSON.stringify(jwt(credential)))
		const { name, picture, sub } = jwt(credential)

		const doc = {
			_id: sub,
			_type: "user",
			userName: name,
			image: picture
		}

		client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
	}

	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className='relative h-full w-full'>
				<video
					src={shareVideo}
					type='video/mp4'
					loop
					autoPlay
					controls={false}
					muted
					className='h-full w-full object-cover'
				/>
				<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
					<div className='p-5 '>
						<img src={logo} width='130px' alt='logo'/>
					</div>
					<div className='shadow-2xl'>
						<GoogleOAuthProvider  clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
						<GoogleLogin
							render={(renderProps) => (
								<button
									type='button'
									className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
								>
									<FcGoogle className='mr-4' />
									Sign with Google
								</button>
							)}
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolice='single_host_origin'
						/>
						</GoogleOAuthProvider>

					</div>
				</div>
			</div>
		</div>
	)
}
export default Login