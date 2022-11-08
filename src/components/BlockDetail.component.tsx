//@ts-nocheck
import React, { memo } from "react";
import { Descriptions, List, Table, Tabs, Typography } from "antd";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAsync } from "react-use";
import rpcApi from "../api/rpc.api";
import { Header } from "antd/lib/layout/layout";

const { Column } = Table;

const BlockOverview: React.FC = () => {
	const { blockHash } = useParams();
	const blockState = useAsync(async () => {
		const {
			result: { block },
		} = await rpcApi("block", [blockHash]);
		return block;
	}, []);
	console.log(blockState.value);
	return (
		<div className='block-overview'>
			<Descriptions column={1}>
				<Descriptions.Item label='Block Number'>
					{blockState.value?.header.height}
				</Descriptions.Item>
				<Descriptions.Item label='Block Hash'>
					{blockState.value?.header.last_block_id.hash}
				</Descriptions.Item>
				<Descriptions.Item label='Parent Hash'>-</Descriptions.Item>
				<Descriptions.Item label='Proposer'>
					{blockState.value?.header.proposer_address}
				</Descriptions.Item>
				<Descriptions.Item label='Status'>-</Descriptions.Item>
				<Descriptions.Item label='Timestamp'>
					{blockState.value?.header.time}
				</Descriptions.Item>
				{/* <Descriptions.Item label='Gas Limit'>-</Descriptions.Item>
				<Descriptions.Item label='Gas Used'>-</Descriptions.Item>
				<Descriptions.Item label='Base fee per gas'>
					-
				</Descriptions.Item> */}
				<Descriptions.Item label='Total Transactions'>
					{blockState.value?.data.txs?.length}
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

const BlockTransaction: React.FC = () => {
	const { height } = useParams();
	const transactionState = useAsync(async () => {
		const { result } = await rpcApi("bills", [Number(height)]);
		return result;
	}, []);
	console.log(transactionState.value);

	return (
		<div className='block-transaction'>
			<Table
				dataSource={transactionState.value}
				loading={transactionState.loading}
			>
				<Column
					title='Bill ID'
					dataIndex='bill_target_id'
					render={(text) => (
						<Link to={`/transaction/${text}`}>{text}</Link>
					)}
				/>
				<Column title='Block number' dataIndex='block_height' />
				{/* <Column title='Age' dataIndex='age' /> */}
				<Column title='From' dataIndex='owner' />
				<Column title='To' dataIndex='bill_target_id' />
				<Column
					title='Type'
					dataIndex='bill_type'
					render={(text) =>
						text === 0 ? "mutation" : "querySession"
					}
				/>
				<Column title='Bill' dataIndex='gas_fee_amount' />
			</Table>
		</div>
	);
};

const BlockDetail: React.FC<{}> = memo((props) => {
	const tabItems = [
		{ label: "Overview", key: "item-1", children: <BlockOverview /> }, // 务必填写 key
		{
			label: "Transactions",
			key: "item-2",
			children: <BlockTransaction />,
		},
	];
	return (
		<div className='block-detail'>
			<Tabs items={tabItems} />
		</div>
	);
});
export default BlockDetail;
