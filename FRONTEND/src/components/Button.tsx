interface ButtonProps {
	onClick: () => void;
	icon?: React.ReactNode;
	children: React.ReactNode;
	color?: string;
}

export const Button: React.FC<ButtonProps> = ({
	onClick,
	icon,
	children,
	color = 'green',
}) => (
	<button
		onClick={onClick}
		className={`bg-${color}-500 hover:bg-${color}-600 text-white font-bold py-2 px-4 rounded flex items-center`}
	>
		{icon && <span className='mr-2'>{icon}</span>}
		{children}
	</button>
);
