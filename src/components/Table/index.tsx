import React, { memo } from 'react';
import { IResult } from '../../interfaces';

interface ITableProps {
	data: Array<IResult> | [];
}

export const Table: React.FC<ITableProps> = memo(({ data }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>N</th>
					<th>Player</th>
					<th>Result</th>
					<th>Opponent</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, idx) => (
					<tr key={idx}>
						<td>{idx + 1}</td>
						<td>{item.player}</td>
						<td>{item.result}</td>
						<td>{item.opponent}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
});
