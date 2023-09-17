import { useEffect, useRef, useState } from 'react';
import './App.css';

type Todo = {
	status: 'active' | 'completed';
	text: string;
};
type SortBy = 'all' | 'active' | 'completed';

function App() {
	const inputRef = useRef<HTMLInputElement>(null);

	const [itemsLeft, setItemsLeft] = useState<Number>();

	const [todos, setTodos] = useState<Array<Todo>>();

	const [newTodo, setNewTodo] = useState<Todo>();

	const [sortBy, setSortBy] = useState<SortBy>('all');

	const handleClearInput = () => {
		inputRef.current!.value = '';
		setNewTodo(undefined);
	};
	const handleAddTodo = () => {
		if (newTodo && !todos) {
			setTodos([newTodo]);
		} else if (newTodo && todos) {
			setTodos([newTodo, ...todos]);
		}
	};

	const handleChangeTodo = (todos: Todo[], index: number) => {
		if (todos[index].status === 'completed') {
			todos[index].status = 'active';
		} else {
			todos[index].status = 'completed';
		}
		setTodos([...todos]);
	};

	const handleFilterTodos = (todos: Todo[]) => {
		const activeTodos = todos.filter((todo) => todo.status === 'active');
		setTodos(activeTodos);
	};

	useEffect(() => {
		setItemsLeft(todos?.filter((todo) => todo.status === 'active').length);
	}, [todos]);

	const listElement = (item: Todo, index: number, todos: Todo[]) => {
		return (
			<li className='list__item element' key={`todo${index}`}>
				<input
					className='radio pointer'
					type='radio'
					onChange={(e) => {
						e.preventDefault();
					}}
					onClick={() => {
						handleChangeTodo(todos, index);
					}}
					checked={item.status === 'completed'}
				/>
				<p
					onClick={() => {
						handleChangeTodo(todos, index);
					}}
					className={`list__text pointer ${
						item.status === 'completed' && 'crossed'
					}`}
				>
					{item.text}
				</p>
			</li>
		);
	};

	return (
		<div className='app'>
			<h1 className='heading'>todos</h1>
			<section className='section'>
				<form
					action='submit'
					onSubmit={(e) => {
						e.preventDefault();
						handleClearInput();
						handleAddTodo();
					}}
				>
					<input
						placeholder='What needs to be done'
						className='input element'
						ref={inputRef}
						type='text'
						onChange={(e) => {
							setNewTodo({ status: 'active', text: e.target.value });
						}}
					/>
				</form>
				<ul className='list'>
					{todos?.map((item: Todo, index) => {
						switch (sortBy) {
							case 'all':
								return listElement(item, index, todos);
							case 'active':
								return (
									<>
										{item.status === 'active' &&
											listElement(item, index, todos)}
									</>
								);
							case 'completed':
								return (
									<>
										{item.status === 'completed' &&
											listElement(item, index, todos)}
									</>
								);
						}
						return listElement(item, index, todos);
					})}
				</ul>
				{todos && (
					<div className='bottom'>
						<p>{`${itemsLeft}`} items left</p>
						<div className='sort'>
							<p
								className={`pointer ${sortBy === 'all' && 'selected'}`}
								onClick={() => setSortBy('all')}
							>
								All
							</p>
							<p
								className={`pointer ${sortBy === 'active' && 'selected'}`}
								onClick={() => setSortBy('active')}
							>
								Active
							</p>
							<p
								className={`pointer ${sortBy === 'completed' && 'selected'}`}
								onClick={() => setSortBy('completed')}
							>
								Completed
							</p>
						</div>
						<p className='pointer' onClick={() => handleFilterTodos(todos)}>
							Clear completed
						</p>
					</div>
				)}
			</section>
		</div>
	);
}

export default App;
