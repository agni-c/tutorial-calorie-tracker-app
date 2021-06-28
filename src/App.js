import './styles.css';

import { useState } from 'react';

function AddItemForm({ addItem }) {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		addItem({ title, desc });
		setTitle('');
		setDesc('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div class='mb-3'>
				<label for='title' class='form-label visually-hidden'>
					Title
				</label>
				<input
					type='text'
					name='title'
					id='title'
					required
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			</div>
			<input
				type='text'
				name='desc'
				id='desc'
				required
				value={desc}
				onChange={e => setDesc(e.target.value)}
			/>
			<button type='submit'>Add Item</button>
		</form>
	);
}

function RenderItem({ updateItem, removeItem, item, index }) {
	const [isEditing, setIsEditing] = useState(false);
	return (
		<div>
			<div>
				<button onClick={() => removeItem(index)}>Delete</button>
				<button onClick={() => setIsEditing(!isEditing)}>
					{isEditing ? 'Done' : 'Edit'}
				</button>
			</div>
			<div>
				{isEditing ? (
					<input
						type='text'
						name='title'
						id='title'
						required
						value={item.title}
						onChange={e => updateItem(index, { title: e.target.value })}
					/>
				) : (
					<h1>{item.title}</h1>
				)}
				{isEditing ? (
					<input
						type='text'
						name='desc'
						id='desc'
						required
						value={item.desc}
						onChange={e => updateItem(index, { desc: e.target.value })}
					/>
				) : (
					<p>{item.desc}</p>
				)}
			</div>
		</div>
	);
}

export default function App() {
	const [items, setItems] = useState([]);

	const updateItem = (index, newItem) => {
		setItems(
			items.map((item, i) => (i === index ? { ...item, ...newItem } : item))
		);
	};

	const addItem = item => {
		setItems([...items, item]);
	};

	const removeItem = index => {
		setItems(items.filter((item, i) => i !== index));
	};

	return (
		<div>
			<AddItemForm addItem={addItem} />
			{items.length === 0 ? (
				<h3>Start Adding Items</h3>
			) : (
				items.map((item, index) => (
					<RenderItem
						item={item}
						key={index}
						index={index}
						updateItem={updateItem}
						removeItem={removeItem}
					/>
				))
			)}
		</div>
	);
}
