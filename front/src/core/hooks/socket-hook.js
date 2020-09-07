import { useState, useEffect } from "react";
import openSocket from "socket.io-client";

const useSocket = ({url, topic}) => {
	const [data, setData] = useState();
	const initialize = () => {
		const socket = openSocket(url);
		socket.on(topic, (backendData) => setData(backendData));
		return () => socket.close();
	};
	useEffect(initialize, []);
	return data;
};

export default useSocket;
