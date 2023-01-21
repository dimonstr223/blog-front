import React from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth'
import axios from '../../axios'
import styles from './AddPost.module.scss'

export const AddPost = () => {
	const isAuth = useSelector(selectIsAuth)

	const [value, setValue] = React.useState('')
	const [title, setTitle] = React.useState('')
	const [tags, setTags] = React.useState('')
	const [imageUrl, setImageUrl] = React.useState('')
	const inputFileRef = React.useRef(null)

	const handleChangeFile = async event => {
		try {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/upload', formData)
			setImageUrl(data.url)
			console.log(data)
		} catch (err) {
			console.warn(err)
			alert('Uploading error')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onChange = React.useCallback(value => {
		setValue(value)
	}, [])

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	)

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				onClick={() => inputFileRef.current.click()}
				variant='outlined'
				size='large'
			>
				Загрузить превью
			</Button>
			<input
				ref={inputFileRef}
				type='file'
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant='contained'
						color='error'
						onClick={onClickRemoveImage}
					>
						Удалить
					</Button>
					<img
						className={styles.image}
						width={150}
						src={`http://localhost:4444/${imageUrl}`}
						alt='Uploaded'
					/>
				</>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				fullWidth
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Тэги'
				fullWidth
				value={tags}
				onChange={e => setTags(e.target.value)}
			/>
			<SimpleMDE
				className={styles.editor}
				value={value}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button size='large' variant='contained'>
					Опубликовать
				</Button>
				<a href='/'>
					<Button size='large'>Отмена</Button>
				</a>
			</div>
		</Paper>
	)
}
