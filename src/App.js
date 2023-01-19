import Container from '@mui/material/Container'
import { Route, Router } from 'react-router-dom'

import { Header } from './components'
import { Home, FullPost, Registration, AddPost, Login } from './pages'

function App() {
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Router>
					<Route path='/' element={<Home />} />
					<Route path='/posts/:id' element={<FullPost />} />
					<Route path='/add-post' element={<AddPost />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
				</Router>
			</Container>
		</>
	)
}

export default App
