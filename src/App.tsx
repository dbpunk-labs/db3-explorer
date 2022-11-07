import { useState } from "react";
import { Layout, Spin } from "antd";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home.component";
import BlockDetail from "./components/BlockDetail.component";

import "./App.scss";
import TransactionDetail from "./components/Transacation.component";

const { Header, Content, Footer } = Layout;

function App() {
	return (
		<div className='App'>
			<Layout className='layout'>
				<Header className='header'>
					<div className='logo'>
						<a href='/'>DB3 Network Explorer</a>
					</div>
				</Header>
				<Content style={{ padding: "20px" }}>
					<Router>
						<Routes>
							<Route path='/' element={<Home />}></Route>
							<Route
								path='/block/:blockHash/:height'
								element={<BlockDetail />}
							></Route>
							<Route
								path='/transaction/:targetId'
								element={<TransactionDetail />}
							></Route>
						</Routes>
					</Router>
				</Content>
				{/* <Footer style={{ textAlign: "center" }}>合约地址</Footer> */}
			</Layout>
		</div>
	);
}

export default App;
