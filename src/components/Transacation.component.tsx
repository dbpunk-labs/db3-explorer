import { Descriptions, List, Typography } from "antd";
import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "react-use";
import rpcApi from "../api/rpc.api";

const TransactionDetail: React.FC = memo((props) => {
	const { targetId } = useParams();
	const detailState = useAsync(async () => {
		const { result } = await rpcApi("mutation", [
			decodeURIComponent(targetId),
		]);
		return result;
	}, [targetId]);

	return (
		<div className='transaction-detail'>
			<Descriptions column={1}>
				<Descriptions.Item label='Transaction Hash'>
					-
				</Descriptions.Item>
				<Descriptions.Item label='Status'>-</Descriptions.Item>
				<Descriptions.Item label='Type'>-</Descriptions.Item>
				<Descriptions.Item label='From'>-</Descriptions.Item>
				<Descriptions.Item label='Interaction with'>
					{detailState.value?.ns}
				</Descriptions.Item>
				<Descriptions.Item label='Timestamp'>
					{detailState.value?.time}
				</Descriptions.Item>
				<Descriptions.Item label='Gas Limit'>-</Descriptions.Item>
				<Descriptions.Item label='Gas Used'>
					{detailState.value?.gas}
				</Descriptions.Item>
				<Descriptions.Item label='Effective gas price'>
					-
				</Descriptions.Item>
				<Descriptions.Item label='Bill state'>-</Descriptions.Item>
				<Descriptions.Item label='Call Data Hex'>
					{JSON.stringify(detailState.value?.kv_pairs, null, "\t")}
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
});
export default TransactionDetail;
