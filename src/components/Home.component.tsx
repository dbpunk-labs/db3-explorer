import React, { memo, useEffect } from "react";
import { Card, Space, Table, Typography } from "antd";

import "../style/home.scss";
import { Link } from "react-router-dom";
import { useAsyncFn } from "react-use";
import rpc from "../api/rpc.api";

const { Text } = Typography;

const { Column } = Table;

const Home: React.FC<{}> = memo((props) => {
	const [blockListState, fetchBlock] = useAsyncFn(async (): Promise<
		any[]
	> => {
		const {
			result: { block_metas },
		} = await rpc("latest_blocks", []);
		return block_metas;
	}, []);
	useEffect(() => {
		fetchBlock();
	}, []);

	return (
		<div className='home'>
			<div className='header-info'>
				<div className='block-info'>
					<p>Latest Block</p>
					<p>100</p>
				</div>
				<div className='block-info'>
					<p>Avg Block Time</p>
					<p>3.1s</p>
				</div>
				<div className='block-info'>
					<p>Active Validators</p>
					<p>10</p>
				</div>
			</div>
			<Card title='Latest Block '>
				<Table dataSource={blockListState.value}>
					<Column
						title='hash'
						dataIndex={["block_id", "hash"]}
						render={(text, record: any) => (
							<Text style={{ width: 300 }} ellipsis>
								<Link
									to={`/block/${text}/${record?.header.height}`}
								>
									{text}
								</Link>
							</Text>
						)}
					/>
					<Column title='Height' dataIndex={["header", "height"]} />
					<Column title='Time' dataIndex={["header", "time"]} />
					<Column title='Total Txs' dataIndex='num_txs' />
					<Column title='Gas Limit' dataIndex='gasLimit' />
					<Column title='Gas Used' dataIndex='gasUsed' />
					<Column title='Base fee' dataIndex='baseFee' />
					<Column title='Proposer' dataIndex='proposer' />
				</Table>
			</Card>
		</div>
	);
});
export default Home;
