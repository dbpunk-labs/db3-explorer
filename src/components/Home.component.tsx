import React, { memo, useEffect } from "react";
import { Card, Space, Table, Typography } from "antd";

import "../style/home.scss";
import { Link } from "react-router-dom";
import { useAsync, useAsyncFn } from "react-use";
import rpc from "../api/rpc.api";

const { Text } = Typography;

const { Column } = Table;

const Home: React.FC<{}> = memo((props) => {
	const [blockListState, fetchBlock] = useAsyncFn(async (): Promise<
		any[]
	> => {
		const { result } = await rpc("latest_blocks", []);
		return result;
	}, []);
	const netInfoState = useAsync(async () => {
		const { result } = await rpc("net_info", []);
		return result;
	});
	useEffect(() => {
		fetchBlock();
	}, []);

	return (
		<div className='home'>
			<div className='header-info'>
				<div className='block-info'>
					<p>Latest Block</p>
					<p>{blockListState.value?.last_height}</p>
				</div>
				<div className='block-info'>
					<p>Avg Block Time</p>
					<p>3.1s</p>
				</div>
				<div className='block-info'>
					<p>Active Validators</p>
					<p>{netInfoState.value?.n_peers}</p>
				</div>
			</div>
			<Card title='Latest Block '>
				<Table dataSource={blockListState.value?.block_metas}>
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
					{/* <Column title='Gas Limit' dataIndex='gasLimit' />
					<Column title='Gas Used' dataIndex='gasUsed' />
					<Column title='Base fee' dataIndex='baseFee' />
					<Column title='Proposer' dataIndex='proposer' /> */}
				</Table>
			</Card>
		</div>
	);
});
export default Home;
