import React, { memo } from 'react';

interface ICardProps {
	img: string;
	name: string;
	user: string;
	hits: number;
}

export const Card: React.FC<ICardProps> = memo(({ img, name, user, hits }) => {
	return (
		<div className='user-container'>
			<h2>{user}</h2>
			<div className='battle-progress'>
				<div className='green-line' style={{ width: `${hits >= 0 ? hits : 0}% ` }}></div>
			</div>
			<p>{`${hits}/100`}</p>
			<img src={img} alt='pokemon' />
			<p>{name}</p>
		</div>
	);
});
